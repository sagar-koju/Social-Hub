import type { Metadata } from "next";
import React from "react";
import ProfilePageClient from "@/components/profile/ProfilePageClient";
import { posts, users } from "@/lib/mock-data/mockFeed";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  const user = users[0];

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedIds={["p2"]}
      savedIds={["p1", "p3"]}
    />
  );
}
