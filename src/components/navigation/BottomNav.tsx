"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, PlusCircle, MessageCircle, User } from "lucide-react";

const nav = [
  { href: "/feed", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/create", label: "Create", icon: PlusCircle, primary: true },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="w-full max-w-md rounded-t-3xl border border-white/10 bg-black/70 px-3 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="grid grid-cols-5 gap-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition ${
                  item.primary
                    ? "-mt-6 bg-linear-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20"
                    : active
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <motion.span whileTap={{ scale: 0.88 }} className="inline-flex items-center justify-center">
                  <Icon size={18} />
                </motion.span>
                <span className={active || item.primary ? "text-white" : undefined}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
