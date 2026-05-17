"use client";

import React from "react";
import { motion } from "framer-motion";
import TopNav from "@/components/navigation/TopNav";
import Sidebar from "@/components/sidebar/Sidebar";
import BottomNav from "@/components/navigation/BottomNav";
import ProfileContent from "@/components/profile/ProfileContent";
import type { Post } from "@/types/post";

type User = { id: string; name: string; handle: string; verified?: boolean };

export default function ProfilePageClient({
  user,
  posts,
  likedIds = [],
  savedIds = [],
}: {
  user: User;
  posts: Post[];
  likedIds?: string[];
  savedIds?: string[];
}) {
  return (<>
 
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-[#030313] text-white"
    >
      <TopNav />

      <div className="w-full px-4 pb-28 sm:px-6 lg:px-8 lg:pb-6">
        <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-12">
          <aside className="hidden md:col-span-3 md:block lg:col-span-3">
            <Sidebar />
          </aside>

          <section className="md:col-span-9 lg:col-span-6">
            <ProfileContent
              user={user}
              posts={posts}
              likedIds={likedIds}
              savedIds={savedIds}
            />
          </section>
        </div>
      </div>
    </motion.main>
      <BottomNav />
    </>
  );
}
