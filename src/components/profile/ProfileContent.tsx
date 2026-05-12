"use client";

import { useMemo, useState } from "react";
import Avatar from "@/components/ui/avatar";
import PostCard from "@/components/feed/PostCard";

type Post = {
  id: string;
  userId: string;
  content: string;
  img?: string;
  likes: number;
  comments: number;
  timestamp: string;
};

type User = { id: string; name: string; handle: string; verified?: boolean };

export default function ProfileContent({
  user,
  posts,
  likedIds = [],
  savedIds = [],
}: {
  user: User;
  posts: Post[];
  likedIds?: string[];
  savedIds?: string[];
}) {
  const [tab, setTab] = useState<"my" | "liked" | "saved">("my");
  const [query, setQuery] = useState("");

  const myPosts = useMemo(() => posts.filter((p) => p.userId === user.id), [posts, user.id]);
  const likedPosts = useMemo(() => posts.filter((p) => likedIds.includes(p.id)), [posts, likedIds]);
  const savedPosts = useMemo(() => posts.filter((p) => savedIds.includes(p.id)), [posts, savedIds]);

  const source = tab === "my" ? myPosts : tab === "liked" ? likedPosts : savedPosts;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return source;
    return source.filter((p) => p.content.toLowerCase().includes(q));
  }, [source, query]);

  // Instagram-like header and grid
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-6">
          <div>
            <Avatar name={user.name} size={96} online />
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold">{user.handle}</h2>
              <button className="ml-2 rounded-md px-3 py-1 border border-white/10 bg-white/4 text-sm font-medium">Edit profile</button>
              <button className="rounded-md px-3 py-1 border border-white/10 bg-indigo-600 text-white text-sm font-medium">Follow</button>
            </div>

            <div className="flex gap-6 mt-4">
              <div className="text-center">
                <div className="text-lg font-semibold">{myPosts.length}</div>
                <div className="text-xs text-zinc-400">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{likedPosts.length}</div>
                <div className="text-xs text-zinc-400">Liked</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{savedPosts.length}</div>
                <div className="text-xs text-zinc-400">Saved</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-zinc-200 max-w-xl">
              A short bio goes here. Designer • Maker • Explorer. Links and a small description.
            </div>
          </div>
        </div>

        <div className="sm:hidden">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <div className="text-sm text-zinc-400">@{user.handle}</div>
        </div>
      </div>

      <div className="border-t border-white/6 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setTab("my")} className={`flex items-center gap-2 px-3 py-2 text-sm ${tab === "my" ? "text-white" : "text-zinc-400"}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90"><path fill="currentColor" d="M3 3h18v18H3z"/></svg>
              Posts
            </button>
            <button onClick={() => setTab("liked")} className={`flex items-center gap-2 px-3 py-2 text-sm ${tab === "liked" ? "text-white" : "text-zinc-400"}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90"><path fill="currentColor" d="M12 21s-6-4.35-9-7.33C.89 11.62 2 6 7.5 6c2.24 0 3.99 1.34 4.5 2.09C12.51 7.34 14.26 6 16.5 6 22 6 23.11 11.62 21 13.67 18 16.65 12 21 12 21z"/></svg>
              Liked
            </button>
            <button onClick={() => setTab("saved")} className={`flex items-center gap-2 px-3 py-2 text-sm ${tab === "saved" ? "text-white" : "text-zinc-400"}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90"><path fill="currentColor" d="M6 2h12v20l-6-3-6 3V2z"/></svg>
              Saved
            </button>
          </div>

          <div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter posts" className="rounded-md bg-white/3 border border-white/6 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div className="mt-6">
          {source.length === 0 ? (
            <div className="text-sm text-zinc-400">No posts to show.</div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {filtered.map((p) => (
                <div key={p.id} className="aspect-square rounded-sm overflow-hidden bg-white/5 border border-white/6">
                  {p.img ? (
                    <div className="h-full w-full bg-linear-to-tr from-indigo-700 via-purple-700 to-pink-600" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs text-zinc-300 p-2">{p.content.slice(0, 80)}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
