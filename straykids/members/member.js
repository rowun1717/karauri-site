// =====================
// 共通：ハンバーガーメニュー
// =====================

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const menu = document.getElementById("menu");

if (menuBtn && closeBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.add("open");
  });

  closeBtn.addEventListener("click", () => {
    menu.classList.remove("open");
  });

  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });
}


// =====================
// 検索ページ用
// =====================

const searchInput = document.getElementById("searchInput");
const searchType = document.getElementById("searchType");
const searchCards = document.querySelectorAll(".song-card");

function searchSongs() {
  if (!searchInput || !searchType) return;

  const keyword = searchInput.value.toLowerCase().trim();
  const type = searchType.value;

  searchCards.forEach((card) => {
    if (keyword === "") {
      card.style.display = "none";
      return;
    }

    let targetText = "";

    if (type === "title") {
      targetText = card.dataset.title || "";
    } else if (type === "album") {
      targetText = card.dataset.album || "";
    } else if (type === "member") {
      targetText = card.dataset.member || "";
    } else if (type === "lyrics") {
      targetText = card.dataset.lyrics || "";
    } else {
      targetText = `
        ${card.dataset.title || ""}
        ${card.dataset.album || ""}
        ${card.dataset.member || ""}
        ${card.dataset.lyrics || ""}
      `;
    }

    card.style.display = targetText.toLowerCase().includes(keyword) ? "" : "none";
  });
}

if (searchInput && searchType) {
  searchInput.addEventListener("input", searchSongs);
  searchType.addEventListener("change", searchSongs);
  searchSongs();
}


// =====================
// トップページ用：ページネーション
// =====================

const pagination = document.getElementById("pagination");
const perPage = 10;
let currentPage = 1;

const isSearchPage = Boolean(searchInput && searchType);
const pageCards = Array.from(document.querySelectorAll(".song-card"));

function showPage(page) {
  if (!pagination || isSearchPage) return;

  currentPage = page;

  pageCards.forEach((card) => {
    card.style.display = "none";
  });

  const start = (page - 1) * perPage;
  const end = start + perPage;

  pageCards.slice(start, end).forEach((card) => {
    card.style.display = "";
  });

  makePagination();
}

function makePagination() {
  if (!pagination || isSearchPage) return;

  const totalPages = Math.ceil(pageCards.length / perPage);
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;

    if (i === currentPage) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      showPage(i);
    });

    pagination.appendChild(button);
  }
}

if (pagination && !isSearchPage) {
  showPage(1);
}


// =====================
// members.html：SKZOO箱のカーソル連動
// =====================

const clawMachine = document.querySelector(".claw-machine");
const dolls = document.querySelectorAll(".skzoo-doll");

if (clawMachine && dolls.length > 0) {
  clawMachine.addEventListener("mousemove", (e) => {
    const rect = clawMachine.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    dolls.forEach((doll, index) => {
      const power = (index + 1) * 3;
      doll.style.translate = `${x * power}px ${y * power}px`;
    });
  });

  clawMachine.addEventListener("mouseleave", () => {
    dolls.forEach((doll) => {
      doll.style.translate = "0 0";
    });
  });
}


// =====================
// 個別ページ：SKZOO自動ゆらゆら
// =====================

const profileSkzoo = document.querySelector(".skzoo-profile img");

if (profileSkzoo) {
  let angle = 0;

  setInterval(() => {
    angle += 0.05;

    const y = Math.sin(angle) * 8;
    const rotate = Math.sin(angle) * 6;

    profileSkzoo.style.transform =
      `translateY(${y}px) rotate(${rotate}deg)`;
  }, 30);
}