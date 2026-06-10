"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const languages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "csharp",
  "php",
  "ruby",
  "go",
  "rust",
  "sql",
  "html",
  "css",
];

export default function CodeSnippetPostForm() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [description, setDescription] = useState("");

  const handlePost = () => {
    if (title.trim() && code.trim()) {
      console.log("Code Snippet Post:", { title, code, language, description });
      setTitle("");
      setCode("");
      setLanguage("javascript");
      setDescription("");
      // Handle post submission here
    }
  };

  const isValid = title.trim().length > 0 && code.trim().length > 0;

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label className="text-sm font-medium text-zinc-600  dark:text-zinc-300">Snippet Title</label>
        <Input
          placeholder="Give your code a name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 bg-white/5 border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-zinc-500"
        />
      </div>

      {/* Language Selector */}
      <div>
        <label className="text-sm font-medium text-zinc-600  dark:text-zinc-300">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-2 w-full rounded-lg bg-white/5 border border-slate-300 dark:border-white/10 px-3 py-2 text-slate-900 dark:text-white"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang} className="bg-white/80 dark:bg-slate-950 text-xs">
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Code Editor */}
      <div>
        <label className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Code</label>
        <div className="mt-2 rounded-lg bg-slate-100 dark:bg-black/40 border border-slate-300 dark:border-white/10 overflow-hidden">
          <div className="bg-white/5 border-b border-slate-300 dark:border-white/10 px-3 py-2 text-xs text-zinc-500 flex justify-between">
            <span>{language}</span>
            <span>{code.split("\n").length} lines</span>
          </div>
          <Textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="min-h-64 resize-none bg-transparent border-0 text-slate-900 dark:text-white placeholder-zinc-600 font-mono text-xs"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium text-zinc-600  dark:text-zinc-300">Description (Optional)</label>
        <Textarea
          placeholder="Explain what this code does..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 min-h-24 resize-none bg-white/5 border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-zinc-500 focus:border-none"
         />
      </div>

      {/* Code Preview */}
      {code.trim() && (
        <div className="rounded-lg bg-slate-100 dark:bg-black/60 border border-slate-300 dark:border-white/10 p-3">
          <div className="text-xs text-zinc-500 mb-2">Preview</div>
          <pre className="text-xs text-black dark:text-white overflow-x-auto">
            <code>{code.slice(0, 300)}{code.length > 300 ? "..." : ""}</code>
          </pre>
        </div>
      )}

      <div className="flex gap-2 pt-4">
        <Button
          onClick={handlePost}
          disabled={!isValid}
          className="flex-1 bg-linear-to-r from-indigo-500 to-fuchsia-500 hover:opacity-90"
        >
          Share Snippet
        </Button>
      </div>
    </div>
  );
}
