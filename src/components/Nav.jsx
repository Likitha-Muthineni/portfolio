import { useEffect, useState } from "react";
import { profile } from "../profile";
import { useActiveSection } from "../hooks";

const links = [
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["certificates", "Certificates"],
  ["contact", "Contact"],
];
const ids = ["home", ...links.map((l) => l[0])];

export default function Nav() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      <header className={`nav${open ? " open" : ""}`}>
        <a className="logo" href="#home" onClick={() => setOpen(false)}>
          {profile.initials}<span>.</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="nav-cta magnetic" href="#contact" onClick={() => setOpen(false)}>
          Let's talk ↗
        </a>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <i /><i />
        </button>
      </header>
    </>
  );
}
