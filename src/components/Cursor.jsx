import { useEffect, useRef } from "react";

// Soft follower ring that grows over links and shows hints (data-cursor="…").
export default function Cursor() {
  const ring = useRef(null);
  const label = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ring.current;
    document.documentElement.classList.add("has-cursor");
    const t = { x: -100, y: -100 };
    const c = { x: -100, y: -100 };
    let raf;
    const loop = () => {
      c.x += (t.x - c.x) * 0.2;
      c.y += (t.y - c.y) * 0.2;
      el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    const move = (e) => {
      t.x = e.clientX;
      t.y = e.clientY;
      el.classList.add("on");
    };
    const over = (e) => {
      const hit = e.target.closest?.("a, button, [data-cursor]");
      el.classList.toggle("grow", !!hit);
      const txt = e.target.closest?.("[data-cursor]")?.getAttribute("data-cursor") || "";
      label.current.textContent = txt;
      el.classList.toggle("has-label", !!txt);
    };
    const leave = () => el.classList.remove("on");
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div className="cursor" ref={ring} aria-hidden="true">
      <span ref={label} />
    </div>
  );
}
