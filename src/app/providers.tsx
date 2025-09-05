"use client";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // dynamically import to avoid bundling in prod
      // @ts-ignore
      import("../mocks/enable.mjs");
    }
  }, []);
  return <>{children}</>;
}
