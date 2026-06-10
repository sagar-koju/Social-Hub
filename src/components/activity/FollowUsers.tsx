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

export default function FollowUsers() {
    return (
        <motion.aside
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full min-h-0"
        >
            <div className="rounded-3xl border border-slate-300 dark:border-white/10 bg-white dark:bg-black/50 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
                <div className="mt-4 rounded-2xl border border-slate-300 dark:border-white/8 bg-slate-100 dark:bg-white/4 p-3">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                        <BellRing size={15} className="text-pink-600 dark:text-pink-300" /> 
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Recent notifications</p>
                    </div>
                    <div className="space-y-2">
                        {notifications.map((item, index) => (
                            <div key={item} className={`rounded-xl px-3 py-2 text-sm text-zinc-600 dark:text-zinc-300 ${index === 0 ? "bg-white/6" : "bg-transparent"}`}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Follow Requests</h4>
                    <div className="flex flex-col gap-2">
                        {suggestedUsers.map((user) => (
                            <div key={user.handle} className="flex items-center justify-between rounded-2xl border border-slate-300 dark:border-white/8 bg-slate-100 dark:bg-white/4 px-3 py-2.5">
                                <div>
                                    <div className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</div>
                                    <div className="text-xs text-zinc-400 dark:text-zinc-500">{user.handle}</div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="rounded-full bg-linear-to-r from-indigo-500 to-fuchsia-500 px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg shadow-fuchsia-500/15 transition hover:scale-[1.02]">
                                    Accept
                                </button>
                                 <button className="rounded-full bg-linear-to-r from-red-500 to-red-500 px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg shadow-red-500/15 transition hover:scale-[1.02]">
                                    Decline
                                </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



                <div className="mt-4">
                    <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Suggested users</h4>
                    <div className="flex flex-col gap-2">
                        {suggestedUsers.map((user) => (
                            <div key={user.handle} className="flex items-center justify-between rounded-2xl border border-slate-300 dark:border-white/8 bg-slate-100 dark:bg-white/4 px-3 py-2.5">
                                <div>
                                    <div className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</div>
                                    <div className="text-xs text-zinc-400 dark:text-zinc-500">{user.handle}</div>
                                </div>
                                <button className="rounded-full bg-linear-to-r from-indigo-500 to-fuchsia-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-fuchsia-500/15 transition hover:scale-[1.02]">
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Trending topics</h4>
                    <ul className="flex flex-col gap-2">
                        {trending.map((t) => (
                            <li key={t} className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-300 dark:border-white/8 px-3 py-2.5 text-sm text-zinc-600 dark:text-zinc-300 transition hover:border-white/15 hover:bg-white/6 hover:text-white">
                                <span>{t}</span>
                                <Flame size={14} className="text-orange-600 dark:text-orange-300" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.aside>
    );
}
