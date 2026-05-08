import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <PageShell
      title="Profile"
      description="Showcase user identity, activity, and personal content."
    />
  );
}
