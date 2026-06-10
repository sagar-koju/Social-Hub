"use client";

import { motion } from "framer-motion";
import { FileText, Image, BarChart3, Smile, Code } from "lucide-react";

export type PostType = "text" | "image" | "poll" | "mood" | "code";

interface PostTypeTab {
  id: PostType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const postTypes: PostTypeTab[] = [
  {
    id: "text",
    label: "Text",
    icon: <FileText size={18} />,
    description: "Share your thoughts",
  },
  {
    id: "image",
    label: "Image",
    icon: <Image size={18} />,
    description: "Share photos",
  },
  {
    id: "poll",
    label: "Poll",
    icon: <BarChart3 size={18} />,
    description: "Create a poll",
  },
  {
    id: "mood",
    label: "Mood",
    icon: <Smile size={18} />,
    description: "Share your vibe",
  },
  {
    id: "code",
    label: "Code",
    icon: <Code size={18} />,
    description: "Share code",
  },
];

interface AnimatedTabsProps {
  activeTab: PostType;
  onTabChange: (tab: PostType) => void;
}

export default function AnimatedTabs({ activeTab, onTabChange }: AnimatedTabsProps) {
  return (
    <div className="space-y-2">
      {/* Desktop View - Horizontal Tabs */}
      <div className="hidden md:block">
        <div className="inline-flex rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 p-1">
          {postTypes.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative px-4 py-2 text-sm font-medium rounded-lg transition"
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-linear-to-r from-indigo-500 to-fuchsia-500 rounded-lg border border-slate-300 dark:border-white/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <motion.div
                className={`relative flex items-center gap-2 ${
                  activeTab === tab.id ? "text-slate-900 dark:text-white" : "text-zinc-400"
                }`}
                animate={{ color: activeTab === tab.id ? "#ffffff" : "#a1a1a1" }}
              >
                {tab.icon}
                {tab.label}
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mobile View - Vertical Tabs */}
      <div className="md:hidden space-y-2">
        {postTypes.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full rounded-lg px-4 py-3 text-left transition flex items-center gap-3 ${
              activeTab === tab.id
                ? "bg-linear-to-r from-slate-200 dark:from-indigo-500/30 to-slate-200 dark:to-fuchsia-500/30 border border-slate-300 dark:border-white/20 "
                : "bg-white/5 dark:bg-black/5 border border-slate-300 dark:border-white/10"
            }`}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{ color: activeTab === tab.id ? "#000000 dark:#ffffff" : "#a1a1a1" }}
            >
              {tab.icon}
            </motion.div>
            <div className="flex-1">
              <div className={activeTab === tab.id ? "text-black dark:text-white font-medium" : "text-zinc-500"}>
                {tab.label}
              </div>
              <div className="text-xs text-zinc-500">{tab.description}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
