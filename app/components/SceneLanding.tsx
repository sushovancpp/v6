"use client";
import { useState, useEffect, useRef } from "react";
import { RECIPIENT_NAME, BIRTHDAY_DATE } from "../siteConfig";

interface SceneLandingProps {
  onNext: () => void;
}

export default function SceneLanding({ onNext }: SceneLandingProps) {
  const [dateText, setDateText] = useState("");
  const [dateStars, setDateStars] = useState(false);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

  function addTimer(t: ReturnType<typeof setTimeout>) {
    timersRef.current.push(t);
  }
  function addInterval(i: ReturnType<typeof setInterval>) {
    intervalsRef.current.push(i);
  }
  function clearAll() {
    timersRef.current.forEach(clearTimeout);
    intervalsRef.current.forEach(clearInterval);
    timersRef.current = [];
    intervalsRef.current = [];
  }

  useEffect(() => {
    const safeDate = typeof BIRTHDAY_DATE === "string" && BIRTHDAY_DATE ? BIRTHDAY_DATE : "27 May";
    const chars = safeDate.split("");
    let idx = 0;

    const t = setTimeout(() => {
      const iv = setInterval(() => {
        if (idx < chars.length) {
          // Verify that chars[idx] actually exists before updating state
          const nextChar = chars[idx];
          if (nextChar !== undefined) {
            setDateText((prev) => prev + nextChar);
          }
          idx++;
        } else {
          clearInterval(iv);
          setDateStars(true);
        }
      }, 100);
      addInterval(iv);
    }, 12000);

    addTimer(t);

    return () => { clearAll(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lp = {
    pink: "#feecea",
    white: "#fff",
    black: "#333",
    textPink: "#FF7882",
    heart: "#FF7882",
    border: "#DACCBF",
  } as const;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Coiny&family=Titan+One&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Nerko+One&family=Sriracha&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

        .lp__wrapper {
          --lp-pink: ${lp.pink};
          --lp-white: ${lp.white};
          --lp-black: ${lp.black};
          --lp-text-pink: ${lp.textPink};
          --lp-heart: ${lp.heart};
          --lp-border: ${lp.border};

          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100dvh;
          overflow: hidden;
          background-color: var(--lp-pink);
          background-image:
            linear-gradient(0deg, transparent 24%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,1) 75%, rgba(255,255,255,1) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,1) 75%, rgba(255,255,255,1) 76%, transparent 77%, transparent);
          background-size: 80px 80px;
          font-size: 16px;
          color: var(--lp-black);
          z-index: 0;
        }

        /* ── Bunting flags ── */
        .lp__flags {
          display: flex;
          justify-content: space-between;
          transform: translateY(-200px);
          animation: lp-translateYFlag 1.5s 2s forwards;
        }
        @keyframes lp-translateYFlag {
          to { transform: translateY(-10px); }
        }
        .lp__flag-left  { transform: rotate(-10deg) translate(-20px, 30px); }
        .lp__flag-right { transform: rotate(10deg) translate(20px, 30px) scaleX(-1); }

        /* ── Main content layout ── */
        .lp__content {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          padding-top: 2rem;
        }
        .lp__left, .lp__right {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .lp__left  { width: 40%; }
        .lp__right { width: 60%; }

        /* ── Happy / Birthday title ── */
        .lp__title {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          font-family: "Titan One", sans-serif;
          font-size: clamp(4rem, 7vw, 6rem);
          flex-direction: column;
          perspective: 1000px;
          line-height: 1.1;
        }
        .lp__happy, .lp__birthday {
          position: relative;
          text-shadow:
            4px 4px var(--lp-black),
            -4px 4px var(--lp-black),
            4px -4px var(--lp-black),
            -4px -4px var(--lp-black),
            4px 8px 0 var(--lp-black);
          font-weight: bold;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }
        .lp__happy   { color: var(--lp-white); }
        .lp__birthday { color: var(--lp-text-pink); }

        .lp__happy span,
        .lp__birthday span {
          transform: translateY(50px);
          opacity: 0;
          visibility: hidden;
          animation: lp-txtTranslateY 0.5s var(--t) forwards;
          display: inline-block;
        }
        @keyframes lp-txtTranslateY {
          100% { transform: translateY(0); opacity: 1; visibility: visible; }
        }

        /* ── Party hat ── */
        .lp__hat {
          position: absolute;
          right: 45px;
          top: -350px;
          transform: rotate(-40deg);
          z-index: -1;
          animation: lp-topHat 4s 7s forwards ease;
        }
        @keyframes lp-topHat {
          20%, 30% { top: -30px; transform-origin: left; transform: rotate(-40deg); }
          35%, 100% { top: -30px; transform: rotate(0deg); }
        }

        /* ── Date pill ── */
        .lp__date {
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: var(--lp-text-pink);
          border-radius: 50px;
          margin-top: 20px;
          font-family: "Sriracha", cursive;
          border: 3px solid var(--lp-black);
          position: relative;
          transform: translateY(-100px);
          z-index: -1;
          opacity: 0;
          visibility: hidden;
          width: 0px;
          animation: lp-dateOfBirth 5s 9s forwards;
        }
        @keyframes lp-dateOfBirth {
          20%, 40% { width: 0px; height: 0; transform: translateY(0px); opacity: 1; visibility: visible; }
          45%      { transform: translateY(0px); opacity: 1; visibility: visible; width: 300px; height: 0px; }
          50%, 100%{ transform: translateY(0px); opacity: 1; visibility: visible; width: 300px; height: 50px; }
        }
        .lp__date span {
          font-weight: bold;
          margin: 0px 40px;
          font-size: 1.2rem;
        }
        .lp__date .lp__date-star { margin: 0 4px; }

        /* ── "Click Here" button ── */
        .lp__btn-wrap {
          transform: scale(0);
          animation: lp-scaleCricle 2s 16s forwards ease-in-out;
        }
        .lp__btn {
          position: relative;
          margin-top: 30px;
          background-color: var(--lp-text-pink);
          outline: none;
          padding: 8px 20px;
          font-size: 1rem;
          border-radius: 50px;
          border: 3px solid var(--lp-black);
          font-family: "Sriracha", cursive;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
          transform: scale(1);
          transition: all 0.5s ease-in-out;
          color: var(--lp-black);
          white-space: nowrap;
        }
        .lp__btn:active { transform: scale(0.7); }
        .lp__btn:hover {
          border-color: var(--lp-heart);
          background-color: var(--lp-heart);
          color: #fff;
          box-shadow: rgba(0,0,0,0.24) 0px 3px 8px;
        }
        .lp__btn i { margin-left: 8px; }
        .lp__btn:hover i { animation: lp-rotateHeart 1s infinite linear; }
        @keyframes lp-rotateHeart {
          0%, 50%, 100% { transform: rotate(0deg); }
          25%            { transform: rotate(12deg); }
          75%            { transform: rotate(-12deg); }
        }

        /* ── Photo circle / account box ── */
        .lp__box-account {
          position: relative;
          transform: translateY(700px);
          animation: lp-topBoxImage 8s 7s forwards ease-in;
        }
        @keyframes lp-topBoxImage { to { transform: translateY(0); } }

        .lp__image {
          position: relative;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          border: 6px solid var(--lp-black);
        }
        .lp__image img { width: 100%; object-fit: cover; }

        /* ── Name pill ── */
        .lp__name {
          position: absolute;
          padding: 0px 20px;
          bottom: -20px;
          border: 3px solid var(--lp-black);
          font-family: 'Dancing Script', cursive;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: var(--lp-text-pink);
          border-radius: 50px;
        }
        .lp__name span { font-weight: bold; margin: 0px 40px; font-size: 1.7rem; }

        /* ── Balloons ── */
        .lp__balloon-one {
          position: absolute;
          top: -70px;
          left: -70px;
          animation: lp-balloon1 2s infinite linear;
        }
        @keyframes lp-balloon1 {
          0%, 50%, 100% { transform-origin: bottom right; transform: rotate(0deg); }
          25%            { transform-origin: bottom right; transform: rotate(3deg); }
          75%            { transform-origin: bottom right; transform: rotate(-3deg); }
        }
        .lp__balloon-two {
          position: absolute;
          top: 170px;
          right: -65px;
          z-index: -1;
          transform: rotate(10deg);
          animation: lp-balloon2 2s infinite linear;
        }
        @keyframes lp-balloon2 {
          0%, 50%, 100% { transform-origin: bottom left; transform: rotate(10deg); }
          25%            { transform-origin: bottom left; transform: rotate(7deg); }
          75%            { transform-origin: bottom left; transform: rotate(13deg); }
        }

        /* ── Rotating badge ── */
        .lp__cricle {
          position: absolute;
          top: 20px;
          right: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: scale(0);
          animation: lp-scaleCricle 3s 15s forwards ease-in-out;
        }
        @keyframes lp-scaleCricle {
          0%        { transform: scale(0); }
          10%       { transform: scale(1.3); }
          20%       { transform: scale(0.7); }
          30%, 100% { transform: scale(1); }
        }
        .lp__text-cricle {
          width: 100px;
          height: 100px;
          background-color: var(--lp-text-pink);
          border-radius: 50%;
          border: 5px solid var(--lp-black);
          display: flex;
          justify-content: center;
          align-items: center;
          animation: lp-rotateCricle 5s linear infinite;
        }
        @keyframes lp-rotateCricle { to { transform: rotate(360deg); } }
        .lp__text-cricle span {
          top: 0%;
          left: 50%;
          position: absolute;
          color: var(--lp-black);
          transform: rotate(calc(var(--i) * 24deg));
          transform-origin: 0 45px;
          font-family: "Sriracha", cursive;
          text-transform: uppercase;
          font-size: 0.7rem;
        }

        /* ── fa-heart (scoped) ── */
        .lp__wrapper .fa-heart {
          color: var(--lp-heart);
          filter: drop-shadow(0 0 3px var(--lp-heart));
          animation: lp-scaleHeart 1s infinite linear;
        }
        .lp__cricle .fa-heart { position: absolute; transform: scale(0.85); }
        @keyframes lp-scaleHeart { 50% { transform: scale(1.2); } }

        /* ── Decorative stars ── */
        .lp__star {
          position: absolute;
          transform: scale(0);
          background-color: var(--lp-black);
          clip-path: polygon(0 50%, 35% 35%, 50% 0, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%);
          animation: lp-scaleCricle 3s var(--t) forwards,
                     lp-scaleStar 2s 16s infinite ease-in-out;
        }
        @keyframes lp-scaleStar {
          25% { transform: scale(0.8); }
          50% { transform: scale(1.1); }
        }
        .lp__star.s1 { width:20px; height:20px; top:75px;    left:300px; }
        .lp__star.s2 { width:15px; height:20px; top:35px;    right:360px; }
        .lp__star.s3 { width:14px; height:14px; top:290px;   left:630px; }
        .lp__star.s4 { width:18px; height:18px; bottom:60px; left:35px; }
        .lp__star.s5 { width:16px; height:18px; bottom:140px;left:500px; }

        /* ── Flower decorations ── */
        .lp__flower {
          position: absolute;
          transform: scale(0);
          animation: lp-scaleCricle 3s var(--t) forwards ease-in-out;
        }
        .lp__flower.f1 { top:250px; left:50px; }
        .lp__flower.f2 { top:225px; left:540px; }
        .lp__flower.f3 { top:150px; right:235px; }

        /* ── Bottom-right blob ── */
        .lp__decorate-bottom { position: absolute; right: 0; bottom: -10px; }

        /* ── Smiley icon ── */
        .lp__smiley {
          position: absolute;
          bottom: 180px;
          left: 600px;
          transform: scale(0);
          animation: lp-scaleCricle 3s 15s forwards ease-in-out;
        }

        /* ── Responsive ── */
        @media screen and (max-width: 658px) {
          .lp__flag-left  { transform: rotate(-10deg) translate(-119px, 3px); }
          .lp__flag-right { transform: rotate(10deg) translate(-106px, 39px) scaleX(-1); }

          .lp__content {
            flex-direction: column;
            gap: 25px;
            align-items: center;
            padding-top: 1.5rem;
          }
          .lp__left  { width: 100%; }
          .lp__right { width: 100%; }

          .lp__title { font-size: clamp(2rem, 10vw, 3rem); letter-spacing: 4px; }

          .lp__hat { right: -98px; top: -51px !important; }

          .lp__btn { margin-top: 17px; width: 209px; padding: 6px 4px; }

          .lp__cricle { top: 10px; right: -54px; }

          .lp__image { width: 200px; height: 200px; }

          .lp__name { padding: 0px 3px; bottom: -6px; }
          .lp__name span { font-size: 1rem; }

          .lp__balloon-one { top: 10px; left: -77px; }
          .lp__balloon-one img { width: 76px !important; }
        }
      `}</style>

      <div className="lp__wrapper">

        {/* Bunting flags */}
        <div className="lp__flags">
          <img src="/landing/1.png" alt="birthday bunting" width={350} className="lp__flag-left" />
          <img src="/landing/1.png" alt="birthday bunting" width={350} className="lp__flag-right" />
        </div>

        {/* Main two-column content */}
        <div className="lp__content">

          {/* ── LEFT ── */}
          <div className="lp__left">
            <div className="lp__title">
              <h1 className="lp__happy">
                {["H","a","p","p","y"].map((ch, i) => (
                  <span key={i} style={{ "--t": `${4 + i * 0.2}s` } as React.CSSProperties}>{ch}</span>
                ))}
              </h1>
              <h1 className="lp__birthday">
                {["B","i","r","t","h","d","a","y"].map((ch, i) => (
                  <span key={i} style={{ "--t": `${5 + i * 0.2}s` } as React.CSSProperties}>{ch}</span>
                ))}
              </h1>
              <div className="lp__hat">
                <img src="/landing/hat.png" alt="party hat" width={130} />
              </div>
            </div>

            {/* Date pill */}
            <div className="lp__date">
              {dateStars && <i className="fa-solid fa-star lp__date-star" />}
              <span>{dateText}</span>
              {dateStars && <i className="fa-solid fa-star lp__date-star" />}
            </div>

            {/* Button — calls onNext directly, no letter popup */}
            <div className="lp__btn-wrap">
              <button
                className="lp__btn"
                onClick={onNext}
                type="button"
              >
                Click Here {RECIPIENT_NAME}
                <i className="fa-regular fa-envelope" />
              </button>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="lp__right">
            <div className="lp__box-account">
              <div className="lp__image">
                <img src="/landing/unnamed.png" alt={`Photo of ${RECIPIENT_NAME}`} />
              </div>
              <div className="lp__name">
                <i className="fa-solid fa-heart" />
                <span>Dear {RECIPIENT_NAME}</span>
                <i className="fa-solid fa-heart" />
              </div>
              <div className="lp__balloon-one">
                <img width={100} src="/landing/balloon1.png" alt="balloon" />
              </div>
              <div className="lp__balloon-two">
                <img width={100} src="/landing/balloon2.png" alt="balloon" />
              </div>
            </div>

            {/* Rotating badge */}
            <div className="lp__cricle">
              <div className="lp__text-cricle">
                {["h","a","p","p","y","-","b","i","r","t","h","d","a","y","-"].map((ch, i) => (
                  <span key={i} style={{ "--i": i + 1 } as React.CSSProperties}>{ch}</span>
                ))}
              </div>
              <i className="fa-solid fa-heart" />
            </div>
          </div>
        </div>

        {/* Decorative stars */}
        <div className="lp__star s1" style={{ "--t": "15s" } as React.CSSProperties} />
        <div className="lp__star s2" style={{ "--t": "15.2s" } as React.CSSProperties} />
        <div className="lp__star s3" style={{ "--t": "15.4s" } as React.CSSProperties} />
        <div className="lp__star s4" style={{ "--t": "15.6s" } as React.CSSProperties} />
        <div className="lp__star s5" style={{ "--t": "15.8s" } as React.CSSProperties} />

        {/* Flowers */}
        <div className="lp__flower f1" style={{ "--t": "15s" } as React.CSSProperties}>
          <img width={20} src="/landing/decorate_flower.png" alt="" />
        </div>
        <div className="lp__flower f2" style={{ "--t": "15.3s" } as React.CSSProperties}>
          <img width={20} src="/landing/decorate_flower.png" alt="" />
        </div>
        <div className="lp__flower f3" style={{ "--t": "15.6s" } as React.CSSProperties}>
          <img width={20} src="/landing/decorate_flower.png" alt="" />
        </div>

        {/* Bottom blob */}
        <div className="lp__decorate-bottom">
          <img src="/landing/decorate.png" alt="" width={100} />
        </div>

        {/* Smiley */}
        <div className="lp__smiley">
          <img src="/landing/smiley_icon.png" alt="" width={100} />
        </div>

      </div>
    </>
  );
}