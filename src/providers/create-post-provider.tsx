"use client";

import React, { createContext, useState, ReactNode } from "react";

interface CreatePostContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const CreatePostContext = createContext<CreatePostContextType | undefined>(undefined);

export function CreatePostProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <CreatePostContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </CreatePostContext.Provider>
  );
}
