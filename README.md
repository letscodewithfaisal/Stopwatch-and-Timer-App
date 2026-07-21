# ChronoDeck — Stopwatch & Timer

A polished stopwatch and timer built with React, Vite, and Tailwind CSS. Styled as a precision instrument panel: a machined dark dial, tabular monospace digits, and a physical-feeling mode switch between stopwatch and timer.

## Features

- **Stopwatch** — start, pause/resume, reset, and lap recording, with drift-free timing based on wall-clock deltas (not `setInterval` ticks).
- **Timer** — custom hours/minutes/seconds input, start, pause/resume, reset, and a circular progress ring that drains as time runs out, with a clear "time's up" state.
- **Mode switch** — toggle between the two tools without losing either one's state.
- Fully responsive, keyboard-focusable controls, and respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The build output goes to `dist/`.

## Deploying (for your "Live hosted link" submission)

The easiest options for a Vite app:

### Vercel
1. Push this project to a public GitHub repo.
2. Live URL: https://stopwatch-and-timer-app-two.vercel.app/


### GitHub Pages
1. `npm install --save-dev gh-pages`
2. Add to `package.json` scripts: `"predeploy": "npm run build", "deploy": "gh-pages -d dist"`.
4. Run `npm run deploy`.

## Publishing to GitHub (for your "Public GitHub repository link" submission)

```bash
git init
git add .
git commit -m "Initial commit: stopwatch and timer app"
git branch -M main
git remote add origin https://github.com/letscodewithfaisal/Stopwatch-and-Timer-App
git push -u origin main
```

## Project structure

```
src/
  components/
    ModeSwitch.jsx   # stopwatch/timer toggle
    Stopwatch.jsx     # stopwatch panel: start/pause/reset/lap
    Timer.jsx         # timer panel: custom input, countdown, progress ring
  App.jsx             # composes header, mode switch, active panel
  main.jsx            # React root
  index.css           # Tailwind + base styles
```
