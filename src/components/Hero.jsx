import { useMemo, useRef, useState } from "react";
import profilePhoto from "../assets/profile.jpg";
import { profile } from "../profile";
import { useTilt } from "../hooks";
import Words from "./Words";
import ParticleField from "./ParticleField";

function Avatar() {
  return (
    <div className="avatar">
      <svg viewBox="0 0 200 250" aria-hidden="true">
        <defs>
          <linearGradient id="av" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff7a5f" />
            <stop offset="1" stopColor="#7a5cf0" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="92" r="40" fill="url(#av)" opacity=".9" />
        <path d="M20 250c0-56 36-92 80-92s80 36 80 92z" fill="url(#av)" opacity=".75" />
      </svg>
      <span className="avatar-initials">{profile.initials}</span>
      <span className="avatar-hint">Add your photo →<br />src/assets/profile.jpg</span>
    </div>
  );
}

function VoiceCard({ voice }) {
  const { words, speaking, wordIndex, finished, start, stop, supported } = voice;

  // show only the sentence currently being spoken (karaoke style)
  const sentence = useMemo(() => {
    if (wordIndex < 0) return null;
    let s = 0;
    for (let i = wordIndex; i > 0; i--) {
      if (/[.!?]$/.test(words[i - 1])) {
        s = i;
        break;
      }
    }
    let e = words.length;
    for (let i = wordIndex; i < words.length; i++) {
      if (/[.!?]$/.test(words[i])) {
        e = i + 1;
        break;
      }
    }
    return { s, e };
  }, [wordIndex, words]);

  return (
    <div className={`voice-card${speaking ? " speaking" : ""}`}>
      <button
        className="voice-btn magnetic"
        onClick={speaking ? stop : start}
        disabled={!supported}
        aria-label={speaking ? "Stop introduction" : "Play introduction"}
        data-cursor={speaking ? "STOP" : "PLAY"}
      >
        {speaking ? (
          <span className="eq"><i /><i /><i /><i /><i /></span>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
        )}
      </button>
      <div className="voice-text" aria-live="polite">
        <p className="voice-label">
          {speaking ? "NOW SPEAKING" : finished ? "PLAY AGAIN" : "HEAR MY INTRODUCTION"}
        </p>
        <p className="voice-line">
          {sentence
            ? words.slice(sentence.s, sentence.e).map((w, i) => {
                const idx = sentence.s + i;
                return (
                  <span key={idx} className={idx < wordIndex ? "done" : idx === wordIndex ? "now" : ""}>
                    {w}{" "}
                  </span>
                );
              })
            : supported
            ? "Tap play — I'll introduce myself in a few seconds."
            : "Voice isn't supported in this browser."}
        </p>
      </div>
    </div>
  );
}

export default function Hero({ voice, entered }) {
  const stage = useRef(null);
  const [broken, setBroken] = useState(false);
  useTilt(stage, { ease: 0.1 });

  return (
    <section className={`hero${entered ? " in" : ""}`} id="home">
      <div className="hero-bg">
        <div className="hero-orb" />
        <div className="hero-grid" />
        <ParticleField />
      </div>

      <div className="hero-copy">
        <p className="eyebrow reveal-line"><span className="dot" /> {profile.availability.toUpperCase()} · {profile.role.toUpperCase()}</p>
        <h1 className="hero-title">
          <Words text={profile.headline} start={2} step={70} />
        </h1>
        <p className="hero-desc reveal-line" style={{ "--d": "700ms" }}>{profile.subheadline}</p>
        <div className="hero-actions reveal-line" style={{ "--d": "850ms" }}>
          <a className="btn primary magnetic" href="#projects">Discover my work ↘</a>
          <a className="btn ghost magnetic" href="#about">A little about me</a>
        </div>
        <p className="hero-meta reveal-line" style={{ "--d": "1000ms" }}>
          <span>📍 {profile.location}</span>
          <span>JAVA · REACT · PYTHON · AI</span>
        </p>
      </div>

      <div className="hero-right reveal-line" style={{ "--d": "500ms" }}>
        <div className={`stage${voice.speaking ? " speaking" : ""}`} ref={stage} data-cursor="MOVE ME">
          <div className="rings"><i /><i /><i /></div>
          <div className="frame back" />
          <div className="frame mid" />
          <div className="frame front">
            <div className="photo-inner">
              {broken ? (
                <Avatar />
              ) : (
                <img
                  src={profilePhoto}
                  alt={`${profile.name} — portrait`}
                  className="hero-photo"
                  onError={() => setBroken(true)}
                  onLoad={(e) => e.currentTarget.naturalWidth === 0 && setBroken(true)}
                />
              )}
            </div>
            <span className="glare" />
          </div>
          <span className="chip chip-a">☕ Java</span>
          <span className="chip chip-b">⚛ React</span>
          <span className="chip chip-c">🐍 Python</span>
          <span className="chip chip-d">✦ AI</span>
          <span className="stage-caption">{profile.photoCaption}</span>
        </div>
        <VoiceCard voice={voice} />
      </div>

      <a className="scroll-hint" href="#about" aria-label="Scroll down">
        <span>SCROLL</span><i />
      </a>
    </section>
  );
}
