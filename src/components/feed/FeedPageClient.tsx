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
      className="min-h-screen bg-[#030313] text-white"
    >
      <TopNav />

      <div className="w-full px-4 pb-28 sm:px-6 lg:px-8 lg:pb-6">
        <div className="grid grid-cols-1 justify-between gap-6 py-6 md:grid-cols-12">
          <aside className=" hidden md:block md:col-span-3 lg:col-span-3">
            <Sidebar />
          </aside>

          <section className="mx-auto md:col-span-9 lg:col-span-6">
            <Feed />
          </section>

          <aside className=" hidden lg:block lg:col-span-3">
            <ActivityPanel />
          </aside>
        </div>
      </div>

      <BottomNav />
    </motion.main>
  );
}
