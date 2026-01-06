"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { productSchema } from "@/lib/products/product-validations";
import { FormState } from "@/types";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";

export const addProductAction = async (
  prevState: FormState,
  formData: FormData
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to submit a product",
        errors: undefined,
      };
    }

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";

    const rawFormData = Object.fromEntries(formData.entries());


    const validatedData = productSchema.safeParse(rawFormData);

    if (!validatedData.success) {
      console.log(validatedData.error.flatten().fieldErrors);
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Invalid data",
      };
    }
    const { name, slug, tagline, description, websiteUrl, tags } =
      validatedData.data;

    const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];

    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags: tagsArray,
      status: "pending",
      submittedBy: userEmail,
      userId,
    });

    return {
      success: true,
      message: "Product submitted successfully! It will be reviewed shortly.",
      errors: undefined,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Validation failed. Please check the form.",
      };
    }

    return {
      success: false,
      errors: undefined,
      message: "Failed to submit product",
    };
  }
};


export const upvoteProductAction = async (productId: number, slug: string) => {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, message: "Unauthorized" };

    await db
      .update(products)
      .set({
        votes: sql`
          CASE 
            WHEN EXISTS (
              SELECT 1 
              FROM jsonb_array_elements(COALESCE(${products.votes}, '[]'::jsonb)) v 
              WHERE v->>'userId' = ${userId}::text
            ) THEN ${products.votes}
            
            ELSE COALESCE(${products.votes}, '[]'::jsonb) || jsonb_build_array(jsonb_build_object('userId', ${userId}::text))
          END
        `,
      })
      .where(eq(products.id, productId));

    revalidatePath("/");
    revalidatePath(`/products/${slug}`);
    return { success: true };
  } catch (error) {
    console.error("Upvote Error:", error);
    return { success: false };
  }
};

export const downvoteProductAction = async (
  productId: number,
  slug: string
) => {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, message: "Unauthorized" };

    await db
      .update(products)
      .set({
        votes: sql`COALESCE(
          (
            SELECT jsonb_agg(vote)
            FROM jsonb_array_elements(COALESCE(${products.votes}, '[]'::jsonb)) AS vote
            WHERE vote->>'userId' != ${userId}
          ),
          '[]'::jsonb
        )`,
      })
      .where(eq(products.id, productId));

    revalidatePath("/");
    revalidatePath(`/products/${slug}`);

    return { success: true };
  } catch (error) {
    console.error("Downvote Error:", error);
    return { success: false };
  }
};
