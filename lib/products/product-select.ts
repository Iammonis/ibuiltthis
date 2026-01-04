import { db } from "@/db";
import { products } from "@/db/schema";
import { and, desc, eq, gt, sql } from "drizzle-orm";

export const getFeaturedProducts = async () => {
  const productData = await db
    .select()
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(products.voteCount));

  return productData;
};

export const getRecentlyLaunchedProducts = async () => {
  const productData = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.status, "approved"),
        gt(products.createdAt, sql`now() - interval '7 days'`)
      )
    )
    .orderBy(desc(products.createdAt));

  return productData;
};
