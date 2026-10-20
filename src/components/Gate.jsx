import { useEffect, useState } from "react";
import { profile } from "../profile";

// Welcome screen. The click on "Enter" is the browser-required user gesture
// that lets the voice introduction start automatically.
export default function Gate({ onEnter, canSpeak }) {
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / 1500);
      setN(Math.round(100 * (1 - Math.pow(1 - k, 2.2))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const go = (sound) => {
    setLeaving(true);
    onEnter(sound);
  };
  const ready = n >= 100;

  return (
    <div className={`gate${leaving ? " leaving" : ""}${ready ? " ready" : ""}`} role="dialog" aria-label="Welcome">
      <div className="gate-grid" />
      <div className="gate-top">
        <span>{profile.initials}.</span>
        <span>PORTFOLIO · 2026</span>
      </div>
      <div className="gate-center">
        <p className="gate-hello">HELLO, I'M</p>
        <h1 className="gate-name">{profile.name}</h1>
        <p className="gate-role">{profile.role}</p>
        <div className="gate-actions">
          <button className="btn primary magnetic" onClick={() => go(true)} disabled={!ready} data-cursor="ENTER">
            {canSpeak ? "Enter & meet me 🔊" : "Enter"}
          </button>
          <button className="btn ghost" onClick={() => go(false)} disabled={!ready}>
            Enter silently
          </button>
        </div>
      </div>
      <div className="gate-bottom">
        <span className="gate-count">{String(n).padStart(3, "0")}</span>
        <div className="gate-bar"><i style={{ transform: `scaleX(${n / 100})` }} /></div>
        <span>{ready ? "READY" : "LOADING"}</span>
      </div>
    </div>
  );
}
