import type { CSSProperties } from "react";

export const PARTY_COLORS = [
  "#f9d98a",
  "#e94f7d",
  "#ff7a7a",
  "#ffd6df",
  "#9ff4dc",
  "#8ab6ff",
  "#fff8ec",
];

export function seeded(index: number, salt = 1) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function pick<T>(items: T[], index: number, salt = 1) {
  return items[Math.floor(seeded(index, salt) * items.length) % items.length];
}

// rounds to 4 decimal places — matches what SSR outputs
function r(n: number, decimals = 4) {
  return parseFloat(n.toFixed(decimals));
}

export function SparkleField({
  count = 28,
  salt = 1,
  soft = false,
}: {
  count?: number;
  salt?: number;
  soft?: boolean;
}) {
  const colors = soft ? ["#fff8ec", "#f9d98a", "#ffd6df"] : PARTY_COLORS;

  return (
    <div className="sparkle-field" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = r(3 + seeded(i, salt + 3) * 6);
        const style = {
          left: `${r(seeded(i, salt + 1) * 100)}%`,
          top: `${r(4 + seeded(i, salt + 2) * 82)}%`,
          width: `${size}px`,
          height: `${size}px`,
          color: pick(colors, i, salt + 4),
          background: "currentColor",
          opacity: r(0.24 + seeded(i, salt + 5) * 0.58),
          "--delay": `${r(seeded(i, salt + 6) * 4)}s`,
          "--duration": `${r(2.2 + seeded(i, salt + 7) * 3.8)}s`,
        } as CSSProperties;

        return <span key={i} className="sparkle-speck" style={style} />;
      })}
    </div>
  );
}

export function ConfettiRain({
  count = 70,
  salt = 1,
  infinite = false,
}: {
  count?: number;
  salt?: number;
  infinite?: boolean;
}) {
  return (
    <div className="confetti-field" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = r(5 + seeded(i, salt + 2) * 12);
        const circle = seeded(i, salt + 5) > 0.58;
        const duration = r(2.5 + seeded(i, salt + 6) * 3.8);
        const delay = r(seeded(i, salt + 7) * 4.4);
        const style: CSSProperties = {
          left: `${r(seeded(i, salt + 1) * 100)}%`,
          width: `${size}px`,
          height: circle ? `${size}px` : `${r(size * 0.42)}px`,
          borderRadius: circle ? "999px" : "2px",
          background: pick(PARTY_COLORS, i, salt + 4),
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          animationIterationCount: infinite ? "infinite" : "1",
          transform: `rotate(${Math.round(seeded(i, salt + 8) * 360)}deg)`,
        };

        return <span key={i} className="confetti-piece" style={style} />;
      })}
    </div>
  );
}

export function BalloonLift({
  count = 12,
  salt = 1,
}: {
  count?: number;
  salt?: number;
}) {
  return (
    <div className="balloon-field" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const style = {
          left: `${r(5 + seeded(i, salt + 1) * 90)}%`,
          fontSize: `${r(28 + seeded(i, salt + 2) * 18)}px`,
          "--duration": `${r(6 + seeded(i, salt + 3) * 4)}s`,
          "--delay": `${r(seeded(i, salt + 4) * 3.5)}s`,
        } as CSSProperties;

        return (
          <span key={i} className="balloon-lift" style={style}>
            🎈
          </span>
        );
      })}
    </div>
  );
}

export function FireworkBurst({
  x,
  y,
  color,
  delay = 0,
  rays = 14,
  salt = 1,
}: {
  x: number;
  y: number;
  color: string;
  delay?: number;
  rays?: number;
  salt?: number;
}) {
  return (
    <div className="firework-burst" style={{ left: `${x}%`, top: `${y}%` }} aria-hidden="true">
      {Array.from({ length: rays }).map((_, i) => {
        const style: CSSProperties = {
          color,
          background: color,
          transform: `rotate(${(360 / rays) * i}deg)`,
          animationDelay: `${delay}s`,
        };

        const rayStyle: CSSProperties = {
          height: `${r(24 + seeded(i, salt + x + y) * 34)}px`,
          background: `linear-gradient(to top, ${color}, transparent)`,
        };

        return (
          <span key={i} className="firework-ray" style={style}>
            <i style={rayStyle} />
          </span>
        );
      })}
    </div>
  );
}