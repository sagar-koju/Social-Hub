"use client";

import { motion } from "framer-motion";
import Sidebar from "@/components/sidebar/Sidebar";
import Feed from "@/components/feed/Feed";
import ActivityPanel from "@/components/activity/ActivityPanel";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";

export default function FeedPageClient() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="flex h-[100svh] flex-col overflow-hidden bg-[#030313] text-white"
    >
      <TopNav />

      <div className="flex-1 min-h-0 w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="grid h-full min-h-0 grid-cols-1 gap-6 py-6 md:grid-cols-12">
          <aside className="hidden min-h-0 md:col-span-3 md:block md:overflow-y-auto lg:col-span-3 scrollbar-hide">
            <Sidebar />
          </aside>

          <section className="min-h-0 overflow-y-auto pb-28 md:col-span-9 lg:col-span-6 lg:pb-6 scrollbar-hide">
            <Feed />
          </section>

          <aside className="hidden min-h-0 lg:col-span-3 lg:block lg:overflow-y-auto scrollbar-hide">
            <ActivityPanel />
          </aside>
        </div>
      </div>

      <BottomNav />
    </motion.main>
  );
}
