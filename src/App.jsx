import { useEffect, useState } from "react";
import { profile } from "./profile";
import { skills } from "./profile";
import { useMagnetic, useVoiceIntro } from "./hooks";
import Cursor from "./components/Cursor";
import Gate from "./components/Gate";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";

import "./styles/base.css";
import "./styles/hero.css";
import "./styles/sections.css";
import "./styles/certificates.css";
import "./styles/contact.css";

const techWords = skills.flatMap((s) => s.items);

export default function App() {
  const [entered, setEntered] = useState(false);
  const [gone, setGone] = useState(false);
  const voice = useVoiceIntro(profile.voice);
  useMagnetic();

  const enter = (withSound) => {
    setEntered(true);
    if (withSound && voice.supported) voice.start(); // runs inside the click = allowed to play
    setTimeout(() => setGone(true), 1000);
  };

  useEffect(() => {
    document.body.classList.toggle("locked", !entered);
  }, [entered]);

  return (
    <>
      <Cursor />
      {!gone && <Gate onEnter={enter} canSpeak={voice.supported} />}
      <Nav />
      <main>
        <Hero voice={voice} entered={entered} />
        <Marquee items={["JAVA", "SPRING BOOT", "REACT", "PYTHON", "GENERATIVE AI", "MYSQL"]} />
        <About />
        <Skills />
        <Marquee items={techWords} reverse />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <footer className="footer">
        <span>© 2026 · {profile.name}</span>
        <span>Designed &amp; built by me</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}
