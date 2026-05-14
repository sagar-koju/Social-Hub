"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp } from "lucide-react";
import { trendingTopics } from "./explore-data";

export function TrendingTopicsWidget({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "rounded-3xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl"
          : "rounded-3xl border border-white/10 bg-black/45 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl"
      }
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Trending topics</p>
          <p className="text-xs text-zinc-400">Live momentum across the network</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-orange-300/25 bg-orange-400/10 px-2.5 py-1 text-[11px] text-orange-200">
          <Flame className="size-3.5" />
          Hot now
        </span>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } },
        }}
        className="space-y-2"
      >
        {trendingTopics.map((item) => (
          <motion.button
            key={item.topic}
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.01 }}
            type="button"
            className="w-full rounded-2xl border border-white/10 bg-linear-to-r from-white/5 to-transparent p-3 text-left transition hover:border-cyan-300/30 hover:from-cyan-400/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-semibold text-cyan-200">#{item.rank}</span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-300">
                    {item.category}
                  </span>
                  <span className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
                    {item.badge}
                  </span>
                </div>
                <p className="truncate text-sm font-semibold text-white">{item.topic}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-zinc-400">{item.description}</p>
              </div>

              <div className="shrink-0 text-right">
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-200">
                  <TrendingUp className="size-3.5" />
                  {item.growth}
                </div>
                <p className="mt-1 text-[11px] text-zinc-400">{item.posts}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}