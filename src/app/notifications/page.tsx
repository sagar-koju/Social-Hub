import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function NotificationsPage() {
  return (
    <PageShell
      title="Notifications"
      description="Keep track of likes, replies, follows, and mentions."
    />
  );
}
