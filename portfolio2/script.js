// ===== Utilities =====
const $ = (sel, parent = document) => parent.querySelector(sel);

// ===== Sticky header elevation =====
const header = $(".header");
window.addEventListener("scroll", () => {
  header?.setAttribute("data-elevate", window.scrollY > 8 ? "true" : "false");
});

// ===== Mobile nav toggle =====
const navToggle = $("#navToggle");
const navMenu = $("#navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // close when clicking a link
  navMenu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });

  // close when clicking outside
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const clickedInside = navMenu.contains(t) || navToggle.contains(t);
    if (!clickedInside) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ===== Active nav link while scrolling =====
const sections = ["top", "about", "works", "links"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navLinks = Array.from(document.querySelectorAll(".nav__link"));

const setActive = (hash) => {
  navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === hash));
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    setActive("#" + visible.target.id);
  },
  { root: null, threshold: [0.25, 0.4, 0.6] }
);

sections.forEach((sec) => observer.observe(sec));

// ===== Footer year =====
const year = $("#year");
if (year) year.textContent = String(new Date().getFullYear());


// ===== Works filter (safe) =====
(() => {
  const grid = document.getElementById("worksGrid");
  if (!grid) return;

  const filters = document.querySelectorAll(".filter");
  const cards = grid.querySelectorAll(".wCard");
  const empty = document.getElementById("worksEmpty");

  function apply(filter) {
    let visible = 0;
    cards.forEach(card => {
      const cat = card.getAttribute("data-cat");
      const show = (filter === "all") || (cat === filter);
      card.hidden = !show;
      if (show) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  }

  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      apply(btn.dataset.filter || "all");
    });
  });

  apply("all");
})();

// 画像クリックで拡大（dialog）
const flyerImg = document.querySelector(".flyer img");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");

if (flyerImg && modal && modalImg) {
  flyerImg.addEventListener("click", () => {
    modalImg.src = flyerImg.src;
    modalImg.alt = flyerImg.alt;
    modal.showModal();
  });

  modalClose?.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    // 背景クリックで閉じる
    const rect = modalImg.getBoundingClientRect();
    const inImg =
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inImg) modal.close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.open) modal.close();
  });
}

// ===== Contact: apply estimate to form (robust) =====
(() => {
  const btn = document.getElementById("applyEstimate");
  if (!btn) return; // contact.html以外では何もしない

  const reqType = document.getElementById("reqType");
  const budget  = document.getElementById("budget");
  const msg     = document.querySelector('textarea[name="message"]');

  const estType  = document.getElementById("estType");
  const estScale = document.getElementById("estScale");
  const estPrice = document.getElementById("estPrice");

  function budgetFromText(text){
    if (!text) return "";
    if (text.includes("5,000") && text.includes("10,000")) return "5-10";
    if (text.includes("15,000") && text.includes("30,000")) return "15-30";
    if (text.includes("30,000")) return "30plus";
    return "";
  }

  btn.addEventListener("click", () => {
    // 相談種別
    if (reqType && estType) reqType.value = estType.value;

    // 予算
    const priceText = estPrice ? estPrice.textContent : "";
    if (budget) budget.value = budgetFromText(priceText);

    // 内容に追記
    if (msg) {
      const t =
        estType?.value === "web" ? "ホームページ" :
        estType?.value === "print" ? "チラシ / メニュー表" :
        estType?.value === "writing" ? "執筆" : "その他";

      const scale =
        estScale?.value === "simple" ? "シンプル" :
        estScale?.value === "multi" ? "複数ページ/中" :
        estScale?.value === "world" ? "世界観設計あり" : "";

      const add =
`\n\n---\n【簡単見積もり反映】\n制作内容：${t}\n規模：${scale}\n目安：${priceText}\n`;

      if (!msg.value.includes("【簡単見積もり反映】")) msg.value += add;
    }

    // 反映したことが分かるように軽く通知（任意）
    btn.textContent = "反映しました ✓";
    setTimeout(() => (btn.textContent = "この内容をフォームに反映"), 1200);
  });

  // 例文ボタン
  const fill = document.getElementById("fillSample");
  const note = document.getElementById("formNote");
  if (fill && msg) {
    fill.addEventListener("click", () => {
      msg.value =
`【相談内容】
例：ポートフォリオサイトを作りたいです（3〜5ページ想定）。
世界観は夜×うさぎ×ふわふわ。参考サイトURLがあれば貼ります。

【用意できるもの】
ロゴ：あり/なし
文章：あり/なし
画像：あり/なし

【希望】
納期：○月中
予算：未定（目安が知りたい）`;
      if (note) note.textContent = "例文を入れました。必要に合わせて書き換えてね。";
    });
  }

  compute();
})();
