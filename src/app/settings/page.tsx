import type { Metadata } from "next";
import { SettingsPageClient } from "@/components/settings/settings-page-client";
import { getSettingsSnapshot } from "@/components/settings/settings-service";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account, privacy, notifications, billing, and integrations.",
};

export default async function SettingsPage() {
  const initialData = await getSettingsSnapshot();

  return <SettingsPageClient initialData={initialData} />;
}

