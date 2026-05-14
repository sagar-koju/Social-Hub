import { ArrowUpRight } from "lucide-react";
import PostCard from "@/components/feed/PostCard";
import { users, posts as feedPosts } from "@/lib/mock-data/mockFeed";

type FeedPost = (typeof feedPosts)[number];

type PopularPostsSectionProps = {
  posts: FeedPost[];
};

export function PopularPostsSection({ posts }: PopularPostsSectionProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/45 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-white">Popular posts</h2>
        <span className="inline-flex items-center gap-1 text-xs text-cyan-200">
          See insights
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>

      {posts.map((post) => {
        const user = users.find((item) => item.id === post.userId);

        if (!user) {
          return null;
        }

        return (
          <PostCard
            key={`explore-${post.id}`}
            post={post}
            user={{
              name: user.name,
              handle: user.handle,
              verified: user.verified,
            }}
          />
        );
      })}
    </section>
  );
}