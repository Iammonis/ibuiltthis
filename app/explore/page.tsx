import { Suspense } from "react";
import { SectionHeader } from "@/components/common/section-header";
import { ProductExplorer } from "@/components/products/product-explorer";
import { getAllApprovedProducts } from "@/lib/products/product-select";
import { auth } from "@clerk/nextjs/server";
import { CompassIcon } from "lucide-react";

type ProductsData = Awaited<ReturnType<typeof getAllApprovedProducts>>;
async function ExplorerContent({
  productsPromise,
}: {
  productsPromise: Promise<ProductsData>;
}) {
  const { userId } = await auth();

  const products = await productsPromise;

  return <ProductExplorer products={products} currentUserId={userId ?? null} />;
}

export default function ExplorePage() {
  const productsPromise = getAllApprovedProducts();

  return (
    <div className="py-20">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="Explore All Products"
            icon={CompassIcon}
            description="Browse and discover amazing projects from our community"
          />
        </div>

        <Suspense fallback={<ExplorerSkeleton />}>
          <ExplorerContent productsPromise={productsPromise} />
        </Suspense>
      </div>
    </div>
  );
}

function ExplorerSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-72 w-full bg-gray-100 animate-pulse rounded-2xl border border-gray-200"
        />
      ))}
    </div>
  );
}
