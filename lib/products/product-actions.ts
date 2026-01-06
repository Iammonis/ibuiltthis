"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { productSchema } from "@/lib/products/product-validations";
import { FormState } from "@/types";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache"; 

export const addProductAction = async (
  prevState: FormState,
  formData: FormData
) => {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, message: "Unauthorized" };

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedData = productSchema.safeParse(rawFormData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Invalid data",
      };
    }

    const { name, slug, tagline, description, websiteUrl, tags } = validatedData.data;
    const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];

    await db.insert(products).values({
      name, slug, tagline, description, websiteUrl,
      tags: tagsArray,
      status: "pending",
      submittedBy: userEmail,
      userId,
    });

    // BUST THE CACHE: So new products appear on Explore/Home
    revalidateTag("products-all", "default");
    revalidatePath("/", "page");
    revalidatePath("/explore", "page");

    return { success: true, message: "Product submitted successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to submit product" };
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
              SELECT 1 FROM jsonb_array_elements(COALESCE(${products.votes}, '[]'::jsonb)) v 
              WHERE v->>'userId' = ${userId}::text
            ) THEN ${products.votes}
            ELSE COALESCE(${products.votes}, '[]'::jsonb) || jsonb_build_array(jsonb_build_object('userId', ${userId}::text))
          END
        `,
      })
      .where(eq(products.id, productId));

    // 1. Bust the Data Cache (use cache)
    revalidateTag("products-all", "default");
    revalidateTag(`product-${slug}`, "default");

    // 2. Refresh the Route Cache (the visual page)
    revalidatePath("/", "page");
    revalidatePath("/explore", "page");
    revalidatePath(`/products/${slug}`, "page");

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const downvoteProductAction = async (productId: number, slug: string) => {
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
            WHERE vote->>'userId' != ${userId}::text -- Added ::text for type safety
          ),
          '[]'::jsonb
        )`,
      })
      .where(eq(products.id, productId));

    // 1. Bust the Data Cache
    revalidateTag("products-all", "default");
    revalidateTag(`product-${slug}`, "default");

    // 2. Refresh the Route Cache
    revalidatePath("/", "page");
    revalidatePath("/explore", "page");
    revalidatePath(`/products/${slug}`, "page");

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};