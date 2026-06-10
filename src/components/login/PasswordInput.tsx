"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function PasswordInput({ value, onChange, placeholder }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Password"}
        className="w-full rounded-xl bg-black/5 dark:bg-white/3 border border-black/20 dark:border-white/6 px-4 py-3 px-10 outline-none focus:ring-2 focus:ring-indigo-500 transition placeholder:text-zinc-500"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-700/50 dark:text-zinc-200/80"
        aria-label="Toggle password visibility"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
