"use client";

import { motion } from "framer-motion";
import { CalendarDays, FileText, Link2, Pin, ShieldCheck, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Conversation } from "./messages-data";

type ChatInfoPanelProps = {
  conversation?: Conversation;
  className?: string;
};

const quickStats = [
  { label: "Response rate", value: "98%", icon: ShieldCheck },
  { label: "Shared files", value: "24", icon: FileText },
  { label: "Pinned items", value: "6", icon: Pin },
];

export function ChatInfoPanel({ conversation, className }: ChatInfoPanelProps) {
  if (!conversation) {
    return null;
  }

  return (
    <aside className={cn("flex h-full min-h-0 flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl overflow-y-auto", className)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-white/10 bg-slate-950/50 p-4"
      >
        <div className="flex items-center gap-3">
          <div className={cn("flex size-14 items-center justify-center rounded-2xl bg-linear-to-br text-sm font-semibold text-white shadow-lg", conversation.accent)}>
            {conversation.avatar}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{conversation.name}</h3>
            <p className="text-sm text-slate-400">{conversation.role}</p>
          </div>
        </div>

        <div className="mt-4 space-y-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <UserRound className="size-4 text-cyan-200" />
            <span>{conversation.handle}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-cyan-200" />
            <span>{conversation.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link2 className="size-4 text-cyan-200" />
            <span>{conversation.lastSeen}</span>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-3">
        {quickStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-cyan-400/10 p-2 text-cyan-200">
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{stat.label}</p>
                  <p className="text-xs text-slate-400">Realtime team signal</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-white">{stat.value}</span>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Shared media</p>
        <div className="mt-3 space-y-2">
          {conversation.sharedMedia.map((item) => (
            <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
              <span className="truncate pr-2">{item}</span>
              <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-slate-400">Open</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Tags</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {conversation.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}