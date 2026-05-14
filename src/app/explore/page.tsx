import type { Metadata } from "next";
import ExplorePageClient from "@/components/explore/ExplorePageClient";

export const metadata: Metadata = {
  title: "Explore",
};

export default function ExplorePage() {
  return <ExplorePageClient />;
}
