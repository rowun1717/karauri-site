// app.js
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Footer year
  $("#year").textContent = String(new Date().getFullYear());

  // Mobile nav
  const hamburger = $(".hamburger");
  const nav = $(".nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", String(open));
    });

    // close on link tap (mobile)
    $$(".nav a").forEach(a => {
      a.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
          nav.classList.remove("open");
          hamburger.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Today message rotation
  const todayLines = [
    "今日を生きただけで、えらい。",
    "休めたなら、それも前進。",
    "できない日があっても、あなたはだめじゃない。",
    "ここにいるだけで、もう十分。",
    "息できてる。合格。"
  ];
  const todayEl = $("#todayMessage");
  if (todayEl) {
    const idx = Math.floor(Math.random() * todayLines.length);
    todayEl.textContent = todayLines[idx];
  }

  // Mini experience (chips + score)
  const bubble = $("#bubbleText");
  const scoreEl = $("#score");
  const bar = $("#bar");
  const chips = $$("#chips .chip");
  const resetMini = $("#resetMini");

  let score = 20;
  const baseBubbles = [
    "おはよう。今日はカーテン開けられたら100点だよ。",
    "できたこと、1ミリでも見つけよう。",
    "焦らなくていい。世界は急いでるけど、あなたは急がなくていい。",
    "今日は“会えた”だけで、うれしい。"
  ];

  const toneToggle = $("#toneToggle");
  let tone = "normal"; // normal | extra
  const tonePhrases = {
    normal: {
      label: "やさしさ: ふつう",
      praise: [
        "えらい。",
        "いい感じ。",
        "ちゃんと前に進んでる。",
        "その一歩、すごいよ。"
      ],
      soothe: [
        "今日は休む日だったんだね。",
        "できない日があっても大丈夫。",
        "また会えたね。"
      ]
    },
    extra: {
      label: "やさしさ: たっぷり",
      praise: [
        "えらいえらい。よくやったね。",
        "ほんとにすごい。ちゃんと見てるよ。",
        "その一歩、抱きしめたいくらい大事。",
        "偉業。今日のあなた、最高。"
      ],
      soothe: [
        "今日は何もしなくていい日。ここにいるだけで花丸。",
        "うまくできなくても、あなたの価値は減らないよ。",
        "会えた。うれしい。ありがと。"
      ]
    }
  };

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function setScore(next) {
    score = clamp(next, 0, 100);
    if (scoreEl) scoreEl.textContent = String(score);
    if (bar) bar.style.width = `${score}%`;
  }

  function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

  function setBubble(text) {
    if (!bubble) return;
    bubble.textContent = text;
  }

  chips.forEach(btn => {
    btn.addEventListener("click", () => {
      const on = btn.getAttribute("data-on") === "true";
      btn.setAttribute("data-on", String(!on));

      // update score
      setScore(score + (on ? -15 : 15));

      // message
      const dict = tonePhrases[tone];
      const msg = !on
        ? `${btn.dataset.task}、${pick(dict.praise)}`
        : pick(dict.soothe);

      setBubble(msg);
    });
  });

  if (resetMini) {
    resetMini.addEventListener("click", () => {
      chips.forEach(b => b.setAttribute("data-on", "false"));
      setScore(20);
      setBubble(pick(baseBubbles));
    });
  }

  if (toneToggle) {
    toneToggle.addEventListener("click", () => {
      tone = (tone === "normal") ? "extra" : "normal";
      const pressed = tone === "extra";
      toneToggle.setAttribute("aria-pressed", String(pressed));
      toneToggle.textContent = tonePhrases[tone].label;
      setBubble(pick(baseBubbles));
    });
  }

  // Demo mood messages
  const demoMsg = $("#demoMsg");
  const demoFoot = $("#demoFoot");
  const moodBtns = $$(".mood-btn");
  const moodMap = {
    tired: {
      label: "つかれた",
      msg: "休める場所に来れたの、えらいよ。今日は“生きてる”だけで100点。"
    },
    anxious: {
      label: "不安",
      msg: "不安って、ちゃんと感じられてる証拠。今は深呼吸だけ一緒にしよ。"
    },
    okay: {
      label: "まあまあ",
      msg: "まあまあの日、実は強い。大きく落ちてないって、それだけで立派。"
    },
    good: {
      label: "元気",
      msg: "元気、いいね。今日は小さな“できた”を拾いにいこう。"
    }
  };

  function setMood(key){
    const m = moodMap[key] ?? moodMap.tired;
    if (demoMsg) demoMsg.textContent = m.msg;
    if (demoFoot) demoFoot.textContent = `選択: ${m.label}`;

    moodBtns.forEach(b => b.setAttribute("data-on", String(b.dataset.mood === key)));
  }

  // default
  setMood("tired");
  moodBtns.forEach(b => {
    b.addEventListener("click", () => setMood(b.dataset.mood));
  });

  // CTA form (fake submit)
  const form = $("#betaForm");
  const result = $("#formResult");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const email = String(fd.get("email") || "").trim();
      const mood = String(fd.get("mood") || "okay");
      if (!email) return;

      const m = moodMap[mood] ?? moodMap.okay;
      if (result) result.textContent = `登録ありがとう。${m.label}のあなたに合う言葉で迎えるね。`;
      form.reset();
    });
  }

  // Modal demo
  const modal = $("#modal");
  const openDemo = $("#openDemo");
  const closeModal = $("#closeModal");

  function openModal(){
    if (!modal) return;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function close(){
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (openDemo) openDemo.addEventListener("click", openModal);
  if (closeModal) closeModal.addEventListener("click", close);

  if (modal) {
    modal.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t instanceof HTMLElement && t.dataset.close === "true") close();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.getAttribute("aria-hidden") === "false") close();
  });
})();
