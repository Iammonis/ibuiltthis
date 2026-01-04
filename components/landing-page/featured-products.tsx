import { SectionHeader } from "@/components/common/section-header";
import ProductCard from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const featuredProducts = [
  {
    id: 1,
    name: "LuminaFocus",
    description:
      "An AI-powered browser extension that blocks distractions based on your calendar.",
    tags: ["Productivity", "AI", "Extension"],
    votes: 432,
    isFeatured: true,
  },
  {
    id: 2,
    name: "EcoTrack API",
    description:
      "Real-time carbon footprint tracking for e-commerce checkout flows.",
    tags: ["Sustainability", "API", "Developer Tools"],
    votes: 89,
    isFeatured: false,
  },
  {
    id: 3,
    name: "SwiftUI Component Lab",
    description:
      "A library of 100+ premium animated components for iOS developers.",
    tags: ["Mobile", "Design", "SwiftUI"],
    votes: 275,
    isFeatured: true,
  },
  {
    id: 4,
    name: "GhostWriter DB",
    description:
      "A serverless database optimized specifically for high-traffic blogging platforms.",
    tags: ["Database", "Serverless", "Backend"],
    votes: 56,
    isFeatured: false,
  },
  {
    id: 5,
    name: "SoundScape Studio",
    description:
      "Generate royalty-free ambient background music using procedural generation.",
    tags: ["Audio", "Creative", "Generative"],
    votes: 1102,
    isFeatured: true,
  },
];

export const FeaturedProducts = () => {
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
