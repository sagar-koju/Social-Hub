"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCheck, Heart } from "lucide-react";
import Avatar from "@/components/ui/avatar";
import { timeAgo } from "@/lib/utils";
import type { Post } from "@/types/post";

// ── Types ────────────────────────────────────────────────────────────────────
interface Comment {
  id: string;
  author: {
    displayName: string;
    username: string;
    isVerified?: boolean;
  };
  content: string;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
}

interface CommentModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  comments?: Comment[];
  isLoading?: boolean;
  onSubmitComment?: (content: string) => void;
  isSubmitting?: boolean;
}

// ── Comment Item ─────────────────────────────────────────────────────────────
function CommentItem({ comment }: { comment: Comment }) {
  const [liked, setLiked] = useState(comment.isLiked);
  const [likes, setLikes] = useState(comment.likeCount);

  return (
    <div className="flex gap-3 py-3 border-b border-slate-100 dark:border-white/5 last:border-0">
      <Avatar name={comment.author.displayName} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {comment.author.displayName}
            </span>
            {comment.author.isVerified && (
              <CheckCheck size={12} className="text-sky-400 shrink-0" />
            )}
            <span className="text-xs text-slate-500 dark:text-zinc-500">
              · {timeAgo(comment.createdAt)}
            </span>
          </div>

          <button
            onClick={() => {
              setLiked((v) => !v);
              setLikes((l) => (liked ? l - 1 : l + 1));
            }}
            className={`flex items-center gap-1 text-xs transition shrink-0 ${
              liked
                ? "text-red-400"
                : "text-slate-400 dark:text-zinc-500 hover:text-red-400"
            }`}
          >
            <Heart size={13} fill={liked ? "currentColor" : "none"} />
            {likes > 0 && <span>{likes}</span>}
          </button>
        </div>

        <p className="mt-0.5 text-sm leading-5 text-slate-700 dark:text-zinc-300">
          {comment.content}
        </p>
      </div>
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyComments() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-3 text-3xl">💬</div>
      <p className="text-sm font-medium text-slate-700 dark:text-zinc-300">No comments yet</p>
      <p className="mt-1 text-xs text-slate-400 dark:text-zinc-500">Be the first to say something.</p>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
export default function CommentModal({
  post,
  isOpen,
  onClose,
  comments = [],
  isLoading = false,
  onSubmitComment,
  isSubmitting = false,
}: CommentModalProps) {
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = () => {
    const trimmed = draft.trim();
    if (!trimmed || isSubmitting) return;
    onSubmitComment?.(trimmed);
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed inset-x-4 bottom-4 top-[10%] z-50 mx-auto flex max-w-lg flex-col rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-950 shadow-2xl shadow-black/30 overflow-hidden"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-white/8 shrink-0">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Comments
                </h2>
                <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">
                  {post.commentCount} {post.commentCount === 1 ? "comment" : "comments"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 dark:text-zinc-400 transition hover:bg-slate-100 dark:hover:bg-white/8 hover:text-slate-900 dark:hover:text-white"
                aria-label="Close comments"
              >
                <X size={16} />
              </button>
            </div>

            {/* ── Original post snippet ── */}
            <div className="px-5 py-3 border-b border-slate-100 dark:border-white/8 bg-slate-50 dark:bg-white/3 shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={post.author.displayName} />
                <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                  {post.author.displayName}
                </span>
                {post.author.isVerified && (
                  <CheckCheck size={11} className="text-sky-400" />
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-5 line-clamp-2 ml-8">
                {post.content}
              </p>
            </div>

            {/* ── Scrollable comments list ── */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 overscroll-contain"
              style={{ scrollbarWidth: "thin" }}
            >
              {isLoading ? (
                <div className="flex flex-col gap-4 py-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-3 animate-pulse">
                      <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-white/10 shrink-0" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-3 w-24 rounded bg-slate-200 dark:bg-white/10" />
                        <div className="h-3 w-full rounded bg-slate-200 dark:bg-white/10" />
                        <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-white/10" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : comments.length === 0 ? (
                <EmptyComments />
              ) : (
                <div className="py-1">
                  {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))}
                </div>
              )}
            </div>

            {/* ── Comment input ── */}
            <div className="shrink-0 border-t border-slate-100 dark:border-white/8 px-4 py-3 bg-white dark:bg-zinc-950">
              <div className="flex items-end gap-3">
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Write a comment…"
                  rows={1}
                  className="flex-1 resize-none rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-2.5 text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 dark:focus:ring-indigo-400/30 transition max-h-28 overflow-y-auto"
                  style={{ scrollbarWidth: "none" }}
                  onInput={(e) => {
                    // Auto-grow textarea
                    const el = e.currentTarget;
                    el.style.height = "auto";
                    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
                  }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!draft.trim() || isSubmitting}
                  className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white transition hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Post comment"
                >
                  <Send size={16} className={isSubmitting ? "animate-pulse" : ""} />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-slate-400 dark:text-zinc-600">
                ⌘ + Enter to post
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}