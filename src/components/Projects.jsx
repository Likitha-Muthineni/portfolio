import { useEffect, useRef, useState } from "react";
import projects from "../projects";
import { clamp, useReveal, useTilt } from "../hooks";
import Words from "./Words";

function Art({ shape, color }) {
  return (
    <div className="art" style={{ "--c": color }}>
      <div className="art-bg" />
      {shape === "cube" && (
        <div className="cube-wrap">
          <div className="cube">
            {["f", "b", "l", "r", "t", "bo"].map((f) => <i key={f} className={f} />)}
          </div>
        </div>
      )}
      {shape === "orbit" && (
        <div className="orbit-wrap">
          <i className="o1" /><i className="o2" /><i className="o3" /><i className="core" />
        </div>
      )}
      {shape === "pulse" && (
        <div className="pulse-wrap">
          <svg viewBox="0 0 300 100" preserveAspectRatio="none">
            <polyline points="0,50 70,50 90,50 105,15 125,85 145,30 160,50 300,50" />
          </svg>
          <div className="plus">+</div>
        </div>
      )}
    </div>
  );
}

function ProjectItem({ project, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const reveal = useReveal(0.1);
  useTilt(ref);
  return (
    <div className="proj-item" data-i={index} ref={reveal} style={{ "--top": `${86 + index * 22}px` }}>
      <article className={`proj-card reveal-card${open ? " open" : ""}`} ref={ref} style={{ "--c": project.color }}>
        <div className="proj-art">
          <Art shape={project.shape} color={project.color} />
          <span className="proj-num">{project.number}</span>
          <span className="proj-hint">MOVE YOUR CURSOR</span>
        </div>
        <div className="proj-info">
          <p className="proj-cat">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="proj-desc">{project.description}</p>
          <div className="tags">{project.stack.map((t) => <span key={t}>{t}</span>)}</div>

          <div className="proj-details">
            <div>
              <p className="proj-details-label">INSIDE THE PROJECT</p>
              <ul>{project.details.map((d, i) => <li key={i} style={{ "--i": i }}>{d}</li>)}</ul>
            </div>
          </div>

          <div className="proj-links">
            <button className="btn primary small magnetic" onClick={() => setOpen(!open)} aria-expanded={open}>
              {open ? "Close details ↑" : "Explore project ↗"}
            </button>
            {project.github && <a className="link-u" href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
            {project.demo && <a className="link-u" href={project.demo} target="_blank" rel="noreferrer">Live demo ↗</a>}
          </div>
        </div>
      </article>
    </div>
  );
}

export default function Projects() {
  const head = useReveal();
  const stack = useRef(null);

  // As the next card slides over, the previous one shrinks and dims (--cover).
  useEffect(() => {
    const el = stack.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const items = el.querySelectorAll(".proj-item");
      const vh = window.innerHeight;
      items.forEach((item, i) => {
        const next = items[i + 1];
        let cover = 0;
        if (next) cover = clamp((vh - next.getBoundingClientRect().top) / (vh * 0.85));
        item.style.setProperty("--cover", cover.toFixed(3));
      });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <div ref={head} className="reveal-group projects-head">
          <div>
            <p className="section-label">03 / SELECTED WORK</p>
            <h2 className="big-h"><Words text={"Ideas made\n*tangible.*"} /></h2>
          </div>
          <p className="lead">Scroll — each project stacks over the last. Move your cursor over a card to tilt it in 3D.</p>
        </div>
        <div className="proj-stack" ref={stack}>
          {projects.map((p, i) => <ProjectItem key={p.number} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
