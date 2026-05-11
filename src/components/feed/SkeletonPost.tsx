"use client";

export default function SkeletonPost() {
  return (
    <div className="relative mb-4 overflow-hidden rounded-3xl border border-white/8 bg-black/40 p-4">
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
      <div className="relative flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-white/6" />
        <div className="flex-1 space-y-3">
          <div className="h-3 w-1/3 rounded-full bg-white/6" />
          <div className="h-3 w-full rounded-full bg-white/6" />
          <div className="h-3 w-5/6 rounded-full bg-white/6" />
          <div className="mt-4 h-56 rounded-2xl bg-white/6" />
        </div>
      </div>
    </div>
  );
}
