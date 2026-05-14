import { Sparkles } from "lucide-react";
import { interests } from "./explore-data";

export function ExploreHeader() {
  return (
    <div className="overflow-x-hidden bg-black/55 backdrop-blur-xl py-4 rounded-xl">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {interests.map((item, index) => (
          <button
            key={item}
            type="button"
            className={
              index === 0
                ? "shrink-0 rounded-full border border-cyan-300/30 bg-cyan-400/15 px-3 py-1.5 text-xs font-medium text-cyan-100"
                : "shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
            }
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}