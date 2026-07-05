/* =========================================================
   Sourabh ❤️ Aakansha — script.js
   Night sky + falling hearts, typewriter, reveal-on-scroll,
   fireworks + confetti, proposal interactions, music toggle.
   ========================================================= */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------
     1. NIGHT SKY: twinkling stars + infinite falling hearts
     --------------------------------------------------------- */
  const skyCanvas = document.getElementById("sky-canvas");
  const skyCtx = skyCanvas.getContext("2d");

  let width, height, dpr;
  let stars = [];
  let hearts = [];

  function resizeSky() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    skyCanvas.width = width * dpr;
    skyCanvas.height = height * dpr;
    skyCanvas.style.width = width + "px";
    skyCanvas.style.height = height + "px";
    skyCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initStars();
  }

  function initStars() {
    const count = Math.floor((width * height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.006,
    }));
  }

  function spawnHeart(initial = false) {
    const size = Math.random() * 14 + 8;
    const colors = ["#f3aac4", "#f4cf9a", "#fdf6f0", "#c99bd6"];
    return {
      x: Math.random() * width,
      y: initial ? Math.random() * height : -20 - Math.random() * 100,
      size,
      speed: Math.random() * 0.5 + 0.35,
      sway: Math.random() * 1.2 + 0.4,
      swayOffset: Math.random() * Math.PI * 2,
      rotation: Math.random() * 0.6 - 0.3,
      opacity: Math.random() * 0.5 + 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }

  function initHearts() {
    const count = prefersReducedMotion ? 6 : Math.min(28, Math.floor(width / 55));
    hearts = Array.from({ length: count }, () => spawnHeart(true));
  }

  function drawHeart(ctx, x, y, size, rotation, color, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    const s = size / 16;
    ctx.moveTo(0, 4 * s);
    ctx.bezierCurveTo(-8 * s, -6 * s, -16 * s, 2 * s, 0, 14 * s);
    ctx.bezierCurveTo(16 * s, 2 * s, 8 * s, -6 * s, 0, 4 * s);
    ctx.fill();
    ctx.restore();
  }

  let skyTime = 0;
  function renderSky() {
    skyCtx.clearRect(0, 0, width, height);

    // stars
    skyTime += 1;
    for (const s of stars) {
      const twinkle = 0.55 + Math.sin(skyTime * s.speed + s.phase) * 0.45;
      skyCtx.globalAlpha = Math.max(0, twinkle);
      skyCtx.fillStyle = "#fdf6f0";
      skyCtx.beginPath();
      skyCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      skyCtx.fill();
    }
    skyCtx.globalAlpha = 1;

    // falling hearts
    for (const h of hearts) {
      h.y += h.speed * (prefersReducedMotion ? 0.3 : 1);
      const swayX = h.x + Math.sin(skyTime * 0.01 + h.swayOffset) * h.sway * 8;
      drawHeart(skyCtx, swayX, h.y, h.size, h.rotation, h.color, h.opacity);
      if (h.y > height + 30) {
        Object.assign(h, spawnHeart(false));
      }
    }

    requestAnimationFrame(renderSky);
  }

  resizeSky();
  initHearts();
  window.addEventListener("resize", () => {
    resizeSky();
    initHearts();
  });
  requestAnimationFrame(renderSky);

  /* ---------------------------------------------------------
     2. SCROLL PROGRESS (heartbeat line at top)
     --------------------------------------------------------- */
  const progressFill = document.getElementById("progress-fill");
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------------------------------------------------------
     3. SCROLL CUE + REVEAL ON SCROLL
     --------------------------------------------------------- */
  document.getElementById("scroll-cue").addEventListener("click", () => {
    document.getElementById("letter").scrollIntoView({ behavior: "smooth" });
  });

  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------------
     4. TYPEWRITER LOVE LETTER
     --------------------------------------------------------- */
  const letterText =
    "My dearest Aakansha,\n\n" +
    "If I could bottle every quiet moment we've shared and hold it up to the light, " +
    "it would look exactly like the sky outside tonight — endless, warm, and full of tiny wonders.\n\n" +
    "You didn't just walk into my life, you rearranged it, gently, until everything made a little more sense. " +
    "Every message from you feels like sunlight finding a window it wasn't sure it would reach.\n\n" +
    "I don't have the perfect words for how much you mean to me. So instead, I built you a small universe. " +
    "Scroll on, there's a question waiting at the end of it.";

  const typewriterEl = document.getElementById("typewriter-text");
  const caretEl = document.getElementById("caret");
  let typewriterStarted = false;

  function typeWriter(text, el, speed = 28) {
    let i = 0;
    (function tick() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(tick, speed);
      } else if (caretEl) {
        caretEl.style.display = "inline-block";
      }
    })();
  }

  const letterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !typewriterStarted) {
          typewriterStarted = true;
          if (prefersReducedMotion) {
            typewriterEl.textContent = letterText;
          } else {
            typeWriter(letterText, typewriterEl, 18);
          }
        }
      });
    },
    { threshold: 0.3 }
  );
  letterObserver.observe(document.getElementById("letter"));

  /* ---------------------------------------------------------
     5. FX CANVAS: fireworks + confetti
     --------------------------------------------------------- */
  const fxCanvas = document.getElementById("fx-canvas");
  const fxCtx = fxCanvas.getContext("2d");
  let fxParticles = [];
  let fxRunning = false;

  function resizeFx() {
    fxCanvas.width = window.innerWidth * dpr;
    fxCanvas.height = window.innerHeight * dpr;
    fxCanvas.style.width = window.innerWidth + "px";
    fxCanvas.style.height = window.innerHeight + "px";
    fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeFx();
  window.addEventListener("resize", resizeFx);

  function launchFirework(x, y) {
    const colors = ["#f3aac4", "#f4cf9a", "#fdf6f0", "#c99bd6", "#8fd3f4"];
    const count = 46;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * 3.2 + 1.6;
      fxParticles.push({
        type: "spark",
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: Math.random() * 0.012 + 0.012,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1.5,
      });
    }
  }

  function launchConfettiBurst() {
    const colors = ["#f3aac4", "#f4cf9a", "#fdf6f0", "#c99bd6", "#8fd3f4"];
    const count = 140;
    for (let i = 0; i < count; i++) {
      fxParticles.push({
        type: "confetti",
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: -20,
        vx: (Math.random() - 0.5) * 2.4,
        vy: Math.random() * 2 + 1.5,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        life: 1,
        decay: Math.random() * 0.004 + 0.002,
        color: colors[Math.floor(Math.random() * colors.length)],
        w: Math.random() * 6 + 4,
        h: Math.random() * 10 + 6,
      });
    }
  }

  function runFx() {
    fxCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    fxParticles.forEach((p) => {
      if (p.type === "spark") {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // gravity
        p.life -= p.decay;
        fxCtx.globalAlpha = Math.max(p.life, 0);
        fxCtx.fillStyle = p.color;
        fxCtx.beginPath();
        fxCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        fxCtx.fill();
      } else if (p.type === "confetti") {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.015;
        p.rotation += p.rotSpeed;
        p.life -= p.decay;
        fxCtx.save();
        fxCtx.globalAlpha = Math.max(p.life, 0);
        fxCtx.translate(p.x, p.y);
        fxCtx.rotate(p.rotation);
        fxCtx.fillStyle = p.color;
        fxCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        fxCtx.restore();
      }
    });
    fxParticles = fxParticles.filter((p) => p.life > 0 && p.y < window.innerHeight + 40);
    fxCtx.globalAlpha = 1;

    if (fxParticles.length > 0) {
      requestAnimationFrame(runFx);
    } else {
      fxRunning = false;
    }
  }

  function ensureFxRunning() {
    if (!fxRunning) {
      fxRunning = true;
      requestAnimationFrame(runFx);
    }
  }

  function celebrate() {
    if (prefersReducedMotion) return;
    // a few staggered fireworks across the upper canvas
    const bursts = 5;
    for (let i = 0; i < bursts; i++) {
      setTimeout(() => {
        launchFirework(
          window.innerWidth * (0.2 + Math.random() * 0.6),
          window.innerHeight * (0.2 + Math.random() * 0.35)
        );
        ensureFxRunning();
      }, i * 260);
    }
    launchConfettiBurst();
    ensureFxRunning();
  }

  /* ---------------------------------------------------------
     6. PROPOSAL FLOW: Ask Me -> scroll -> Yes/No -> answer
     --------------------------------------------------------- */
  document.getElementById("ask-btn").addEventListener("click", () => {
    document.getElementById("final").scrollIntoView({ behavior: "smooth" });
  });

  const noBtn = document.getElementById("no-btn");
  const answerRow = document.querySelector(".answer-row");
  let dodgeCount = 0;
  const dodgeMessages = [
    "Not Yet",
    "Try Again?",
    "Nope!",
    "Still No 😅",
    "Almost Caught Me",
    "Just Say Yes 🥺",
  ];

  function dodgeNoButton() {
    const rowRect = answerRow.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = rowRect.width - btnRect.width;
    const maxY = 70;
    const newX = Math.random() * Math.max(maxX, 40) - maxX / 2;
    const newY = (Math.random() - 0.5) * maxY;
    noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
    dodgeCount = Math.min(dodgeCount + 1, dodgeMessages.length - 1);
    noBtn.textContent = dodgeMessages[dodgeCount];
  }

  noBtn.addEventListener("mouseenter", () => {
    if (!prefersReducedMotion) dodgeNoButton();
  });
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dodgeNoButton();
  });
  // touch support: dodge on tap-start for mobile
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dodgeNoButton();
  }, { passive: false });

  document.getElementById("yes-btn").addEventListener("click", () => {
    document.getElementById("question-view").classList.add("hidden");
    const answerView = document.getElementById("answer-view");
    answerView.classList.remove("hidden");
    celebrate();
  });

  /* ---------------------------------------------------------
     7. BACKGROUND MUSIC TOGGLE
     --------------------------------------------------------- */
  const musicBtn = document.getElementById("music-toggle");
  const bgMusic = document.getElementById("bg-music");
  let isPlaying = false;

  musicBtn.addEventListener("click", async () => {
    try {
      if (!isPlaying) {
        await bgMusic.play();
        isPlaying = true;
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("aria-pressed", "true");
        musicBtn.querySelector(".music-label").textContent = "Pause";
      } else {
        bgMusic.pause();
        isPlaying = false;
        musicBtn.classList.remove("playing");
        musicBtn.setAttribute("aria-pressed", "false");
        musicBtn.querySelector(".music-label").textContent = "Music";
      }
    } catch (err) {
      // No audio file provided or playback blocked — fail silently.
      musicBtn.querySelector(".music-label").textContent = "Add music.mp3";
    }
  });
})();
