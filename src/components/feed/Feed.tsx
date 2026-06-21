"use client";
import { motion } from "framer-motion";
import Composer from "@/components/feed/Composer";
import Stories from "@/components/feed/Stories";
import PostCard from "@/components/feed/PostCard";
import SkeletonPost from "@/components/feed/SkeletonPost";
import { useGetHomeFeed } from "@/hooks/useFeed";
import { Post } from "@/types/post";

export default function Feed() {
  const { data, isLoading, error } = useGetHomeFeed();
  const myFeed = data?.pages.flatMap(page => page.data) ?? [];

  // const myFeed = data?.data??[];

   // const handleScroll = () => {
  //   console.log(window.scrollY, "scrollY");
  //   const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
  //   if (bottom && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [hasNextPage, fetchNextPage]);

  console.log(myFeed, "myFeed");

  return (
    <div>
      <Composer />
      <Stories />

      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
        {isLoading && (
          <>
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </>
        )}
        {error && <p className="text-center text-red-500">Oops! Something Went Wrong</p>}
        {!isLoading && myFeed?.map((p: Post) => (
          <PostCard key={p.id} post={p} />
        ))}
      </motion.div>
    </div>
  );
}
