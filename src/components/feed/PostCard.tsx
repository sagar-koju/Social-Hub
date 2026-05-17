"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Avatar from "@/components/ui/avatar";
import { Bookmark, CheckCheck, ChevronDown, ChevronUp, Heart, MessageCircle, Repeat } from "lucide-react";
import type { Post } from "@/types/post";
import Image from "next/image";

export default function PostCard({ post, user }: { post: Post; user: { name: string; handle: string; verified?: boolean } }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = post.content.length > 110;
  const visibleContent = shouldTruncate && !expanded ? `${post.content.slice(0, 110)}…` : post.content;

  function toggleLike() {
    setLiked((s) => !s);
    setLikes((l) => (liked ? l - 1 : l + 1));
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="mb-4 rounded-3xl border border-white/10 bg-black/50 p-4 shadow-xl shadow-black/20 backdrop-blur-xl"
    >
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar name={user.name} online />
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  {user.name}
                  {user.verified && <CheckCheck size={14} className="text-sky-400" />}
                </div>
                <div className="text-xs text-zinc-400">
                  @{user.handle} · {post.timestamp}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSaved((value) => !value)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${saved ? "border-indigo-400/40 bg-indigo-500/15 text-indigo-200" : "border-white/8 bg-white/5 text-zinc-300 hover:border-white/15 hover:bg-white/10"}`}
              aria-label="Save post"
            >
              <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="mt-3 text-sm leading-6 text-zinc-200">
            {visibleContent}
            {shouldTruncate && (
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-indigo-300 transition hover:text-indigo-200"
              >
                {expanded ? (
                  <>
                    Show less <ChevronUp size={13} />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown size={13} />
                  </>
                )}
              </button>
            )}
          </div>

          {post.img && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-indigo-500/30 via-slate-700/50 to-fuchsia-500/25 p-3 shadow-lg shadow-black/20">
              <div className="relative h-100 rounded-xl overflow-hidden">
                <Image src={post.img} alt="Post content" fill className="object-cover" />
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-zinc-400 sm:gap-4">
            <button
              onClick={toggleLike}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 transition ${liked ? "border-red-400/30 bg-red-500 text-white" : "border-white/8 bg-white/5 hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"}`}
            >
              <motion.span whileTap={{ scale: 0.9 }}>
                <Heart size={16} fill={liked ? "currentColor" : "none"} />
              </motion.span>
              <span>{likes}</span>
            </button>

            <button className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 transition hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-indigo-300">
              <MessageCircle size={16} /> <span>{post.comments}</span>
            </button>

            <button className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 transition hover:border-emerald-400/30 hover:bg-emerald-500/10 hover:text-emerald-300">
              <Repeat size={16} /> <span>Repost</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
