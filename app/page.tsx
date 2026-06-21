"use client";
import { useState, useCallback } from "react";
import SceneGifIntro from "./components/SceneGifIntro";
import SceneLanding from "./components/SceneLanding";
import SceneCake from "./components/SceneCake";
import SceneFinal from "./components/SceneFinal";
import SceneTransition from "./components/SceneTransition";

type Scene = "intro" | "landing" | "cake" | "final";

export default function BirthdayApp() {
  const [scene, setScene] = useState<Scene>("intro");
  const [transitioning, setTransitioning] = useState(false);
  const [pendingScene, setPendingScene] = useState<Scene | null>(null);

  const goTo = useCallback((next: Scene) => {
    setTransitioning(true);
    setPendingScene(next);
  }, []);

  const handleTransitionDone = useCallback(() => {
    if (pendingScene) {
      setScene(pendingScene);
      setPendingScene(null);
    }
    setTransitioning(false);
  }, [pendingScene]);

  const handleReplay = () => {
    setScene("intro");
    setTransitioning(false);
    setPendingScene(null);
  };

  return (
    <main className="app-shell">
      <div className="scene-layer">
        {scene === "intro"   && <SceneGifIntro onNext={() => goTo("landing")} />}
        {scene === "landing" && <SceneLanding  onNext={() => goTo("cake")} />}
        {scene === "cake"    && <SceneCake     onBlow={() => goTo("final")} />}
        {scene === "final"   && <SceneFinal    onReplay={handleReplay} />}
      </div>

      {/* Progress dots — only visible on cake and final scenes */}
      {(scene === "cake" || scene === "final") && (
        <div className="progress-dock" aria-label="Story progress">
          {(["cake", "final"] as Scene[]).map((s) => (
            <span
              key={s}
              className={`progress-dot ${scene === s ? "active" : ""}`}
              aria-current={scene === s ? "step" : undefined}
            />
          ))}
        </div>
      )}

      {transitioning && <SceneTransition onDone={handleTransitionDone} />}
    </main>
  );
}
