"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LeftBrand() {
    useEffect(()=> {

    }, [])
  return (
    <section className="relative w-full rounded-2xl overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-80 blur-2xl" />

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="p-12 lg:p-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-white/20 to-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15 8H9L12 2Z" fill="white" opacity="0.9" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold">Social Hub</h3>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
          Connect, share, and discover - modern social made simple
        </h1>

        <p className="text-zinc-200 max-w-xl mb-8">
          A playful space for authentic conversations. Join creators, friends, and communities
          with a clean, beautiful experience.
        </p>

        <div className="relative">
          <div className="rounded-xl bg-gradient-to-br from-white/5 to-white/3 p-6 backdrop-blur-sm border border-white/6 shadow-lg">
            <div className="h-40 rounded-md bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-600" />
          </div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -left-6 w-36 h-20 rounded-2xl bg-white/5 border border-white/6 shadow-lg flex items-center justify-center text-sm"
          >
            <div className="text-zinc-100/90">New Post • 2</div>
          </motion.div>

          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 w-28 h-16 rounded-xl bg-white/4 border border-white/6 shadow"
          />
        </div>
      </motion.div>
    </section>
  );
}
