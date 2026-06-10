"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTabs, { PostType } from "./AnimatedTabs";
import TextPostForm from "./TextPostForm";
import ImagePostForm from "./ImagePostForm";
import PollPostForm from "./PollPostForm";
import MoodStatusPostForm from "./MoodStatusPostForm";
import CodeSnippetPostForm from "./CodeSnippetPostForm";
import { X } from "lucide-react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [activeTab, setActiveTab] = useState<PostType>("text");

  const renderForm = () => {
    switch (activeTab) {
      case "text":
        return <TextPostForm />;
      case "image":
        return <ImagePostForm />;
      case "poll":
        return <PollPostForm />;
      case "mood":
        return <MoodStatusPostForm />;
      case "code":
        return <CodeSnippetPostForm />;
      default:
        return <TextPostForm />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-300 dark:border-white/20 bg-white dark:bg-black/92 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-slate-300 dark:border-white/10 bg-white dark:bg-black/60 backdrop-blur px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create a Post</h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Share what's on your mind</p>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full p-2 hover:bg-black/10 dark:hover:bg-white/10 transition"
              >
                <X size={20} className="text-zinc-500 dark:text-zinc-300" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Animated Tabs */}
              <motion.div
                key={`tabs-${activeTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedTabs activeTab={activeTab} onTabChange={setActiveTab} />
              </motion.div>

              {/* Form Content with Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderForm()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
