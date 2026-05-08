import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <PageShell
      title="Settings"
      description="Control preferences, privacy, theme, and account options."
    />
  );
}
