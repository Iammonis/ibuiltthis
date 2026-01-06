"use client";

import {
  downvoteProductAction,
  upvoteProductAction,
} from "@/lib/products/product-actions";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { Button } from "@/components/ui/button";

export function VotingButtons({
  hasVoted,
  voteCount,
  productId,
  productSlug
}: {
  hasVoted: boolean;
  voteCount: number;
  productId: number;
  productSlug: string
}) {
  const [isPending, startTransition] = useTransition();

  const [optimisticData, toggleOptimisticVote] = useOptimistic(
    { count: voteCount, active: hasVoted },
    (state, action: "up" | "down") => {
      if (action === "up" && !state.active) {
        return { count: state.count + 1, active: true };
      }
      if (action === "down" && state.active) {
        return { count: state.count - 1, active: false };
      }
      return state;
    }
  );

  const handleUpvote = async () => {
    if (optimisticData.active) return; 

    startTransition(async () => {
      toggleOptimisticVote("up");
      await upvoteProductAction(productId, productSlug);
    });
  };

  const handleDownvote = async () => {
    if (!optimisticData.active) return; 

    startTransition(async () => {
      toggleOptimisticVote("down");
      await downvoteProductAction(productId, productSlug);
    });
  };

  return (
    <div
      className="flex flex-col items-center gap-1 shrink-0"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Button
        onClick={handleUpvote}
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8",
          optimisticData.active
            ? "bg-primary/10 text-primary hover:bg-primary/20"
            : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
        )}
        disabled={isPending || optimisticData.active}
      >
        <ChevronUpIcon className="size-5" />
      </Button>

      <span className="text-sm font-semibold text-foreground">
        {optimisticData.count}
      </span>

      <Button
        onClick={handleDownvote}
        variant="ghost"
        size="sm"
        disabled={isPending || !optimisticData.active}
        className={cn(
          "h-8 w-8 transition-opacity",
          optimisticData.active
            ? "text-primary hover:text-destructive hover:bg-destructive/10"
            : "opacity-30 grayscale cursor-not-allowed"
        )}
      >
        <ChevronDownIcon className="size-5" />
      </Button>
    </div>
  );
}
