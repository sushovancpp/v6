"use client";
import { useState, useEffect, useRef } from "react";
import { RECIPIENT_NAME, BIRTHDAY_MESSAGE } from "../siteConfig";

const MESSAGE = BIRTHDAY_MESSAGE.replace("{name}", RECIPIENT_NAME);

export default function SceneFinal({ onReplay }: { onReplay: () => void }) {
  const [phase, setPhase] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [showReplay, setShowReplay] = useState(false);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // phase 1: card slides in
    const t1 = window.setTimeout(() => setPhase(1), 400);
    // phase 2: left-col images fade in
    const t2 = window.setTimeout(() => setPhase(2), 1200);
    // phase 3: hearts animate
    const t3 = window.setTimeout(() => setPhase(3), 1900);
    // phase 4: typewriter starts
    const t4 = window.setTimeout(() => {
      setPhase(4);
      let i = 0;
      const chars = Array.from(MESSAGE);
      const iv = window.setInterval(() => {
        if (i < chars.length) {
          setDisplayed(chars.slice(0, i + 1).join(""));
          i++;
        } else {
          window.clearInterval(iv);
          const t5 = window.setTimeout(() => setShowReplay(true), 900);
          timersRef.current.push(t5);
        }
      }, 40);
      intervalsRef.current.push(iv);
    }, 2800);

    timersRef.current.push(t1, t2, t3, t4);

    return () => {
      timersRef.current.forEach(window.clearTimeout);
      intervalsRef.current.forEach(window.clearInterval);
    };
  }, []);

  // CSS colour tokens — same palette as SceneLanding's letter overlay
  const lp = {
    pink:     "#feecea",
    white:    "#fff",
    black:    "#333",
    textPink: "#FF7882",
    heart:    "#FF7882",
    bgLetter: "#fff8e4",
    border:   "#DACCBF",
  } as const;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Sriracha&display=swap');

        .sf__wrapper {
          --lp-pink:      ${lp.pink};
          --lp-white:     ${lp.white};
          --lp-black:     ${lp.black};
          --lp-text-pink: ${lp.textPink};
          --lp-heart:     ${lp.heart};
          --lp-bg-letter: ${lp.bgLetter};
          --lp-border:    ${lp.border};

          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--lp-pink);
          background-image:
            linear-gradient(0deg,   transparent 24%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,1) 75%, rgba(255,255,255,1) 76%, transparent 77%, transparent),
            linear-gradient(90deg,  transparent 24%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,1) 75%, rgba(255,255,255,1) 76%, transparent 77%, transparent);
          background-size: 80px 80px;
          overflow: hidden;
        }

        /* ── fa-heart scoped ── */
        .sf__wrapper .fa-heart {
          color: var(--lp-heart);
          filter: drop-shadow(0 0 3px var(--lp-heart));
          animation: sf-scaleHeart 1s infinite linear;
        }
        @keyframes sf-scaleHeart { 50% { transform: scale(1.2); } }

        /* ── Card ── */
        .sf__card {
          position: relative;
          width: 55vw;
          max-width: 680px;
          min-width: 320px;
          height: 450px;
          background-color: var(--lp-white);
          border-radius: 27px;
          padding: 17px;
          box-shadow: rgba(0,0,0,0.24) 0px 3px 8px;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .sf__card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Inner letter ── */
        .sf__letter {
          width: 100%;
          height: 100%;
          background-color: var(--lp-bg-letter);
          border-radius: 10px;
          padding-top: 15px;
          overflow: hidden;
          position: relative;
        }

        /* ── Title ── */
        .sf__title {
          text-align: center;
          font-family: 'Dancing Script', cursive;
          font-weight: bold;
          font-size: 2.4rem;
          color: var(--lp-black);
          min-height: 2.8rem;
        }
        .sf__title .sf__title-heart {
          margin-left: 5px;
          font-size: 1.3rem;
        }

        /* ── Two-column content ── */
        .sf__content {
          position: relative;
          width: 100%;
          height: calc(100% - 3.5rem);
          display: flex;
          padding-top: 1.5rem;
          padding-bottom: 70px;
        }

        /* LEFT col */
        .sf__col-left {
          position: relative;
          width: 50%;
          height: 100%;
          padding: 1.7rem;
          border-right: 3px solid var(--lp-border);
        }
        .sf__heart-img {
          opacity: 0;
          width: 100%;
          transition: opacity 0.3s;
        }
        .sf__heart-img.show { animation: sf-fadeIn 1s 1s forwards; }
        @keyframes sf-fadeIn { to { opacity: 1; } }

        /* Decorative corner hearts */
        .sf__deco-heart {
          position: absolute;
          opacity: 0;
        }
        .sf__deco-heart img { width: 22px; }
        .sf__deco-heart.h1 { top:90px;    left:30px;  }
        .sf__deco-heart.h2 { top:20px;    right:70px; }
        .sf__deco-heart.h3 { bottom:50px; left:145px; }
        .sf__deco-heart.h4 { top:140px;   right:35px; }
        .sf__deco-heart.anim {
          animation: sf-heartPop 1s var(--t) infinite ease-in-out;
        }
        @keyframes sf-heartPop {
          0%        { opacity:1; transform: scale(0); }
          10%       { opacity:1; transform: scale(1.3); }
          20%       { opacity:1; transform: scale(0.7); }
          30%, 100% { opacity:1; transform: scale(1); }
        }

        /* RIGHT col */
        .sf__col-right {
          position: relative;
          width: 50%;
        }
        .sf__love-img {
          opacity: 0;
          position: absolute;
          right: 12px;
          top: -48px;
        }
        .sf__love-img.show { animation: sf-fadeIn 1s 1s forwards; }

        .sf__body {
          margin-top: 60px;
          padding: 20px 15px 10px 15px;
          font-family: 'Dancing Script', cursive;
          font-size: 1.3rem;
          color: var(--lp-black);
        }
        .sf__body p { min-height: 1.4em; }

        /* blinking cursor */
        .sf__cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: var(--lp-text-pink);
          margin-left: 3px;
          vertical-align: text-bottom;
          animation: sf-blink 0.8s step-end infinite;
        }
        @keyframes sf-blink { 50% { opacity: 0; } }

        .sf__mewmew {
          position: absolute;
          bottom: 70px;
          right: 8px;
          opacity: 0;
        }
        .sf__mewmew.show { animation: sf-fadeIn 1s 1.2s forwards; }

        /* ── Replay button — same style as lp__continue ── */
        .sf__replay {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--lp-text-pink);
          color: #fff;
          border: 3px solid var(--lp-black);
          border-radius: 50px;
          padding: 6px 22px;
          font-family: "Sriracha", cursive;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          z-index: 30;
          opacity: 0;
          pointer-events: none;
        }
        .sf__replay.visible {
          opacity: 1;
          pointer-events: auto;
          animation: sf-popIn 0.4s forwards ease-out;
        }
        @keyframes sf-popIn {
          0%        { transform: translateX(-50%) scale(0); }
          10%       { transform: translateX(-50%) scale(1.3); }
          20%       { transform: translateX(-50%) scale(0.7); }
          30%, 100% { transform: translateX(-50%) scale(1); }
        }
        .sf__replay:hover {
          background-color: #e05060;
          box-shadow: rgba(0,0,0,0.24) 0px 3px 8px;
        }
        .sf__replay:active { transform: translateX(-50%) scale(0.95); }

        /* ── Mobile ── */
        @media screen and (max-width: 658px) {
          .sf__card {
            width: 90vw;
            height: 315px;
          }
          .sf__title { font-size: 1.4rem; }
          .sf__body  { margin-top: -14px; font-size: 0.8rem; }
          .sf__love-img { right: 12px; top: -30px; }
          .sf__love-img img { width: 70px; }
        }
      `}</style>

      <div className="sf__wrapper">
        <div className={`sf__card${phase >= 1 ? " visible" : ""}`}>
          <div className="sf__letter">

            {/* Title */}
            <div className="sf__title">
              To you <i className="fa-solid fa-heart sf__title-heart" />
            </div>

            <div className="sf__content">
              {/* LEFT col */}
              <div className="sf__col-left">
                <img
                  className={`sf__heart-img${phase >= 2 ? " show" : ""}`}
                  src="/landing/heart_letter.png"
                  alt="hearts"
                />
                {(["h1","h2","h3","h4"] as const).map((cls, i) => (
                  <div
                    key={cls}
                    className={`sf__deco-heart ${cls}${phase >= 3 ? " anim" : ""}`}
                    style={{ "--t": `${i * 0.2}s` } as React.CSSProperties}
                  >
                    <img src="/landing/heart.png" alt="" />
                  </div>
                ))}
              </div>

              {/* RIGHT col */}
              <div className="sf__col-right">
                <div className={`sf__love-img${phase >= 2 ? " show" : ""}`}>
                  <img src="/landing/love.png" alt="love stamp" width={100} />
                </div>
                <div className="sf__body">
                  <p>
                    {displayed}
                    {displayed.length < MESSAGE.length && (
                      <span className="sf__cursor" />
                    )}
                  </p>
                </div>
                <img
                  className={`sf__mewmew${phase >= 2 ? " show" : ""}`}
                  src="/landing/mewmew.gif"
                  alt="pixel cat"
                  width={80}
                />
              </div>
            </div>

            {/* Replay button */}
            <button
              type="button"
              className={`sf__replay${showReplay ? " visible" : ""}`}
              onClick={onReplay}
            >
              Replay ↺
            </button>

          </div>
        </div>
      </div>
    </>
  );
}