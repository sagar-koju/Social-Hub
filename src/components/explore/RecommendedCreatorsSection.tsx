"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Users } from "lucide-react";
import { recommendedCreators } from "./explore-data";

export function RecommendedCreatorsSection() {
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  return (
    <section className="rounded-3xl border border-white/10 bg-black/45 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Recommended creators</h2>
          <p className="text-xs text-zinc-400">People and studios your network follows</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300">
          <Users className="size-3.5" />
          Curated
        </span>
      </div>

      <div className="grid grid-flow-col auto-cols-[86%] gap-3 overflow-x-auto pb-2 snap-x snap-mandatory md:auto-cols-[48%] lg:grid-flow-row lg:auto-cols-auto lg:grid-cols-1 lg:overflow-visible xl:grid-cols-2">
        {recommendedCreators.map((creator) => {
          const isFollowing = Boolean(following[creator.id]);

          return (
            <motion.article
              key={creator.id}
              whileHover={{ y: -3 }}
              className="snap-start rounded-2xl border border-white/10 bg-white/3 p-4 transition hover:border-cyan-300/25"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-linear-to-br from-cyan-400/80 to-indigo-500/80 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20">
                    {creator.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {creator.name}
                      {creator.verified ? (
                        <BadgeCheck className="ml-1 inline size-4 text-sky-300" />
                      ) : null}
                    </p>
                    <p className="truncate text-xs text-zinc-400">@{creator.handle}</p>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() =>
                    setFollowing((current) => ({
                      ...current,
                      [creator.id]: !current[creator.id],
                    }))
                  }
                  className={
                    isFollowing
                      ? "rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white"
                      : "rounded-full bg-linear-to-r from-cyan-500 to-blue-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20"
                  }
                >
                  {isFollowing ? "Following" : "Follow"}
                </motion.button>
              </div>

              <p className="mt-3 line-clamp-2 text-sm text-zinc-300">{creator.bio}</p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-zinc-400">
                  <span className="font-semibold text-white">{creator.followers}</span> followers
                </p>
                <p className="text-xs text-zinc-400">Mutuals: {creator.mutuals.join(", ")}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}