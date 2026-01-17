// script.js
(() => {
  const $ = (s, el = document) => el.querySelector(s);

  // footer year
  $("#year").textContent = String(new Date().getFullYear());

  // sticky header elevation
  const header = $(".header");
  const onScroll = () => {
    header.dataset.stuck = window.scrollY > 6 ? "true" : "false";
    // parallax clouds a bit with scroll
    const clouds = document.querySelectorAll(".cloud");
    const y = window.scrollY;
    clouds.forEach((c, i) => {
      const depth = (i + 1) * 0.02;
      c.style.translate = `0 ${Math.min(40, y * depth)}px`;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // mobile nav drawer
  const toggle = $(".nav-toggle");
  const drawer = $(".nav-drawer");
  const setDrawer = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    drawer.hidden = !open;
  };
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setDrawer(open);
  });
  drawer?.addEventListener("click", (e) => {
    if (e.target.matches("a")) setDrawer(false);
  });

  // Canvas light rays (soft, slow)
  const canvas = $("#light");
  const ctx = canvas.getContext("2d", { alpha: true });

  let w = 0, h = 0, dpr = 1;
  const rays = [];
  const RAY_COUNT = 14;

  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    rays.length = 0;
    for (let i = 0; i < RAY_COUNT; i++) {
      rays.push({
        a: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.0007 + 0.00025) * (Math.random() < 0.5 ? -1 : 1),
        width: Math.random() * 0.22 + 0.08,
        alpha: Math.random() * 0.08 + 0.03,
        hueShift: Math.random() * 18 - 9,
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);

    // light origin slightly above center
    const ox = w * 0.55;
    const oy = h * 0.18;

    // subtle glow
    const glow = ctx.createRadialGradient(ox, oy, 0, ox, oy, Math.min(w, h) * 0.9);
    glow.addColorStop(0, "rgba(255,255,255,0.55)");
    glow.addColorStop(0.35, "rgba(255,220,150,0.25)");
    glow.addColorStop(0.75, "rgba(155,233,255,0.10)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // rays
    rays.forEach((r, idx) => {
      r.a += r.speed * (t || 1);

      const angle = r.a;
      const spread = r.width;
      const len = Math.max(w, h) * 1.15;

      const a1 = angle - spread;
      const a2 = angle + spread;

      const x1 = ox + Math.cos(a1) * len;
      const y1 = oy + Math.sin(a1) * len;
      const x2 = ox + Math.cos(a2) * len;
      const y2 = oy + Math.sin(a2) * len;

      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();

      // warm-cool gradient per ray
      const g = ctx.createLinearGradient(ox, oy, (x1 + x2) / 2, (y1 + y2) / 2);
      const warm = `rgba(255, 185, 110, ${r.alpha})`;
      const cool = `rgba(140, 220, 255, ${r.alpha * 0.9})`;
      g.addColorStop(0, `rgba(255,255,255,${r.alpha * 1.1})`);
      g.addColorStop(0.35, warm);
      g.addColorStop(0.85, cool);
      g.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = g;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  requestAnimationFrame(draw);

  // Smooth scroll (if not reduced motion)
  const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduce) {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  }
})();
