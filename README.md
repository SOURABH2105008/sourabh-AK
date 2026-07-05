# Sourabh ❤️ Aakansha

A premium, single-page romantic website — a night sky full of stars, an infinite fall of hearts, a typewritten love letter, and a proposal at the end.

Built with plain **HTML, CSS, and JavaScript** — no build step, no dependencies. Open `index.html` and it just works.

---

## ✨ Features

- **Animated night sky** — a canvas gradient sky with soft ambient depth
- **Twinkling stars** — hundreds of stars with independent twinkle rhythms
- **Infinite falling hearts** — hearts continuously respawn from the top, drifting and swaying forever
- **Heartbeat animation** — a pulsing heart in the hero title, synced like an ECG beat
- **Typewriter love letter** — a hand-written letter that types itself out when scrolled into view
- **Glassmorphism UI** — frosted-glass cards throughout, with blur, soft borders, and depth
- **Fireworks & confetti** — canvas-based bursts triggered when she says "Yes"
- **Proposal flow** — an "Ask Me" button leads to the final question
- **Playful "Not Yet" button** — dodges the cursor and changes its message each time
- **Smooth scroll transitions** — sections fade and rise into view as you scroll
- **Scroll-progress heartbeat bar** — a glowing line at the top tracks how far through the story you are
- **Responsive design** — looks good from a small phone to a large desktop
- **Background music support** — a floating music toggle button, ready for your own track
- **Final screen** — "Will You Stay With Me Forever?" with a celebratory Yes state

---

## 📁 Project structure

```
sourabh-aakansha/
├── index.html      # Page structure & content (edit the letter & names here)
├── style.css        # All styling, animation keyframes, responsive rules
├── script.js         # Canvas sky/hearts, typewriter, fireworks, interactions
├── assets/
│   └── music.mp3    # (you provide this — see below)
└── README.md
```

---

## 🚀 Running it

No installation needed.

1. Download/copy the whole `sourabh-aakansha` folder.
2. Double-click `index.html` (or right-click → "Open with" your browser).
3. That's it — it runs entirely in the browser.

For the best experience (especially fonts loading correctly), you can also serve it locally:

```bash
# From inside the project folder
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 🎵 Adding background music

The site is wired up for background music but does **not** ship with an audio file (to keep the project lightweight and copyright-free).

To enable it:

1. Add your own royalty-free `.mp3` file.
2. Rename it `music.mp3`.
3. Place it inside the `assets/` folder, replacing the empty placeholder.

The floating **♪ Music** button in the bottom-right corner will then play/pause it. If no file is present, clicking the button will simply show "Add music.mp3" instead of failing.

> Tip: sites like Pixabay Music or YouTube Audio Library have free, romantic instrumental tracks you can use.

---

## 💌 Customizing

Everything personal lives in `index.html`:

- **Names** — in the `<h1 class="hero-title">` block in the Hero section.
- **The love letter** — edit the `letterText` string near the top of `script.js` (`TYPEWRITER LOVE LETTER` section). Use `\n\n` for paragraph breaks.
- **Reasons cards** — the four `.reason-card` articles in the "Why I Love You" section.
- **Final question** — the `.final-question` heading and `.final-answer` text in the Final section.

Colors and fonts are defined as CSS variables at the top of `style.css` under `:root` — change `--rose-400`, `--gold-300`, etc. to shift the palette.

---

## 🌐 Browser support

Works in all modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses `backdrop-filter` for the glass effect and `<canvas>` for animations — both are widely supported. Respects `prefers-reduced-motion` for visitors who prefer calmer motion.

---

Made with ♥ for two names that belong on the same page.
