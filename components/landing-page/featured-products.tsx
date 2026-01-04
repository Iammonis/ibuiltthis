"use cache";
import { SectionHeader } from "@/components/common/section-header";
import ProductCard from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/lib/products/product-select";
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const FeaturedProducts = async () => {
  const featuredProducts = await getFeaturedProducts();
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Featured Today"
            icon={StarIcon}
            description="Top picks from out community"
          />
          <Button
            className="hidden sm:flex sm:gap-1 w-fit"
            asChild
            variant="outline"
          >
            <Link href="/explore" className="size-4">
              View All <ArrowUpRightIcon />
            </Link>
          </Button>
        </div>
        <div className="grid-wrapper">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
