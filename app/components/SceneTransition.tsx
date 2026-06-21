"use client";
import { useEffect, useState } from "react";

export default function SceneTransition({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 50),
      window.setTimeout(() => setPhase(2), 400),
      window.setTimeout(() => {
        setPhase(3);
        onDone();
      }, 800),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" style={{
      background: phase === 1 ? "rgba(21,8,23,0.95)" : "transparent",
      transition: phase >= 2 ? "background 0.4s ease" : "background 0.3s ease",
      opacity: phase >= 3 ? 0 : 1,
    }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl animate-spin-slow" style={{ opacity: phase === 1 ? 1 : 0, transition: "opacity 0.3s" }}>
          ✨
        </div>
      </div>
    </div>
  );
}
