"use client";
import { useState, useEffect, useRef } from "react";

export default function Scene5Cake({ onBlow }: { onBlow: () => void }) {
  const [risen, setRisen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [blowing, setBlowing] = useState(false);
  const [blown, setBlown] = useState(false);
  const blownRef = useRef(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setRisen(true), 400);
    const t2 = window.setTimeout(() => setShowPrompt(true), 1200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const handleBlow = () => {
    if (blownRef.current) return;
    blownRef.current = true;
    setBlowing(true);

    // High-fidelity audio synthesizer using Web Audio API
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // 1. Wind whoosh generation
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.4);
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 800;
      filter.Q.value = 0.6;
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.55, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.55);
      
      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();

      // 2. Clear harmonic chime synthesis
      window.setTimeout(() => {
        const osc = ctx.createOscillator();
        const g2 = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.3);
        
        g2.gain.setValueAtTime(0.35, ctx.currentTime);
        g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);
        
        osc.connect(g2);
        g2.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.1);
      }, 280);
    } catch (_) {}

    window.setTimeout(() => {
      setBlown(true);
      window.setTimeout(onBlow, 1800);
    }, 650);
  };

  return (
    <>
      <style>{`
        @keyframes flame-flicker {
          0%, 100% { transform: scale(1) rotate(-1deg); filter: blur(0.2px); }
          50% { transform: scale(1.06) rotate(1.5deg); filter: blur(0.5px); }
        }
        @keyframes aura-pulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.1); }
        }
        @keyframes wisp-rise {
          0% { transform: translateY(0) scale(0.6) translateX(0); opacity: 0; }
          15% { opacity: 0.6; }
          100% { transform: translateY(-70px) scale(1.5) translateX(25px); opacity: 0; filter: blur(6px); }
        }
        @keyframes platter-glow {
          0%, 100% { box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(229,193,88,0.05); }
          50% { box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 35px rgba(229,193,88,0.15); }
        }
      `}</style>

      <section className="scene overflow-hidden relative flex items-center justify-center min-h-screen cursor-default" style={{ background: "radial-gradient(circle at center, #140316 0%, #030005 100%)" }}>
        
        {/* Gallery Spotlight Background Reflection (Tailwind v4 Optimized) */}
        <div 
          className="absolute w-125 h-125 rounded-full mix-blend-screen filter blur-[90px] pointer-events-none transition-all duration-1000"
          style={{
            background: blown
              ? "radial-gradient(circle, rgba(233,79,125,0.04) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(249,217,138,0.12) 0%, rgba(233,79,125,0.04) 50%, transparent 70%)",
            top: "15%",
          }}
        />

        <div
          className="relative z-10 flex flex-col items-center max-w-md w-full transition-all duration-1000 ease-out"
          style={{
            opacity: risen ? 1 : 0,
            transform: risen ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Header Typography Section - REMOVED fixed height to fix text overlap issues */}
          <div className="flex flex-col items-center text-center select-none mb-16 min-h-18">
            {showPrompt && (
              <div style={{ animation: "fadeIn 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards" }}>
                <p className="font-serif italic text-[#e5c158]/60 text-sm tracking-[0.25em] uppercase mb-3">
                  {blown ? "Your wish is cast" : "Make a wish"}
                </p>
                <h2 className="font-playfair text-3xl tracking-[0.15em] uppercase font-light text-white/90 leading-tight">
                  {blown ? "✧ ✦ ✧" : "Blow the Candle"}
                </h2>
              </div>
            )}
          </div>

          {/* Interactive Pastry Showcase Component */}
          <div
            onClick={!blown ? handleBlow : undefined}
            onKeyDown={(e) => e.key === "Enter" && !blown && handleBlow()}
            role={!blown ? "button" : undefined}
            tabIndex={!blown ? 0 : undefined}
            aria-label="Blow the birthday candle"
            className="relative flex flex-col items-center outline-hidden select-none transition-all duration-700"
            style={{
              cursor: blown ? "default" : "pointer",
              filter: blown ? "brightness(0.65) contrast(1.05)" : "none",
            }}
          >
            {/* Elegant Candle Framework */}
            <div className="flex flex-col items-center relative z-20 -mb-1">
              
              {/* Flame Component */}
              <div className="relative h-12 w-8 flex justify-center items-end mb-1">
                {!blown ? (
                  <>
                    {/* Radial Atmosphere Radiance Layer */}
                    <div 
                      className="absolute w-24 h-24 rounded-full pointer-events-none -bottom-6"
                      style={{
                        background: "radial-gradient(circle, rgba(249,217,138,0.25) 0%, rgba(233,79,125,0.05) 50%, transparent 70%)",
                        animation: "aura-pulse 2s infinite ease-in-out"
                      }}
                    />
                    {/* Micro Core Wick Glow */}
                    <div
                      className="absolute w-4 h-7 rounded-full"
                      style={{
                        background: "linear-gradient(to top, #ffffff, #f9d98a 40%, #e94f7d 80%, transparent)",
                        animation: "flame-flicker 0.15s ease-in-out infinite",
                        boxShadow: "0 -2px 20px 4px rgba(249,217,138,0.6)",
                        transformOrigin: "bottom center"
                      }}
                    />
                  </>
                ) : (
                  /* Post-ignition Amber Node */
                  <div
                    className="w-1 h-1 rounded-full bg-[#ff7a32]"
                    style={{
                      boxShadow: "0 0 6px 1px #ff7a32",
                      opacity: 0.4,
                      animation: "fadeOut 1.5s ease-out forwards"
                    }}
                  />
                )}
                
                {/* Hand-drawn Cotton Wick */}
                <div className="w-0.5 h-2.5 bg-neutral-600 rounded-xs opacity-60" />
              </div>

              {/* Minimal Wax Stem Column */}
              <div
                className="w-2.5 h-14 transition-all duration-500"
                style={{
                  background: "linear-gradient(to right, rgba(255,255,255,0.3), #e94f7d 40%, #7f1d4f 90%)",
                  borderRadius: "2px 2px 1px 1px",
                  boxShadow: blowing ? "none" : "0 0 15px rgba(233,79,125,0.25)",
                }}
              />
            </div>

            {/* Premium Dual Tier Cake Architecture */}
            {/* Top Tier Segment */}
            <div
              className="w-28 h-12 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #4a0e2e 0%, #260517 100%)",
                borderRadius: "6px 6px 0 0",
                borderWidth: "1px 1px 0 1px",
                borderStyle: "solid",
                borderColor: "rgba(229,193,88,0.15)",
              }}
            >
              {/* Delicate Top Frosting Highlight Trim (Tailwind v4 Optimized) */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-white/15 to-transparent" />
            </div>

            {/* Bottom Tier Segment */}
            <div
              className="w-40 h-16 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #260517 0%, #15020d 100%)",
                borderRadius: "0 0 2px 2px",
                borderWidth: "0 1px 1px 1px",
                borderStyle: "solid",
                borderColor: "rgba(229,193,88,0.12)",
              }}
            >
              {/* Luxury Champagne Gold Filigree Ribbons (Tailwind v4 Optimized) */}
              <div className="absolute top-0 inset-x-0 h-0.75 bg-linear-to-r from-transparent via-[#e5c158]/50 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-[#e5c158]/30 to-transparent" />
            </div>

            {/* Polished Glass/Metallic Presentation Base Plate */}
            <div
              className="w-44 h-2.5 rounded-b-md relative"
              style={{
                background: "linear-gradient(90deg, #966b2d 0%, #f9d98a 50%, #966b2d 100%)",
                animation: "platter-glow 4s infinite ease-in-out"
              }}
            >
              {/* Mirror Rim Accent Reflection (Tailwind v4 Optimized) */}
              <div className="absolute top-0 inset-x-0 h-px bg-white/40" />
            </div>
          </div>

          {/* Context Explanatory Prompt */}
          <div className="h-6 mt-12">
            {showPrompt && !blown && (
              <p
                className="font-serif text-xs uppercase tracking-[0.25em] text-white/40 text-center"
                style={{ animation: "fadeIn 1s ease-out 0.4s both" }}
              >
                Touch the cake to blow
              </p>
            )}
          </div>

        </div>

        {/* Dynamic Stardust Smoke Trails Loop */}
        {blown && (
          <div aria-hidden="true" className="absolute top-[40%] left-1/2 -translate-x-1/2 pointer-events-none z-30">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#fff8ec" : "#f9d98a",
                  left: `${(i - 1.5) * 10}px`,
                  animation: `wisp-rise ${1 + i * 0.2}s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s both`,
                  boxShadow: "0 0 8px rgba(249,217,138,0.4)"
                }}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}