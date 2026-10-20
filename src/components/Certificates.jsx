import { useEffect, useRef, useState } from "react";
import { certificates, chapterTitles } from "../certificates";
import { useReveal, useScrollVar } from "../hooks";
import Words from "./Words";

const PER = 3;
const pad = (n) => String(n).padStart(2, "0");
const chunk = () => {
  const out = [];
  for (let i = 0; i < certificates.length; i += PER) out.push(certificates.slice(i, i + PER));
  return out;
};

function Crossroad() {
  return (
    <svg className="crossroad" viewBox="0 0 160 160" aria-hidden="true">
      <rect x="62" y="0" width="36" height="160" rx="4" className="rd" />
      <rect x="0" y="62" width="160" height="36" rx="4" className="rd" />
      <rect x="62" y="62" width="36" height="36" className="rd" />
      <path d="M80 4V58M80 102V156" className="dash" />
      <path d="M4 80H58M102 80H156" className="dash" />
      <g className="arrows">
        <path d="M22 80l10-7v14z" />
        <path d="M138 80l-10-7v14z" />
        <path d="M80 140l-7-10h14z" />
      </g>
      <circle cx="80" cy="80" r="5" className="hub" />
    </svg>
  );
}

function Body({ c, onZoom }) {
  const empty = !c.title;
  const href = c.url || c.file;
  return (
    <>
      <div className="cert-top">
        <span>CERTIFICATE {pad(c.id)}</span>
        <span className="cert-more" aria-hidden="true">＋</span>
      </div>
      <h3 className={empty ? "ph" : ""}>{c.title || "Certificate title"}</h3>
      <div className="cert-meta">
        <span className={c.issuer ? "" : "ph"}>{c.issuer || "Issuing organisation"}</span>
        <span className={c.date ? "" : "ph"}>{c.date || "Month Year"}</span>
      </div>
      <div className="cert-detail">
        <div>
          <p>{c.note || "Add a short note about what you learned in certificates.js."}</p>
          {c.thumb && (
            <span
              className="cert-thumb"
              role="button"
              tabIndex={0}
              data-cursor="ZOOM"
              onClick={(e) => { e.stopPropagation(); onZoom(c); }}
              onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); onZoom(c); } }}
            >
              <img src={c.thumb} alt={`${c.title} — preview`} loading="lazy" />
            </span>
          )}
          {href && (
            <a href={href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
              View certificate ↗
            </a>
          )}
        </div>
      </div>
    </>
  );
}

function Sign({ c, side, open, setOpen, onZoom }) {
  const ref = useReveal(0.25);
  const isOpen = open === c.id;
  return (
    <div ref={ref} className={`sign ${side}`}>
      <span className="node" />
      <span className="branch" />
      <button
        className={`cert sign-board${isOpen ? " open" : ""}`}
        onClick={() => setOpen(isOpen ? null : c.id)}
        aria-expanded={isOpen}
        data-cursor={isOpen ? "CLOSE" : "OPEN"}
      >
        <Body c={c} onZoom={onZoom} />
      </button>
    </div>
  );
}

function RoadView({ onZoom }) {
  const road = useRef(null);
  const [open, setOpen] = useState(null);
  useScrollVar(road, { mode: "pass", anchor: 0.55 });
  const groups = chunk();
  let n = 0;
  return (
    <div className="road" ref={road}>
      <div className="spine"><i className="spine-fill" /></div>
      <span className="car" aria-hidden="true">▼</span>
      {groups.map((g, gi) => (
        <div className="chapter" key={gi}>
          <ChapterHead gi={gi} g={g} />
          {g.map((c) => {
            const side = n++ % 2 === 0 ? "left" : "right";
            return <Sign key={c.id} c={c} side={side} open={open} setOpen={setOpen} onZoom={onZoom} />;
          })}
        </div>
      ))}
      <div className="road-end"><span>MORE MILESTONES AHEAD</span></div>
    </div>
  );
}

function ChapterHead({ gi, g }) {
  const ref = useReveal(0.4);
  return (
    <div className="chapter-head" ref={ref}>
      <Crossroad />
      <p>CROSSROAD {pad(gi + 1)}</p>
      <span>{chapterTitles[gi] || `Certificates ${pad(gi * PER + 1)} — ${pad(gi * PER + g.length)}`}</span>
    </div>
  );
}

function Pile({ group, gi, onZoom }) {
  const [top, setTop] = useState(0);
  const ref = useReveal(0.25);
  return (
    <div className="pile-wrap reveal" ref={ref} style={{ "--d": `${gi * 120}ms` }}>
      <p className="pile-label">{(chapterTitles[gi] || `CHAPTER ${pad(gi + 1)}`).toUpperCase()} · {group.length} CARDS</p>
      <div className="pile">
        {group.map((c, i) => {
          const isTop = i === top;
          // order cards so the active one is in front, others fan behind it
          const rank = (i - top + group.length) % group.length;
          return (
            <button
              key={c.id}
              className={`cert pile-card${isTop ? " top" : ""}`}
              style={{ "--rank": rank, "--n": group.length, zIndex: 10 - rank }}
              onClick={() => setTop(isTop ? (top + 1) % group.length : i)}
              data-cursor={isTop ? "NEXT" : "BRING FORWARD"}
              aria-label={`Certificate ${c.id}`}
            >
              <Body c={c} onZoom={onZoom} />
            </button>
          );
        })}
      </div>
      <p className="pile-hint">Hover to fan out · click to shuffle</p>
    </div>
  );
}

export default function Certificates() {
  const head = useReveal();
  const [view, setView] = useState("road");
  const [zoom, setZoom] = useState(null);
  useEffect(() => {
    if (!zoom) return;
    const k = (e) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [zoom]);
  const groups = chunk();
  return (
    <section className="certs" id="certificates">
      <div className="wrap">
        <div ref={head} className="reveal-group certs-head">
          <div>
            <p className="section-label">04 / LEARNING JOURNEY</p>
            <h2 className="big-h"><Words text={"Certificates &\n*milestones.*"} /></h2>
          </div>
          <div className="toggle" role="tablist" aria-label="Certificate layout">
            <button role="tab" aria-selected={view === "road"} className={view === "road" ? "on" : ""} onClick={() => setView("road")}>
              ⑂ Crossroad
            </button>
            <button role="tab" aria-selected={view === "piles"} className={view === "piles" ? "on" : ""} onClick={() => setView("piles")}>
              ▤ Card piles
            </button>
          </div>
        </div>

        {view === "road" ? (
          <RoadView key="road" onZoom={setZoom} />
        ) : (
          <div className="piles" key="piles">
            {groups.map((g, gi) => <Pile key={gi} group={g} gi={gi} onZoom={setZoom} />)}
          </div>
        )}
      </div>

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(null)} role="dialog" aria-label="Certificate preview">
          <button className="lightbox-close" aria-label="Close">✕</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={zoom.large || zoom.thumb} alt={zoom.title} />
            <figcaption>
              <b>{zoom.title}</b>
              <span>{zoom.issuer} · {zoom.date}</span>
              {(zoom.url || zoom.file) && (
                <a href={zoom.url || zoom.file} target="_blank" rel="noreferrer">Open original ↗</a>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
