"use client";

import { useContext } from "react";
import { CreatePostContext } from "@/providers/create-post-provider";

export function useCreatePostModal() {
  const context = useContext(CreatePostContext);
  if (!context) {
    throw new Error("useCreatePostModal must be used within CreatePostProvider");
  }
  return context;
}
