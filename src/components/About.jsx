import { useRef, useState } from "react";
import { profile } from "../profile";
import { useCountUp, useReveal, useScrollVar } from "../hooks";
import Words from "./Words";

function Stat({ value, suffix, label }) {
  const [ref, n] = useCountUp(value);
  return (
    <div className="stat" ref={ref}>
      <strong>{n}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

function Fact({ q, a }) {
  const [flip, setFlip] = useState(false);
  return (
    <button className={`fact${flip ? " flip" : ""}`} onClick={() => setFlip(!flip)} data-cursor="FLIP" aria-pressed={flip}>
      <span className="fact-face front"><small>{q}</small><b>＋</b></span>
      <span className="fact-face back">{a}</span>
    </button>
  );
}

export default function About() {
  const head = useReveal();
  const bio = useRef(null);
  useScrollVar(bio, { mode: "pass", anchor: 0.9 });
  const words = profile.about.split(" ");

  return (
    <section className="about" id="about">
      <div className="wrap">
        <div ref={head} className="reveal-group">
          <p className="section-label">01 / ABOUT</p>
        </div>
        <p className="bio" ref={bio} style={{ "--n": words.length }}>
          {words.map((w, i) => (
            <span key={i} style={{ "--i": i }}>{w} </span>
          ))}
        </p>
        <div className="stats">
          {profile.stats.map((s) => <Stat key={s.label} {...s} />)}
        </div>
        <div className="facts">
          {profile.facts.map((f) => <Fact key={f.q} {...f} />)}
        </div>
      </div>
    </section>
  );
}
