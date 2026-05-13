"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Paperclip, Send, Sparkles, UserRound, Video, Phone, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { ChatMessage, Conversation } from "./messages-data";

type ChatWindowProps = {
  conversation?: Conversation;
  messages: ChatMessage[];
  draft: string;
  onDraftChange: (value: string) => void;
  onSendMessage: () => void;
  isTyping?: boolean;
  onOpenSidebar?: () => void;
  onOpenInfo?: () => void;
};

export function ChatWindow({
  conversation,
  messages,
  draft,
  onDraftChange,
  onSendMessage,
  isTyping,
  onOpenSidebar,
  onOpenInfo,
}: ChatWindowProps) {
  const bottomAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, isTyping, conversation?.id]);

  if (!conversation) {
    return (
      <section className="flex h-screen items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
        <div className="max-w-sm space-y-3">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
            <Sparkles className="size-6" />
          </div>
          <h3 className="text-xl font-semibold text-white">Select a conversation</h3>
          <p className="text-sm leading-6 text-slate-400">
            Pick a chat from the sidebar to open the message thread and start replying.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-2xl bg-linear-to-br text-sm font-semibold text-white shadow-lg",
              conversation.accent,
            )}
          >
            {conversation.avatar}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-lg font-semibold text-white">{conversation.name}</h2>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                  conversation.status === "online"
                    ? "bg-emerald-400/10 text-emerald-200"
                    : conversation.status === "away"
                      ? "bg-amber-400/10 text-amber-200"
                      : "bg-slate-500/10 text-slate-300",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    conversation.status === "online"
                      ? "bg-emerald-300"
                      : conversation.status === "away"
                        ? "bg-amber-300"
                        : "bg-slate-400",
                  )}
                />
                {conversation.lastSeen}
              </span>
            </div>
            <p className="truncate text-sm text-slate-400">
              {conversation.title} · {conversation.handle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" className="text-slate-300 hover:bg-white/5 hover:text-white">
            <Video className="size-6" />
            <span className="sr-only">Start video call</span>
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-slate-300 hover:bg-white/5 hover:text-white">
            <Phone className="size-5" />
            <span className="sr-only">Start call</span>
          </Button>
          {onOpenSidebar ? (
            <Button variant="ghost" size="icon-sm" className="text-slate-300 hover:bg-white/5 hover:text-white md:hidden" onClick={onOpenSidebar}>
              <UserRound className="size-4" />
              <span className="sr-only">Open conversations</span>
            </Button>
          ) : null}
          {onOpenInfo ? (
            <Button variant="ghost" size="icon-sm" className="text-slate-300 hover:bg-white/5 hover:text-white xl:hidden" onClick={onOpenInfo}>
              <Info className="size-5" />
              <span className="sr-only">Open info panel</span>
            </Button>
          ) : null}
          
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-4 p-4 sm:p-6">
          <div className="mx-auto max-w-md rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-center text-xs text-violet-100">
            Messages sync across devices in real time.
          </div>

          <AnimatePresence initial={false}>
            {messages.map((message, index) => {
              const incoming = message.author === "incoming";

              return (
                <motion.div
                  key={message.id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.25, delay: index * 0.02 }}
                  className={cn("flex", incoming ? "justify-start" : "justify-end")}
                >
                  <div
                    className={cn(
                      "max-w-[86%] rounded-3xl px-4 py-3 shadow-lg sm:max-w-[72%]",
                      incoming
                        ? "border border-white/10 bg-slate-900/70 text-slate-100"
                        : "bg-linear-to-r from-violet-500 to-fuchsia-500 text-white",
                    )}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-6">{message.body}</p>
                    <div className={cn("mt-2 text-[11px]", incoming ? "text-slate-400" : "text-white/80")}>{message.time}</div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isTyping ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300 shadow-lg">
                Typing...
              </div>
            </motion.div>
          ) : null}

          <div ref={bottomAnchorRef} />
        </div>
      </ScrollArea>

      <div className="border-t border-white/10 p-4 sm:p-5">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-3 shadow-2xl shadow-black/20">
          <div className="flex items-end gap-2">
            <Button variant="ghost" size="icon-sm" className="shrink-0 text-slate-300 hover:bg-white/5 hover:text-white">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>

            <Textarea
              value={draft}
              onChange={(event) => onDraftChange(event.target.value)}
              placeholder={`Message ${conversation.name.split(" ")[0]}...`}
              className="min-h-13 border-0 bg-transparent px-1 py-3 text-white placeholder:text-slate-500 focus-visible:ring-0"
            />

            <Button
              onClick={onSendMessage}
              disabled={!draft.trim()}
              className="shrink-0 bg-linear-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-95"
            >
              <Send className="size-4" />
              Send
            </Button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Shift + Enter for a new line</span>
            <span>{conversation.lastSeen}</span>
          </div>
        </div>
      </div>
    </section>
  );
}