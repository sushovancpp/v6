"use client";
import { useEffect, useRef } from "react";

interface ParticlesProps {
  count?: number;
  colors?: string[];
  size?: [number, number];
}

export default function Particles({
  count = 30,
  colors = ["#e94f7d", "#ffd6df", "#f9d98a", "#9ff4dc"],
  size = [4, 12],
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      const s = Math.random() * (size[1] - size[0]) + size[0];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 4 + 3;
      p.style.cssText = `
        position:absolute;
        width:${s}px;
        height:${s}px;
        background:${color};
        border-radius:50%;
        left:${left}%;
        top:${Math.random() * 100}%;
        opacity:${Math.random() * 0.48 + 0.18};
        animation: twinkle ${duration}s ease-in-out ${delay}s infinite;
        box-shadow: 0 0 ${s * 2}px ${color};
        mix-blend-mode: screen;
        pointer-events:none;
      `;
      container.appendChild(p);
    }
  }, [count, colors, size]);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" />;
}
