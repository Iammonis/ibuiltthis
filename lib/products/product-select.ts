import { db } from "@/db";
import { products } from "@/db/schema";
import { and, desc, eq, getTableColumns, gt, sql } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

export const getFeaturedProducts = async () => {
  "use cache";

  const voteCountSql = sql<number>`jsonb_array_length(COALESCE(${products.votes}, '[]'::jsonb))`;

  return await db
    .select({
      ...getTableColumns(products),
      calculatedVoteCount: voteCountSql.as("v_count"),
    })
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(voteCountSql));
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

export const getProductBySlug = async (slug: string) => {
  "use cache";
  const result = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  return result[0];
};
