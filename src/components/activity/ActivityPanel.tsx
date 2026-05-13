"use client";

import { motion } from "framer-motion";
import { BellRing, Flame, Heart, MessageSquare, Users, Zap } from "lucide-react";

const trending = [
  'Design systems',
  'Motion UX',
  'AI in design',
  'React 20',
  'Server Components'
];

const suggestedUsers = [
  { name: "Nova Labs", handle: "@novalabs" },
  { name: "Aria Chen", handle: "@ariachen" },
  { name: "Pixel Forge", handle: "@pixelforge" },
];

const notifications = [
  "Maya commented on your post",
  "Liam reposted your update",
  "Your story got 42 new views",
];

const onlineFriends = ["Ava", "Maya", "Noah", "Zoe", "Kai"];

const analytics = [
  { label: "Reach", value: "24.8K", icon: Zap, accent: "from-cyan-500/20 to-blue-500/20" },
  { label: "Engagement", value: "18.4%", icon: Heart, accent: "from-pink-500/20 to-rose-500/20" },
  { label: "Replies", value: "312", icon: MessageSquare, accent: "from-fuchsia-500/20 to-indigo-500/20" },
];

export default function ActivityPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-6"
    >
      <div className="rounded-3xl border border-white/10 bg-black/50 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-white">Activity</div>
            <div className="text-xs text-zinc-400">Live pulse from your network</div>
          </div>
          <div className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            Live
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {analytics.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className={`rounded-2xl border border-white/8 bg-linear-to-br ${item.accent} p-3`}>
                <div className="flex items-center justify-between text-zinc-300">
                  <Icon size={14} />
                </div>
                <div className="mt-2 text-lg font-semibold text-white">{item.value}</div>
                <div className="text-[11px] text-zinc-400">{item.label}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-2xl border border-white/8 bg-white/4 p-3">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <BellRing size={15} className="text-pink-300" /> Recent notifications
          </div>
          <div className="space-y-2">
            {notifications.map((item, index) => (
              <div key={item} className={`rounded-xl px-3 py-2 text-sm text-zinc-300 ${index === 0 ? "bg-white/6" : "bg-transparent"}`}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="mb-3 text-sm font-semibold text-white">Trending topics</h4>
          <ul className="flex flex-col gap-2">
          {trending.map((t) => (
            <li key={t} className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/8 px-3 py-2.5 text-sm text-zinc-300 transition hover:border-white/15 hover:bg-white/6 hover:text-white">
              <span>{t}</span>
              <Flame size={14} className="text-orange-300" />
            </li>
          ))}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="mb-3 text-sm font-semibold text-white">Suggested users</h4>
          <div className="flex flex-col gap-2">
            {suggestedUsers.map((user) => (
              <div key={user.handle} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-3 py-2.5">
                <div>
                  <div className="text-sm font-medium text-white">{user.name}</div>
                  <div className="text-xs text-zinc-400">{user.handle}</div>
                </div>
                <button className="rounded-full bg-linear-to-r from-indigo-500 to-fuchsia-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-fuchsia-500/15 transition hover:scale-[1.02]">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/8 bg-white/4 p-3">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <Users size={15} className="text-emerald-300" /> Online friends
          </div>
          <div className="flex flex-wrap gap-2">
            {onlineFriends.map((friend) => (
              <span key={friend} className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-black/30 px-3 py-1.5 text-xs text-zinc-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30" />
                {friend}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
