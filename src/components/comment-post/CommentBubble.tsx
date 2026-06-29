"use client";

import { useState } from "react";
import { timeAgo } from "@/lib/utils"
import { CheckCheck } from "lucide-react";
import type { Comment } from "@/types/comment";
import { useLikeComment, useUnlikeComment } from "@/hooks/useComment";
import Avatar from "../ui/avatar";

export function CommentBubble({
  comment,
  onReply,
  isReply = false,
  replyToUsername,
}: {
  comment: Comment;
  onReply: (comment: Comment) => void;
  isReply?: boolean;
  replyToUsername?: string;
}) {
  const [optimisticLiked, setOptimisticLiked] = useState(false);
  const { mutate: likeComment } = useLikeComment();
  const { mutate: unlikeComment } = useUnlikeComment();

  const handleLike = () => {
    if (optimisticLiked) {
      setOptimisticLiked(false);
      unlikeComment(comment.id);
    } else {
      setOptimisticLiked(true);
      likeComment(comment.id);
    }
  };

  const likesCount = (comment.likeCount || 0) + (optimisticLiked ? 1 : 0);

  return (
    <div className={`flex ${isReply ? 'gap-2.5 mt-2' : 'gap-3 mt-4'}`}>
      <div className="mt-0.5 shrink-0">
        <Avatar size={isReply ? 28 : 36} name={comment.author.displayName} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="inline-block py-2 px-3.5 bg-slate-100 dark:bg-white/5 rounded-2xl rounded-tl-sm max-w-full">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={`font-semibold text-slate-900 dark:text-white truncate ${isReply ? 'text-xs' : 'text-sm'}`}>
              {comment.author.displayName}
            </span>
            {comment.author.isVerified && (
              <CheckCheck size={12} className="text-sky-400 shrink-0" />
            )}
          </div>
          <p className={`text-slate-800 dark:text-zinc-200 break-words leading-snug ${isReply ? 'text-xs' : 'text-sm'}`}>
            {replyToUsername && (
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold mr-1">
                @{replyToUsername}
              </span>
            )}
            {comment.content.split(/(@\w+)/g).map((part, i) =>
              part.startsWith('@') ? (
                <span key={i} className="text-indigo-600 dark:text-indigo-400 font-semibold">{part}</span>
              ) : (
                part
              )
            )}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-1 ml-2">
          <span className="text-[11px] text-slate-500 dark:text-zinc-500 font-medium">
            {timeAgo(comment.createdAt)}
          </span>
          <button
            onClick={() => onReply(comment)}
            className="text-[11px] font-bold text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition"
          >
            Reply
          </button>
          <button
            onClick={handleLike}
            className={`text-[11px] font-bold transition ${optimisticLiked ? "text-indigo-500 dark:text-indigo-400" : "text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
          >
            Like {likesCount > 0 && `(${likesCount})`}
          </button>
        </div>
      </div>
    </div>
  );
}