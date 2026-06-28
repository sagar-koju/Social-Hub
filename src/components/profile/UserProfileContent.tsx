"use client";

import { useMemo, useState } from "react";
import Avatar from "@/components/ui/avatar";
import type { Post } from "@/types/post";
import { UserProfile } from "@/types/userProfile"
import { useGetPostByUsername } from "@/hooks/usePosts";
import { FollowButton } from "@/components/features/FollowButton";
import { Heart, Repeat } from "lucide-react";

export default function UserProfileContent({
  user,
  posts,
  likedIds = [],
  savedIds = [],
}: {
  user: UserProfile;
  posts: Post[];
  likedIds?: string[];
  savedIds?: string[];
}) {
  const [tab, setTab] = useState<"my" | "liked" | "saved">("my");
  const [query, setQuery] = useState("");

  // use the username from the already-available user prop instead of useParams()
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useGetPostByUsername(user.username);
  const myPosts = data?.pages.flatMap(page => page.posts) ?? [];

  if (!isLoading && error) {

    console.log(myPosts, "myPosts in profile content");
  }
  const likedPosts = useMemo(() => posts.filter((p) => likedIds.includes(p.id)), [posts, likedIds]);
  const savedPosts = useMemo(() => posts.filter((p) => savedIds.includes(p.id)), [posts, savedIds]);

  const source = tab === "my" ? myPosts : tab === "liked" ? likedPosts : savedPosts;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return source;
    return source.filter((p) => p.content.toLowerCase().includes(q));
  }, [source, query]);

  return (
    <div className="w-full border border-slate-300 dark:border-white/10 bg-white dark:bg-black/50 p-2 md:px-4 md:py-10 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 rounded-3xl">
      <div className="space-y-4 mx-auto max-w-[765px]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex flex-col items-center gap-6 w-full">

            {/* Avatar + Name + Username */}
            <div className="flex flex-col gap-4 md:flex-row items-center justify-start w-full">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.displayName}
                  className="w-24 h-24 rounded-full object-cover border-2 border-slate-300 dark:border-white/10"
                />
              ) : (
                <Avatar name={user.displayName} size={96} online />
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{user.displayName}</h2>
                  {user.isVerified && (
                    <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="text-sm text-zinc-400">@{user.username}</div>
                <div className="text-xs text-zinc-500 mt-1">
                  Joined in {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="mt-2 text-sm text-zinc-900 dark:text-zinc-300 max-w-xl w-full">
              {user.bio ?? <span className="text-zinc-500 italic">No bio yet.</span>}
            </p>

            {/* Action Buttons */}
            <div className="flex w-full justify-between items-center gap-4 p-5">
              <button className="ml-2 rounded-md px-5 md:px-16 py-2 border border-slate-300 dark:border-white/10 bg-slate-300 dark:bg-white/4 text-sm text-slate-900 dark:text-slate-100 font-medium">
                Message
              </button>
              <FollowButton username={user.username} isFollowing={user.isFollowing} />
            </div>

            {/* Stats */}
            <div className="w-full">
              <div className="flex justify-between items-center gap-6 mt-4 px-5">
                <div className="flex flex-col sm:flex-row gap-2 text-center">
                  <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">{myPosts.length}</div>
                  <div className="text-slate-600 dark:text-zinc-400 mt-1">Posts</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 text-center">
                  <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">{user.followerCount}</div>
                  <div className="text-slate-600 dark:text-zinc-400 mt-1">Followers</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 text-center">
                  <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">{user.followingCount}</div>
                  <div className="text-slate-600 dark:text-zinc-400 mt-1">Following</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-slate-300 dark:border-white/6 px-5 mt-4">
          <div className="flex items-center justify-between gap-6">
            <button onClick={() => setTab("my")} className={`flex items-center gap-2 px-3 py-2 text-sm ${tab === "my" ? "text-white" : "text-zinc-400"}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-90"><path fill="currentColor" d="M3 3h18v18H3z" /></svg>
              {/* Posts */}
            </button>
            <button onClick={() => setTab("liked")} className={`flex items-center gap-2 px-3 py-2 text-sm ${tab === "liked" ? "text-white" : "text-zinc-400"}`}>
              <Heart size={20} />
              {/* <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-90"><path fill="currentColor" d="M12 21s-6-4.35-9-7.33C.89 11.62 2 6 7.5 6c2.24 0 3.99 1.34 4.5 2.09C12.51 7.34 14.26 6 16.5 6 22 6 23.11 11.62 21 13.67 18 16.65 12 21 12 21z" /></svg> */}
              {/* Liked */}
            </button>
            <button onClick={() => setTab("saved")} className={`flex items-center gap-2 px-3 py-2 text-sm ${tab === "saved" ? "text-white" : "text-zinc-400"}`}>
              {/* repost */}
              <Repeat size={20} />
            </button>
            <button onClick={() => setTab("saved")} className={`flex items-center gap-2 px-3 py-2 text-sm ${tab === "saved" ? "text-white" : "text-zinc-400"}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-90"><path fill="currentColor" d="M6 2h12v20l-6-3-6 3V2z" /></svg>
              {/* Tagged */}
            </button>
          </div>

          {/* Posts Grid */}
          {isLoading && <div className="mt-6">
            {source.length === 0 ? (
              <div className="text-sm text-zinc-400">No posts to show.</div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {filtered.map((p) => (
                  <div key={p.id} className="aspect-square rounded-sm overflow-hidden bg-white/5 border border-white/6">
                    {p.img ? (
                      <img src={p.img} alt="Post content" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs text-zinc-300 p-2">
                        {p.content.slice(0, 80)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>}
        </div>
      </div>
    </div>
  );
}