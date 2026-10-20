import { useEffect, useRef, useState } from "react";
import { profile } from "../profile";
import { useScrollVar } from "../hooks";

const rows = ["LET'S TALK", "SAY HELLO", "LET'S BUILD", "DROP A LINE"];

export default function Contact() {
  const sec = useRef(null);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  useScrollVar(sec, { mode: "pin" });

  // let the contact card be clickable only once it has appeared
  useEffect(() => {
    const el = sec.current;
    const on = () => setReady(parseFloat(el.style.getPropertyValue("--p") || "0") > 0.5);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
    } catch {
      /* clipboard may be blocked; mailto still works */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="contact" id="contact" ref={sec}>
      <div className="contact-pin">
        <div className="big-rows" aria-hidden="true">
          {rows.map((r, i) => (
            <div className={`big-row r${i}`} key={r}>
              {[0, 1, 2, 3].map((k) => (
                <span key={k}>{r}<em>✦</em></span>
              ))}
            </div>
          ))}
        </div>

        <p className="scroll-cue">KEEP SCROLLING ↓</p>

        <div className={`contact-card${ready ? " ready" : ""}`}>
          <p className="section-label">05 / CONTACT</p>
          <h2>Have an idea?<br />Let's make it real.</h2>
          <a className="email-big" href={`mailto:${profile.contact.email}`} data-cursor="WRITE">
            <span>{profile.contact.email}</span>
            <span className="fill" aria-hidden="true">{profile.contact.email}</span>
          </a>
          <div className="contact-row">
            <button className="btn dark magnetic" onClick={copy}>{copied ? "Copied ✓" : "Copy email"}</button>
            <span className="phone">{profile.contact.phone}</span>
            <span className="loc">📍 {profile.location}</span>
          </div>
          <div className="socials">
            {profile.contact.links.map((l) => (
              <a key={l.label} href={l.url || "#contact"} target={l.url ? "_blank" : undefined} rel="noreferrer" className="magnetic">
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
