import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <PageShell
      title="Home"
      description="The main entry point for the social hub experience."
    />
  );
}
