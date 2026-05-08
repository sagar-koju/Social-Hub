import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Bookmarks",
};

export default function BookmarksPage() {
  return (
    <PageShell
      title="Bookmarks"
      description="Saved posts and references collected for later reading."
    />
  );
}
