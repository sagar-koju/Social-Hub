"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";

export default function PollPostForm() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState("24h");

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handlePost = () => {
    const validOptions = options.filter((opt) => opt.trim().length > 0);
    if (question.trim() && validOptions.length >= 2) {
      console.log("Poll Post:", { question, options: validOptions, duration });
      setQuestion("");
      setOptions(["", ""]);
      setDuration("24h");
      // Handle post submission here
    }
  };

  const validOptions = options.filter((opt) => opt.trim().length > 0);
  const isValid = question.trim().length > 0 && validOptions.length >= 2;

  return (
    <div className="space-y-4">
      {/* Question */}
      <div>
        <label className="text-sm font-medium text-zinc-300">Poll Question</label>
        <Input
          placeholder="What would you like to ask?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mt-2 bg-white/5 border-white/10 text-white placeholder-zinc-500"
        />
      </div>

      {/* Options */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">Options</label>
        <div className="space-y-2">
          {options.map((option, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <span className="text-sm text-zinc-400 w-6">{idx + 1}.</span>
              <Input
                placeholder={`Option ${idx + 1}`}
                value={option}
                onChange={(e) => updateOption(idx, e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder-zinc-500"
              />
              {options.length > 2 && (
                <button
                  onClick={() => removeOption(idx)}
                  className="text-zinc-400 hover:text-red-400 transition"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        {options.length < 4 && (
          <button
            onClick={addOption}
            className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
          >
            <Plus size={16} /> Add Option
          </button>
        )}
      </div>

      {/* Duration */}
      <div>
        <label className="text-sm font-medium text-zinc-300">Poll Duration</label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="mt-2 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
        >
          <option value="1h" className="bg-slate-950">1 Hour</option>
          <option value="24h" className="bg-slate-950">24 Hours</option>
          <option value="7d" className="bg-slate-950">7 Days</option>
          <option value="30d" className="bg-slate-950">30 Days</option>
        </select>
      </div>

      {/* Info */}
      <div className="text-xs text-zinc-400">
        {validOptions.length} / {options.length} options filled
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          onClick={handlePost}
          disabled={!isValid}
          className="flex-1 bg-linear-to-r from-indigo-500 to-fuchsia-500 hover:opacity-90"
        >
          Create Poll
        </Button>
      </div>
    </div>
  );
}
