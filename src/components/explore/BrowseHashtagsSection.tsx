import { Hash } from "lucide-react";
import { hashtags } from "./explore-data";

export function BrowseHashtagsSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/45 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <Hash className="size-4 text-fuchsia-300" />
        <h2 className="text-base font-semibold text-white">Browse hashtags</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {hashtags.map((tag) => (
          <button
            key={tag}
            type="button"
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-fuchsia-300/35 hover:bg-fuchsia-400/10 hover:text-fuchsia-100"
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}