"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/sidebar/Sidebar";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import { posts } from "@/lib/mock-data/mockFeed";
import { ExploreHeader } from "./ExploreHeader";
import { TrendingTopicsWidget } from "./TrendingTopicsWidget";
import { PopularPostsSection } from "./PopularPostsSection";
import { BrowseHashtagsSection } from "./BrowseHashtagsSection";
import { RecommendedCreatorsSection } from "./RecommendedCreatorsSection";

export default function ExplorePageClient() {
  const topPosts = useMemo(
    () =>
      [...posts]
        .sort((a, b) => b.likes + b.comments - (a.likes + a.comments))
        .slice(0, 3),
    [],
  );

  return (
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

          <section className="space-y-5 md:col-span-9 lg:col-span-6">
            <div className="sticky top-16 z-40">
              <ExploreHeader />
            </div>

            <div className="lg:hidden mt-10">
              <TrendingTopicsWidget compact />
            </div>

            <PopularPostsSection posts={topPosts} />

            <BrowseHashtagsSection />

            <RecommendedCreatorsSection />
          </section>

          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24 space-y-4">
              <TrendingTopicsWidget />
              <RecommendedCreatorsSection />
            </div>
          </aside>
        </div>
      </div>

      <BottomNav />
    </motion.main>
  );
}