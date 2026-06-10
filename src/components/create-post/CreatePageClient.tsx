"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TopNav from "@/components/navigation/TopNav";
import BottomNav from "@/components/navigation/BottomNav";
import ResponsiveSidebar from "@/components/sidebar/ResponsiveSidebar";
import CreatePostModal from "@/components/create-post/CreatePostModal";

export default function CreatePageClient() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Auto-open modal when navigating to /create
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
    // Optionally redirect back after closing
    setTimeout(() => {
      window.history.back();
    }, 300);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-white dark:bg-[#030313] text-slate-900 dark:text-white"
    >
      <TopNav />

      <div className="w-full px-4 pb-28 sm:px-6 lg:px-8 lg:pb-6">
        <div className="grid grid-cols-1 justify-between gap-6 py-6 md:grid-cols-12">
          <ResponsiveSidebar className="md:col-span-3 lg:col-span-3" />

          {/* Empty content area */}
          <section className="mx-auto md:col-span-9 lg:col-span-6" />
        </div>
      </div>

      <BottomNav />

      {/* Create Post Modal */}
      <CreatePostModal isOpen={isModalOpen} onClose={handleClose} />
    </motion.main>
  );
}
