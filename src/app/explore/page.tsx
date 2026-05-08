import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Explore",
};

export default function ExplorePage() {
  return (
    <PageShell
      title="Explore"
      description="Discover new posts, creators, and conversations."
    />
  );
}
