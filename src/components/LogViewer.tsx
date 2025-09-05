"use client";
import { useEffect, useRef, useState } from "react";

export default function LogViewer({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (auto && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [lines, auto]);

  return (
    <div className="border border-gray-700 rounded">
      <div className="flex items-center justify-between bg-gray-800/60 px-3 py-2 text-xs">
        <span>Logs</span>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={auto} onChange={() => setAuto((v) => !v)} />
          Auto-scroll
        </label>
      </div>
      <div ref={ref} className="h-80 overflow-auto whitespace-pre-wrap p-3 font-mono text-xs">
        {lines.join("\n")}
      </div>
    </div>
  );
}
