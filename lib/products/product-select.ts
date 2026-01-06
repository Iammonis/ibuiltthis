"use cache";

import { db } from "@/db";
import { products } from "@/db/schema";
import { and, desc, eq, getTableColumns, gt, sql } from "drizzle-orm";
import { cacheTag } from "next/cache"; // Stable import

const voteCountSql = sql<number>`jsonb_array_length(COALESCE(${products.votes}, '[]'::jsonb))`;

export const getFeaturedProducts = async () => {
  cacheTag("products-featured", "products-all");
  return await db
    .select({
      ...getTableColumns(products),
      calculatedVoteCount: voteCountSql.as("v_count"),
    })
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(voteCountSql))
    .limit(10);
};

export const getRecentlyLaunchedProducts = async () => {
  cacheTag("products-recent", "products-all");
  return await db
    .select({
      ...getTableColumns(products),
      calculatedVoteCount: voteCountSql.as("v_count"),
    })
    .from(products)
    .where(
      and(
        eq(products.status, "approved"),
        gt(products.createdAt, sql`now() - interval '7 days'`)
      )
    )
    .orderBy(desc(products.createdAt))
    .limit(10);
};

export async function getAllApprovedProducts() {
  cacheTag("products-all");
  return await db
    .select({
      ...getTableColumns(products),
      calculatedVoteCount: voteCountSql.as("v_count"),
    })
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(voteCountSql));
}

export const getProductBySlug = async (slug: string) => {
  cacheTag(`product-${slug}`, "products-all");
  const result = await db
    .select({
      ...getTableColumns(products),
      calculatedVoteCount: voteCountSql.as("v_count"),
    })
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  return result[0];
};