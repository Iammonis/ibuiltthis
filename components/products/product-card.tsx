import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { ProductType } from "@/types";
import { VotingButtons } from "@/components/products/voting-buttons";
import { Badge } from "@/components/ui/badge";

export async function ProductCard({
  product,
  currentUserId,
}: {
  product: ProductType;
  currentUserId: string | null;
}) {

  const hasVoted = !!(
    currentUserId && product.votes?.some((v) => v.userId === currentUserId)
  );
  const voteCount = product.votes?.length || 0;

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-50 relative">
        <CardHeader className="flex-1">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                {voteCount > 100 && (
                  <Badge className="gap-1 bg-primary text-primary-foreground">
                    <StarIcon className="size-3 fill-current" />
                    Featured
                  </Badge>
                )}
              </div>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </div>


            <div className="z-10">
              <VotingButtons
                hasVoted={hasVoted}
                voteCount={voteCount}
                productId={product.id}
                productSlug={product.slug}
              />
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          <div className="flex flex-wrap items-center gap-2">
            {product.tags?.map((tag) => (
              <Badge variant="secondary" key={tag} className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
