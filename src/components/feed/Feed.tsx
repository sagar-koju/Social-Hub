"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Composer from "@/components/feed/Composer";
import Stories from "@/components/feed/Stories";
import PostCard from "@/components/feed/PostCard";
import SkeletonPost from "@/components/feed/SkeletonPost";
import { posts as mockPosts, users as mockUsers } from "@/lib/mock-data/mockFeed";

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const pageRef = useRef(1);

  useEffect(() => {
    // simulate loading
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 700);
  }, []);

  function loadMore() {
    setLoading(true);
    pageRef.current += 1;
    setTimeout(() => {
      // append same posts for demo
      setPosts((p) => [...p, ...mockPosts]);
      setLoading(false);
    }, 900);
  }

  return (
    <div>
      <Composer />
      <Stories />

      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
        {loading && (
          <>
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </>
        )}

        {!loading && posts.map((p, i) => {
          const user = mockUsers.find((u) => u.id === p.userId) || { name: 'Unknown', handle: 'unknown' };
          return <PostCard key={`${p.id}-${i}`} post={p} user={user} />;
        })}
      </motion.div>

      <div className="flex justify-center mt-4">
        <button onClick={loadMore} className="px-4 py-2 rounded-xl bg-white/5 border border-white/6">Load more</button>
      </div>
    </div>
  );
}
