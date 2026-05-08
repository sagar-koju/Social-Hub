import * as React from "react";
import { cn } from "@/lib/utils";

type PageShellProps = React.PropsWithChildren<{
  title: string;
  description: string;
  eyebrow?: string;
  className?: string;
}>;

export function PageShell({
  title,
  description,
  eyebrow = "Social Hub",
  className,
  children,
}: PageShellProps) {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div
        className={cn(
          "mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl flex-col justify-center gap-6",
          className,
        )}
      >
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
            {eyebrow}
          </p>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>
        </div>
        <section className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          {children ?? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">
                Placeholder content
              </p>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                This route is ready for future social feed, discovery, and
                account features.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
