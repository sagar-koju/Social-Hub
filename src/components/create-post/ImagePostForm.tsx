"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";

export default function ImagePostForm() {
  const [images, setImages] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState<string[]>([]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).slice(0, 4 - images.length).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newPreviews.push(event.target.result as string);
            if (newPreviews.length === Array.from(files).length) {
              setPreview([...preview, ...newPreviews]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setPreview(preview.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (preview.length > 0 || caption.trim()) {
      console.log("Image Post:", { images: preview, caption });
      setPreview([]);
      setCaption("");
      // Handle post submission here
    }
  };

  const isValid = preview.length > 0 || caption.trim().length > 0;

  return (
    <div className="space-y-4">
      {/* Image Preview Grid */}
      {preview.length > 0 && (
        <div className={`grid gap-2 ${preview.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
          {preview.map((img, idx) => (
            <div key={idx} className="relative group rounded-lg overflow-hidden bg-white/5 aspect-square">
              <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {preview.length < 4 && (
        <label className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition">
          <Upload className="mx-auto mb-2 text-zinc-400" size={32} />
          <p className="text-sm text-zinc-300">Click to upload or drag and drop</p>
          <p className="text-xs text-zinc-500">PNG, JPG, GIF up to 10MB. Max 4 images.</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </label>
      )}

      {/* Caption */}
      <div>
        <label className="text-sm font-medium text-zinc-300">Caption</label>
        <Textarea
          placeholder="Add a caption to your image..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="mt-2 min-h-32 resize-none bg-white/5 border-white/10 text-white placeholder-zinc-500"
        />
      </div>

      {/* Image count indicator */}
      <div className="text-xs text-zinc-400">
        {preview.length} / 4 images selected
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          onClick={handlePost}
          disabled={!isValid}
          className="flex-1 bg-linear-to-r from-indigo-500 to-fuchsia-500 hover:opacity-90"
        >
          Post
        </Button>
      </div>
    </div>
  );
}
