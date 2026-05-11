"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  MessageSquare,
  Bell,
  Bookmark,
  User,
  Settings,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
} from "lucide-react";

const nav = [
  { name: "Home", href: "/feed", icon: Home },
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-6"
    >
      <div className="rounded-3xl border border-white/10 bg-black/50 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300">
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            className="hidden rounded-full border border-white/10 bg-white/5 p-2 text-zinc-200 transition hover:border-white/20 hover:bg-white/10 md:inline-flex lg:hidden"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>

        <nav className={`mt-5 flex flex-col gap-1 ${collapsed ? "items-center" : "items-stretch"}`}>
          {nav.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-all duration-300 ${
                  active
                    ? "bg-linear-to-r from-indigo-500/20 to-fuchsia-500/20 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-white/10"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                } ${collapsed ? "justify-center" : "justify-start"}`}
                aria-current={active ? "page" : undefined}
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${active ? "border-white/15 bg-white/10 text-white" : "border-transparent bg-white/5 text-zinc-200 group-hover:border-white/10"}`}>
                  <Icon size={17} />
                </span>
                {!collapsed && <span className="font-medium">{item.name}</span>}
                {active && !collapsed && <span className="ml-auto h-2 w-2 rounded-full bg-pink-400 shadow-lg shadow-pink-400/40" />}
              </Link>
            );
          })}
        </nav>

        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/15 transition hover:scale-[1.01] hover:shadow-fuchsia-500/25">
          <Plus size={16} />
          {!collapsed && "Create Post"}
        </button>

        <div className="mt-6 rounded-2xl border border-white/8 bg-white/4 p-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-11 w-11 rounded-full bg-linear-to-br from-cyan-400 to-indigo-600" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-black bg-emerald-400 shadow-lg shadow-emerald-400/30" />
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-white">Jane Doe</div>
                <div className="truncate text-xs text-zinc-400">@janedoe · Pro creator</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
