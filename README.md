# Portfolio

React + Vite. No animation library needed — everything is plain React, CSS and small scroll/pointer hooks.

## Run it
```bash
npm install
npm run dev      # open the URL it prints
npm run build    # production build in /dist
```
(`preview/index.html` is a ready-made build you can just double-click to look at.)

## Fill in your information — only 3 files
| File | What to edit |
|---|---|
| `src/profile.js` | Name, headline, **voice introduction text**, about text, stats, skills, email, phone, social links. Anything in `[BRACKETS]` is a placeholder. |
| `src/certificates.js` | Your 11 certificates are already filled in. Files + previews live in `public/certs/`. Add a row to add one. |
| `src/projects.js` | Your projects (text, tech stack, GitHub/demo links). |
| `src/assets/profile.jpg` | Replace with your photo (portrait, ~4:5 works best). |

## Voice introduction
Visitors click **“Enter & meet me 🔊”** on the welcome screen (browsers only allow sound after a click) and the site speaks `profile.voice.text`, highlighting each word. To use **your own recorded voice**, put `intro.mp3` in a `public/` folder and set `audioFile: "/intro.mp3"` in `profile.js`.

## Terminology used (handy for describing changes)
- **Sticky stacking cards** – Projects: each card sticks and the next one slides over it.
- **Crossroad / branching timeline** – Certificates (default view): a road with junctions and signposts.
- **Card piles (fan-out stack)** – Certificates, second view.
- **Scroll-scrubbed text / pinned scene** – Contact: giant words slide while you scroll, then fade to reveal the contact card.
- **Tilt / parallax / magnetic** – cards tilt in 3D, buttons lean toward the cursor.
