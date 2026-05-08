import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Messages",
};

export default function MessagesPage() {
  return (
    <PageShell
      title="Messages"
      description="Private conversations and direct communication live here."
    />
  );
}
