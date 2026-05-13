"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Bell, Search, Sparkles, User, X, CheckCheck, Clock3, Filter, Send } from "lucide-react";
import ThemeToggle from "@/components/navigation/ThemeToggle";

const recentSearches = ["Design systems", "Motion UI", "Creator economy"];
const suggestions = [
  { title: "Design leaders", subtitle: "Follow trending creators" },
  { title: "UI inspiration", subtitle: "Search posts, users, and topics" },
  { title: "Live events", subtitle: "What is happening now" },
];

const notifications = [
  { id: 1, title: "Maya liked your post", time: "2m ago", read: false },
  { id: 2, title: "Nova Labs followed you", time: "12m ago", read: false },
  { id: 3, title: "Weekly recap is ready", time: "1h ago", read: true },
];

export default function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, []);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }
      if (target instanceof Element && !target.closest("[data-notification-panel]")) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-black/55 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/feed" className="flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-white/5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 via-blue-500 to-fuchsia-500 font-black shadow-lg shadow-indigo-500/20">
            SH
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold tracking-wide text-white">Social Hub</div>
            <div className="text-xs text-zinc-400">Home feed</div>
          </div>
        </Link>

        <div ref={searchRef} className="relative hidden md:block">
          <motion.button
            type="button"
            onFocus={() => setSearchOpen(true)}
            onClick={() => setSearchOpen(true)}
            whileHover={{ scale: 1.01 }}
            className="flex h-11 min-w-[320px] items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 text-left text-sm text-zinc-400 shadow-lg shadow-black/15 transition hover:border-white/20 hover:bg-white/8"
          >
            <Search size={16} className="text-zinc-300" />
            <span className="flex-1">Search people, posts, topics</span>
            <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-zinc-500">/</span>
          </motion.button>

          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 8, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 top-full z-50 mt-2 w-90 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0c16]/95 p-3 shadow-2xl shadow-black/40"
              >
                <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-zinc-400" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search Social Hub"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                    />
                    {query ? (
                      <button type="button" onClick={() => setQuery("")} className="text-zinc-400 transition hover:text-white">
                        <X size={15} />
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-500">
                    <span>Recent searches</span>
                    <span className="inline-flex items-center gap-1 text-indigo-300"><Sparkles size={12} /> Live suggestions</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item) => (
                      <button key={item} className="rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-indigo-400/60 hover:bg-indigo-500/10">
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {suggestions.map((item) => (
                      <button key={item.title} className="flex w-full items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-3 py-2 text-left transition hover:border-white/15 hover:bg-white/7">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500/25 to-fuchsia-500/25 text-indigo-200">
                          <Filter size={15} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{item.title}</div>
                          <div className="text-xs text-zinc-400">{item.subtitle}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setMobileSearchOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 transition hover:border-white/20 hover:bg-white/10 md:hidden"
            aria-label="Search"
          >
            <Search size={17} />
          </button>

          <div className="relative" data-notification-panel>
            <motion.button
              type="button"
              onClick={() => setNotificationsOpen((value) => !value)}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
              aria-label="Notifications"
            >
              <Bell size={17} />
              <span className="absolute right-1.5 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-linear-to-r from-pink-500 to-orange-400 px-1 text-[10px] font-bold text-black shadow-lg shadow-pink-500/25">
                {unreadCount}
              </span>
            </motion.button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 12, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-full mt-2 w-85 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0c16]/95 shadow-2xl shadow-black/40"
                >
                  <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                    <div>
                      <div className="text-sm font-semibold text-white">Notifications</div>
                      <div className="text-xs text-zinc-400">{unreadCount} unread</div>
                    </div>
                    <button className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-200 transition hover:bg-white/10">
                      <CheckCheck size={13} /> Mark all read
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto p-2">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-start gap-3 rounded-2xl px-3 py-3 transition ${item.read ? "opacity-70" : "bg-white/5"}`}
                      >
                        <div className={`mt-1 h-2.5 w-2.5 rounded-full ${item.read ? "bg-zinc-600" : "bg-emerald-400 shadow-lg shadow-emerald-400/30"}`} />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{item.title}</div>
                          <div className="mt-0.5 flex items-center gap-1 text-xs text-zinc-400">
                            <Clock3 size={11} /> {item.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/8 px-4 py-3 text-center text-xs text-zinc-400">
                    Hover cards and badge counter are animated for quick awareness.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />

          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 transition hover:border-white/20 hover:bg-white/10">
            <User size={17} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/75 p-4 backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              className="mx-auto mt-12 max-w-md rounded-3xl border border-white/10 bg-[#0b0c16] p-4 shadow-2xl shadow-black/60"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white">Search</div>
                <button onClick={() => setMobileSearchOpen(false)} className="rounded-full bg-white/5 p-2 text-zinc-200">
                  <X size={16} />
                </button>
              </div>

              <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 px-3 py-3">
                <div className="flex items-center gap-2">
                  <Search size={16} className="text-zinc-400" />
                  <input
                    value={mobileSearchQuery}
                    onChange={(event) => setMobileSearchQuery(event.target.value)}
                    placeholder="Search posts, users, tags"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">Recent</div>
                {recentSearches.map((item) => (
                  <button key={item} className="flex w-full items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-3 py-3 text-left text-sm text-zinc-200">
                    <span>{item}</span>
                    <Send size={14} className="text-zinc-500" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
