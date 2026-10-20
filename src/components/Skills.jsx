import { useRef } from "react";
import { skills } from "../profile";
import { useReveal, useTilt } from "../hooks";
import Words from "./Words";

function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const reveal = useReveal(0.2);
  useTilt(ref);
  return (
    <div ref={reveal} className="reveal" style={{ "--d": `${index * 110}ms` }}>
      <article className="skill-card tilt" ref={ref}>
        <span className="spot" />
        <span className="skill-icon">{skill.icon}</span>
        <span className="skill-num">0{index + 1}</span>
        <h3>{skill.title}</h3>
        <ul>
          {skill.items.map((s, i) => (
            <li key={s} style={{ "--i": i }}>{s}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export default function Skills() {
  const head = useReveal();
  return (
    <section className="skills" id="skills">
      <div className="wrap">
        <div ref={head} className="reveal-group">
          <p className="section-label">02 / WHAT I WORK WITH</p>
          <h2 className="big-h"><Words text={"Tools for turning\nideas into *software.*"} /></h2>
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => <SkillCard key={s.title} skill={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
