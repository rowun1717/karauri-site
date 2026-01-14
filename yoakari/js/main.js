(() => {
  // フェードイン開始
  window.addEventListener("load", () => {
    document.body.classList.add("ready");
  });

  // 灯りトグル
  const btn = document.getElementById("toggleGlow");
  if (btn) {
    btn.addEventListener("click", () => {
      const dim = document.body.classList.toggle("dim");
      btn.textContent = dim ? "灯りを戻す" : "灯りを少し落とす";
    });
  }

  // 背景の“紙埃”粒子
  const canvas = document.getElementById("dust");
  const ctx = canvas.getContext("2d", { alpha: true });

  let w, h, dpr;
  const motes = [];
  const COUNT = 120;

  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    motes.length = 0;
    for (let i = 0; i < COUNT; i++) {
      motes.push(makeMote(true));
    }
  }

  function makeMote(randomY = false) {
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + Math.random() * 120,
      r: 0.6 + Math.random() * 1.8,
      vx: (-0.15 + Math.random() * 0.3),
      vy: (-0.25 - Math.random() * 0.35),
      a: 0.05 + Math.random() * 0.12,
      tw: 0.6 + Math.random() * 1.8,
      p: Math.random() * Math.PI * 2
    };
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);

    // 少しだけ金色寄り、でも控えめ
    ctx.fillStyle = "rgba(217,196,138,0.55)";

    for (const m of motes) {
      m.p += 0.01;
      const shimmer = (Math.sin(m.p) + 1) * 0.5; // 0..1
      const alpha = m.a + shimmer * 0.06;

      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fill();

      m.x += m.vx + Math.sin(m.p) * 0.05;
      m.y += m.vy;

      // 画面外に出たら下に戻す
      if (m.y < -30 || m.x < -40 || m.x > w + 40) {
        const n = makeMote(false);
        m.x = n.x; m.y = n.y; m.r = n.r; m.vx = n.vx; m.vy = n.vy; m.a = n.a; m.tw = n.tw; m.p = n.p;
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);
  resize();
  tick();
})();

// 既存のコードの最後に追記
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.2 });

reveals.forEach(el => io.observe(el));

