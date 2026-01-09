import { Suspense } from "react";
import { SectionHeader } from "@/components/common/section-header";
import { SparklesIcon } from "lucide-react";
import SubmitFormWrapper from "@/components/forms/submit-form-wrapper";

export default function SubmitPage() {
  return (
    <section className="py-20">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="Submit Your Product"
            icon={SparklesIcon}
            description="Share your creation with the community. Your submission will be reviewed before going live."
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <Suspense
            fallback={
              <div className="h-100 w-full bg-muted/20 animate-pulse rounded-xl border border-dashed flex items-center justify-center">
                <p className="text-muted-foreground">Loading form...</p>
              </div>
            }
          >
            <SubmitFormWrapper />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
