"use client";

import {
  CompassIcon,
  HomeIcon,
  MenuIcon,
  SparkleIcon,
  SparklesIcon,
  LogInIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Suspense } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; 

const Logo = ({ className }: { className?: string }) => (
  <Link
    href="/"
    className={cn("flex items-center gap-2 group shrink-0", className)}
  >
    <div className="size-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
      <SparkleIcon className="size-4 text-primary-foreground" />
    </div>
    <span className="text-xl font-bold tracking-tight">
      i<span className="text-primary">Built</span>This
    </span>
  </Link>
);

const NavLinks = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/explore", label: "Explore", icon: CompassIcon },
  ];

  return (
    <nav className={className}>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <link.icon className="size-4" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Logo />
            <NavLinks className="hidden md:flex items-center gap-1" />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Suspense
              fallback={
                <div className="size-8 rounded-full bg-muted animate-pulse" />
              }
            >
              <div className="flex items-center gap-3">
                <SignedOut>
                  <div className="hidden sm:block">
                    <SignInButton mode="modal">
                      <Button variant="ghost" size="sm" className="cursor-pointer">
                        Sign In
                      </Button>
                    </SignInButton>
                  </div>
                  <SignUpButton mode="modal">
                    <Button className="cursor-pointer" size="sm">Get Started</Button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <Button asChild size="sm" className="hidden sm:flex cursor-pointer">
                    <Link href="/submit">
                      <SparklesIcon className="mr-2 size-4" />
                      Submit Project
                    </Link>
                  </Button>
                  <UserButton
                    appearance={{ elements: { userButtonAvatarBox: "size-8" } }}
                  />
                </SignedIn>
              </div>
            </Suspense>

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <MenuIcon className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="flex flex-col w-[280px] p-6"
                >
                  <SheetTitle className="text-left">
                    <Logo />
                  </SheetTitle>

                  <div className="mt-8 flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase text-muted-foreground px-3 mb-2">
                      Navigation
                    </p>
                    <NavLinks className="flex flex-col gap-1" />
                  </div>

                  <div className="mt-auto border-t pt-6 flex flex-col gap-3">
                    <SignedIn>
                      <Button asChild className="w-full justify-start">
                        <Link href="/submit">
                          <SparklesIcon className="mr-2 size-4" />
                          Submit Project
                        </Link>
                      </Button>
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <LogInIcon className="mr-2 size-4" />
                          Sign In
                        </Button>
                      </SignInButton>
                    </SignedOut>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
