"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

type Props = {
  className?: string;
};

export default function ResponsiveSidebar({ className }: Props) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange as any);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <aside className={className}>
      <Sidebar />
    </aside>
  );
}
