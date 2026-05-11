"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Avatar from "@/components/ui/avatar";

const sample = [
  { id: 1, name: 'Ava' },
  { id: 2, name: 'Liam' },
  { id: 3, name: 'Maya' },
  { id: 4, name: 'Noah' },
  { id: 5, name: 'Zoe' },
];

export default function Stories() {
  return (
    <div className="mb-4">
      <div className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ y: -3 }}
          className="group relative shrink-0 snap-start"
        >
          <div className="flex h-26 w-20 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/4 text-zinc-200 transition group-hover:border-indigo-400/40 group-hover:bg-white/7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-fuchsia-500/20">
              <Plus size={18} />
            </div>
            <span className="mt-3 text-xs font-medium text-zinc-300">Add Story</span>
          </div>
        </motion.button>

        {sample.map((s) => (
          <motion.button
  key={s.id}
  whileTap={{ scale: 0.98 }}
  className="group relative shrink-0 snap-start w-20 flex flex-col items-center"
>
  <div className="rounded-full bg-gradient-to-tr from-indigo-500 via-blue-500 to-fuchsia-500 p-[2px] shadow-lg shadow-indigo-500/20">
    
    <div className="rounded-full bg-black/80 p-[2px]">
      
      {/* Make avatar square */}
      <div className="h-16 w-16 rounded-full overflow-hidden">
        <Avatar name={s.name} online/>
      </div>

    </div>
  </div>

  <div className="mt-2 text-center text-xs text-zinc-400 group-hover:text-white">
    {s.name}
  </div>
</motion.button>
        ))}
      </div>
    </div>
  );
}
