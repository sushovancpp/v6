"use client";
import { useEffect, useRef } from "react";

export default function FloatingHearts({ count = 15 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = "";

    const hearts = ["💕", "💖", "💗", "💝", "🌸", "✨", "💫", "⭐"];
    for (let i = 0; i < count; i++) {
      const h = document.createElement("div");
      const emoji = hearts[Math.floor(Math.random() * hearts.length)];
      const size = Math.random() * 20 + 14;
      const left = Math.random() * 100;
      const duration = Math.random() * 6 + 5;
      const delay = Math.random() * 8;
      h.style.cssText = `
        position:absolute;
        font-size:${size}px;
        left:${left}%;
        bottom:-50px;
        animation: floatUp ${duration}s ease-in ${delay}s infinite;
        pointer-events:none;
        z-index:5;
        filter: drop-shadow(0 10px 16px rgba(0,0,0,0.2));
      `;
      h.textContent = emoji;
      container.appendChild(h);
    }
  }, [count]);

  return <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true" />;
}
