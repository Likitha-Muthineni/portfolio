import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export { clamp };

/** Adds class "in" to the element once it scrolls into view. */
export function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

/**
 * Writes scroll progress (0..1) into a CSS variable on the element.
 * mode "pin": progress through a tall section that has a sticky child.
 * mode "pass": progress as the element travels through the viewport.
 */
export function useScrollVar(ref, { mode = "pass", name = "--p", anchor = 0.6 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p;
      if (mode === "pin") p = clamp(-r.top / Math.max(1, r.height - vh));
      else p = clamp((vh * anchor - r.top) / Math.max(1, r.height));
      el.style.setProperty(name, p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, mode, name, anchor]);
}

/**
 * Smooth pointer tracking. Sets --px/--py (-0.5..0.5) and --mx/--my (0..100%)
 * on the element, easing toward the pointer, and back to 0 on leave.
 */
export function useTilt(ref, { ease = 0.12 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = { x: 0, y: 0 };
    const c = { x: 0, y: 0 };
    let raf = 0;
    const tick = () => {
      c.x += (t.x - c.x) * ease;
      c.y += (t.y - c.y) * ease;
      el.style.setProperty("--px", c.x.toFixed(4));
      el.style.setProperty("--py", c.y.toFixed(4));
      el.style.setProperty("--mx", `${((c.x + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${((c.y + 0.5) * 100).toFixed(1)}%`);
      if (Math.abs(t.x - c.x) > 0.001 || Math.abs(t.y - c.y) > 0.001) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e) => {
      const r = el.getBoundingClientRect();
      t.x = (e.clientX - r.left) / r.width - 0.5;
      t.y = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add("is-hover");
      kick();
    };
    const leave = () => {
      t.x = 0;
      t.y = 0;
      el.classList.remove("is-hover");
      kick();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [ref, ease]);
}

/** Buttons/links with class .magnetic lean toward the cursor. */
export function useMagnetic(strength = 0.3) {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const els = document.querySelectorAll(".magnetic");
    const cleanups = [];
    els.forEach((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      };
      const leave = () => {
        el.style.transform = "";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [strength]);
}

/** Counts a number up when it becomes visible. */
export function useCountUp(target, duration = 1400) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      const start = performance.now();
      const step = (now) => {
        const k = clamp((now - start) / duration);
        setValue(Math.round(target * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) {
      setValue(target);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);
  return [ref, value];
}

/** Which section id is currently in view. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.4;
      let current = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

/**
 * Voice introduction. Uses a recorded audio file if provided, otherwise the
 * browser's speech synthesis, chained sentence by sentence (avoids the
 * Chrome ~15s cut-off) while reporting which word is being spoken.
 */
export function useVoiceIntro({ text, lang = "en-US", rate = 1, pitch = 1, audioFile = "" }) {
  const words = useMemo(() => text.trim().split(/\s+/), [text]);
  const [speaking, setSpeaking] = useState(false);
  const [wordIndex, setWordIndex] = useState(-1);
  const [finished, setFinished] = useState(false);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const run = useRef(0);
  const timer = useRef(0);
  const audio = useRef(null);
  const voicesRef = useRef([]);
  const started = useRef(false);

  useEffect(() => {
    if (!supported) return;
    const load = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    load();
    window.speechSynthesis.addEventListener?.("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener?.("voiceschanged", load);
  }, [supported]);

  const stop = useCallback(() => {
    run.current += 1;
    clearInterval(timer.current);
    if (supported) window.speechSynthesis.cancel();
    if (audio.current) {
      audio.current.pause();
      audio.current = null;
    }
    setSpeaking(false);
    setWordIndex(-1);
  }, [supported]);

  const finish = useCallback(() => {
    clearInterval(timer.current);
    setSpeaking(false);
    setWordIndex(-1);
    setFinished(true);
  }, []);

  const pickVoice = useCallback(() => {
    const list = voicesRef.current.filter((v) => v.lang && v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()));
    const pref = /(female|samantha|zira|aria|jenny|google (uk|us) english|karen|moira|serena|susan|hazel)/i;
    return list.find((v) => pref.test(v.name)) || list.find((v) => v.lang === lang) || list[0] || null;
  }, [lang]);

  const speak = useCallback(() => {
    const id = ++run.current;
    started.current = false;
    // if the browser never starts speaking (no voices installed, blocked…), reset the button
    setTimeout(() => {
      if (run.current === id && !started.current) finish();
    }, 5000);
    // split words into sentence chunks
    const chunks = [];
    let cur = [];
    let offset = 0;
    words.forEach((w, i) => {
      cur.push(w);
      if (/[.!?]$/.test(w) || i === words.length - 1) {
        chunks.push({ words: cur, offset });
        offset += cur.length;
        cur = [];
      }
    });
    const next = (ci) => {
      if (run.current !== id) return;
      if (ci >= chunks.length) return finish();
      const chunk = chunks[ci];
      const u = new SpeechSynthesisUtterance(chunk.words.join(" "));
      u.lang = lang;
      u.rate = rate;
      u.pitch = pitch;
      const v = pickVoice();
      if (v) u.voice = v;
      let boundary = false;
      u.onstart = () => {
        if (run.current !== id) return;
        started.current = true;
        setSpeaking(true);
        setWordIndex(chunk.offset);
        let local = 0;
        clearInterval(timer.current);
        const per = 60000 / (165 * rate);
        timer.current = setInterval(() => {
          if (boundary || run.current !== id) return;
          local = Math.min(local + 1, chunk.words.length - 1);
          setWordIndex(chunk.offset + local);
        }, per);
      };
      u.onboundary = (e) => {
        if (run.current !== id || typeof e.charIndex !== "number") return;
        boundary = true;
        const spoken = u.text.slice(0, e.charIndex);
        const local = spoken.length ? spoken.trim().split(/\s+/).length : 0;
        setWordIndex(chunk.offset + Math.min(local, chunk.words.length - 1));
      };
      u.onend = () => {
        clearInterval(timer.current);
        next(ci + 1);
      };
      u.onerror = (e) => {
        if (e && (e.error === "canceled" || e.error === "interrupted")) return;
        finish();
      };
      try {
        window.speechSynthesis.speak(u);
      } catch {
        finish();
      }
    };
    window.speechSynthesis.cancel();
    setTimeout(() => next(0), 80);
  }, [words, lang, rate, pitch, pickVoice, finish]);

  const start = useCallback(() => {
    stop();
    setFinished(false);
    setSpeaking(true);
    if (audioFile) {
      const id = run.current;
      const a = new Audio(audioFile);
      audio.current = a;
      started.current = true;
      a.addEventListener("timeupdate", () => {
        if (!a.duration) return;
        setWordIndex(Math.min(words.length - 1, Math.floor((a.currentTime / a.duration) * words.length)));
      });
      a.addEventListener("ended", finish);
      a.addEventListener("error", () => {
        if (run.current === id && supported) speak();
        else finish();
      });
      a.play().catch(() => {
        if (supported) speak();
        else finish();
      });
      return;
    }
    if (supported) speak();
    else finish();
  }, [stop, audioFile, words, supported, speak, finish]);

  useEffect(() => () => {
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);

  return { words, speaking, wordIndex, finished, start, stop, supported: supported || !!audioFile };
}
