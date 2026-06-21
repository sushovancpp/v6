"use client";

import { useEffect, useRef, useState } from "react";

interface SceneGifIntroProps {
  onNext: () => void;
}

export default function SceneGifIntro({ onNext }: SceneGifIntroProps) {
  const [visible, setVisible] = useState(false);
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    t1.current = setTimeout(() => setVisible(true), 200);
    t2.current = setTimeout(() => onNext(), 4000);

    return () => {
      if (t1.current) clearTimeout(t1.current);
      if (t2.current) clearTimeout(t2.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(circle at center, #1a0820 0%, #07020b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      {/* Soft pink glow ring behind the gif */}
      <div
        style={{
          position: "absolute",
          width: "clamp(220px, 36vw, 340px)",
          height: "clamp(220px, 36vw, 340px)",
          borderRadius: "50%",
          background: "rgba(233, 79, 125, 0.18)",
          filter: "blur(32px)",
          transition: "opacity 0.6s ease-out",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* GIF container */}
      <div
        style={{
          position: "relative",
          width: "clamp(200px, 30vw, 280px)",
          height: "clamp(200px, 30vw, 280px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease-out",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing/mewmew.gif"
          alt="Birthday intro"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
