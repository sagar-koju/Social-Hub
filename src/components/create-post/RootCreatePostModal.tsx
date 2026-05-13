"use client";

import { useCreatePostModal } from "@/hooks/useCreatePostModal";
import CreatePostModal from "@/components/create-post/CreatePostModal";

export default function RootCreatePostModal() {
  const { isOpen, closeModal } = useCreatePostModal();

  return <CreatePostModal isOpen={isOpen} onClose={closeModal} />;
}
