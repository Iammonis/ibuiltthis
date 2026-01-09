import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LockIcon } from "lucide-react";

export function AuthGuardOverlay({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string | null;
}) {
  if (userId) return <>{children}</>;

  return (
    <div className="relative group">
      <div className="select-none pointer-events-none blur-xs opacity-50 transition-all">
        {children}
      </div>

      <div className="absolute inset-0 z-10 flex items-start justify-center p-6">
        <div className="bg-background/80 backdrop-blur-md border shadow-xl rounded-xl p-8 text-center max-w-sm animate-in fade-in zoom-in duration-300">
          <div className="mx-auto size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <LockIcon className="size-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Sign in to Submit</h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Join our community to share your projects, get feedback, and reach
            thousands of makers.
          </p>
          <div className="flex flex-col gap-3">
            <SignInButton mode="modal">
              <Button size="lg" className="w-full cursor-pointer">
                Sign In to Continue
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>
    </div>
  );
}
