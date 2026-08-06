"use strict";


/* ========================================
   アルバムデータ
======================================== */

/*
  release：
  実際のリリース日。
  この日付を基準に新しい順へ並べる。

  registeredTracks：
  現在サイトに登録している曲数。

  totalTracks：
  アルバム全体の曲数。

  image：
  実際の画像ファイル名に合わせて変更する。
*/

const albums = [
  {
    title: "THIS & THAT",
    year: 2026,
    release: "2026.08.07",
    type: "Original Album",
    image:
      "images/albums/THISTHAT.jpg",
    url:
      "albums/THISTHAT.html",
      available: true,
    registeredTracks: 0,
    totalTracks: 8
  },

  {
    title: "SKZ-REPLAY 2026 Pt.1",
    year: 2026,
    release: "2026.08.01",
    type: "Original Album",
    image:
      "images/albums/SKZ-REPLAY1.jpg",
     /* ページ未作成 */
  url: "albums/SKZ-REPLAY1.html",
  available: false,

  registeredTracks: 0,
  totalTracks: 17
  },

  {
    title: "RUN IT",
    year: 2026,
    release: "2026.06.24",
    type: "Original Album",
    image:
      "images/albums/RUN IT.jpg",
    url:
      "albums/RUN-IT.html",
      available: true,
    registeredTracks: 1,
    totalTracks: 1
  },

  {
    title: "Endless Sun",
    year: 2026,
    release: "2026.03.13",
    type: "Original Album",
    image:
      "images/albums/Endless Sun.jpg",
    url:
      "albums/Endless-Sun.html",
      available: true,
    registeredTracks: 1,
    totalTracks: 1
  },

  {
    title: "STAY",
    year: 2026,
    release: "2026.03.25",
    type: "Original Album",
    image:
      "images/albums/STAY.jpg",
    url:
      "albums/STAY.html",
      available: true,
    registeredTracks: 1,
    totalTracks: 1
  },

  {
    title: "Do It(Remixes)",
    year: 2025,
    release: "2025.11.24",
    type: "Album",
    image:
      "images/albums/Do It(Remixes).jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 1,
    totalTracks: 6
  },
  {
    title: "Do It",
    year: 2025,
    release: "2025.11.21",
    type: "Album",
    image:
      "images/albums/album-Do It.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 3,
    totalTracks: 5
  },

  {
    title: "KARMA",
    year: 2025,
    release: "2025.08.22",
    type: "Studio Album",
    image:
      "images/albums/KARMA.png",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 11
  },

  {
    title: "Hollow",
    year: 2025,
    release: "2025.06.18",
    type: "Japanese Mini Album",
    image:
      "images/albums/Hollow.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 5
  },

  {
    title: "Mixtape : dominATE",
    year: 2025,
    release: "2025.03.21",
    type: "Mixtape",
    image:
      "images/albums/Mixtape dominATE.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 5
  },

  {
    title: "合 (HOP)",
    year: 2024,
    release: "2024.12.13",
    type: "SKZHOP HIPTAPE",
    image:
      "images/albums/合 (HOP).jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 12
  },

  {
    title: "GIANT",
    year: 2024,
    release: "2024.11.13",
    type: "Japanese Album",
    image:
      "images/albums/GIANT.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 10
  },

  {
    title: "ATE",
    year: 2024,
    release: "2024.07.19",
    type: "Mini Album",
    image:
      "images/albums/ATE.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 2,
    totalTracks: 8
  },

  {
    title: "樂-STAR",
    year: 2023,
    release: "2023.11.10",
    type: "Mini Album",
    image:
      "images/albums/ROCK-STAR.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 8
  },

  {
    title: "★★★★★ (5-STAR)",
    year: 2023,
    release: "2023.06.02",
    type: "Studio Album",
    image:
      "images/albums/5-STAR.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 12
  },

  {
    title: "THE SOUND",
    year: 2023,
    release: "2023.02.22",
    type: "Studio Album",
    image:
      "images/albums/THE SOUND.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 10
  },

  {
    title: "SKZ-REPLAY",
    year: 2022,
    release: "2022.12.21",
    type: "Studio Album",
    image:
      "images/albums/SKZ-REPLAY.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 25
  },

  {
    title: "MAXIDENT",
    year: 2022,
    release: "2022.10.07",
    type: "Mini Album",
    image:
      "images/albums/MAXIDENT.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 1,
    totalTracks: 8
  },

  {
    title: "ODDINARY",
    year: 2022,
    release: "2022.03.18",
    type: "Mini Album",
    image:
      "images/albums/ODDINARY.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 1,
    totalTracks: 7
  },

  {
    title: "SKZ2021",
    year: 2021,
    release: "2021.12.23",
    type: "Special Album",
    image:
      "images/albums/SKZ2021.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 14
  },

  {
    title: "Christmas EveL",
    year: 2021,
    release: "2021.11.29",
    type: "Special Album",
    image:
      "images/albums/Christmas EveL.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 4
  },

  {
    title: "NOEASY",
    year: 2021,
    release: "2021.08.23",
    type: "Studio Album",
    image:
      "images/albums/NOEASY.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 14
  },

  {
    title: "IN LIFE",
    year: 2020,
    release: "2020.09.14",
    type: "Repackage Album",
    image:
      "images/albums/IN LIFE.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 17
  },

  {
    title: "GO LIVE",
    year: 2020,
    release: "2020.06.17",
    type: "Studio Album",
    image:
      "images/albums/GO LIVE.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 14
  },

  {
    title: "Clé : LEVANTER",
    year: 2019,
    release: "2019.12.09",
    type: "Mini Album",
    image:
      "images/albums/Cle LEVANTER.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 8
  },

  {
    title: "Clé 2 : Yellow Wood",
    year: 2019,
    release: "2019.06.19",
    type: "Special Album",
    image:
      "images/albums/Cle 2 Yellow Wood.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 7
  },

  {
    title: "Clé 1 : MIROH",
    year: 2019,
    release: "2019.03.25",
    type: "Mini Album",
    image:
      "images/albums/Cle 1 MIROH.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 8
  },

  {
    title: "I am YOU",
    year: 2018,
    release: "2018.10.22",
    type: "Mini Album",
    image:
      "images/albums/I am YOU.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 8
  },

  {
    title: "I am WHO",
    year: 2018,
    release: "2018.08.06",
    type: "Mini Album",
    image:
      "images/albums/I am WHO.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    totalTracks: 8
  },

  {
    title: "I am NOT",
    year: 2018,
    release: "2018.03.26",
    type: "Mini Album",
    image:
      "images/albums/I am NOT.jpg",
     /* ページ未作成 */
  url: "",
  available: false,
    registeredTracks: 0,
    totalTracks: 7
  }
];


/* ========================================
   DOM
======================================== */

const albumsLoader =
  document.getElementById(
    "albumsLoader"
  );

const albumsLoaderProgress =
  document.getElementById(
    "albumsLoaderProgress"
  );

const albumsLoaderPercent =
  document.getElementById(
    "albumsLoaderPercent"
  );

const albumsLoaderMessage =
  document.getElementById(
    "albumsLoaderMessage"
  );

const albumsMenuButton =
  document.getElementById(
    "albumsMenuButton"
  );

const albumsNav =
  document.getElementById(
    "albumsNav"
  );

const albumsPointerGlow =
  document.getElementById(
    "albumsPointerGlow"
  );

const albumSearch =
  document.getElementById(
    "albumSearch"
  );

const clearAlbumSearch =
  document.getElementById(
    "clearAlbumSearch"
  );

const albumYearButtons =
  document.querySelectorAll(
    ".album-year-button"
  );

const timelineButtons =
  document.querySelectorAll(
    "[data-timeline-year]"
  );

const albumGrid =
  document.getElementById(
    "albumGrid"
  );

const albumResultCount =
  document.getElementById(
    "albumResultCount"
  );

const albumsHeroCount =
  document.getElementById(
    "albumsHeroCount"
  );

const archiveLatestYear =
  document.getElementById(
    "archiveLatestYear"
  );

const archiveOldestYear =
  document.getElementById(
    "archiveOldestYear"
  );

const activeAlbumKeyword =
  document.getElementById(
    "activeAlbumKeyword"
  );

const activeAlbumYear =
  document.getElementById(
    "activeAlbumYear"
  );

const resetAlbumSearchButton =
  document.getElementById(
    "resetAlbumSearch"
  );

const albumNoResults =
  document.getElementById(
    "albumNoResults"
  );

const albumNoResultsReset =
  document.getElementById(
    "albumNoResultsReset"
  );

const albumsPageTop =
  document.getElementById(
    "albumsPageTop"
  );


/* ========================================
   現在の状態
======================================== */

let selectedYear = "all";


/* ========================================
   HTMLエスケープ
======================================== */

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* ========================================
   検索用の文字変換
======================================== */

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKC")
    .trim();
}


/* ========================================
   日付変換
======================================== */

function parseAlbumDate(value) {
  const normalized =
    String(value ?? "")
      .replaceAll(".", "-")
      .replaceAll("/", "-");

  const time =
    new Date(
      `${normalized}T00:00:00`
    ).getTime();

  if (Number.isNaN(time)) {
    return 0;
  }

  return time;
}


/* ========================================
   アルバムを最新順にする
======================================== */

function getSortedAlbums(
  albumList = albums
) {
  return [...albumList]
    .sort((first, second) => {
      return (
        parseAlbumDate(
          second.release
        ) -
        parseAlbumDate(
          first.release
        )
      );
    });
}


/* ========================================
   アルバムカード作成
======================================== */

function renderAlbums(albumList) {
  if (!albumGrid) {
    return;
  }

  albumGrid.innerHTML = "";

  if (albumResultCount) {
    albumResultCount.textContent =
      `${String(albumList.length)
        .padStart(2, "0")} FILES`;
  }

  /*
    ヒーローには全アルバム数を表示
  */
  if (albumsHeroCount) {
    albumsHeroCount.textContent =
      String(albums.length)
        .padStart(3, "0");
  }

  if (albumNoResults) {
    albumNoResults.hidden =
      albumList.length !== 0;
  }

  albumList.forEach(
    (album, index) => {
      const card =
        document.createElement("a");

      card.className =
        "album-file-card";

      card.href =
        album.url || "#";

      const registered =
        Number(
          album.registeredTracks || 0
        );

      const total =
        Number(
          album.totalTracks || 0
        );

      card.innerHTML = `
        <div class="album-cover-wrap">

          <img
            class="album-cover"
            src="${escapeHtml(album.image)}"
            alt="${escapeHtml(album.title)}"
            loading="lazy"
          >

          <span class="album-file-number">
            ARCHIVE-${String(index + 1)
              .padStart(2, "0")}
          </span>

          <span class="album-year-badge">
            ${escapeHtml(album.year)}
          </span>

        </div>

        <div class="album-card-content">

          <p class="album-card-label">
            ${escapeHtml(album.type)}
          </p>

          <h3 class="album-title">
            ${escapeHtml(album.title)}
          </h3>

          <p class="album-release">
            RELEASED /
            ${escapeHtml(album.release)}
          </p>

          <div class="album-track-status">

            <span>REGISTERED</span>

            <strong>
              ${String(registered)
                .padStart(2, "0")}
              /
              ${String(total)
                .padStart(2, "0")}
            </strong>

          </div>

          <span class="album-open">
            OPEN ARCHIVE
            <span>→</span>
          </span>

        </div>
      `;

      albumGrid.appendChild(card);
    }
  );
}


/* ========================================
   検索・年代絞り込み
======================================== */

function filterAlbums() {
  const keyword =
    normalizeText(
      albumSearch
        ? albumSearch.value
        : ""
    );

  const filtered =
    getSortedAlbums()
      .filter((album) => {
        const searchableText =
          normalizeText([
            album.title,
            album.year,
            album.release,
            album.type
          ].join(" "));

        const matchesKeyword =
          searchableText.includes(
            keyword
          );

        const matchesYear =
          selectedYear === "all" ||
          String(album.year) ===
            selectedYear;

        return (
          matchesKeyword &&
          matchesYear
        );
      });

  renderAlbums(filtered);

  updateAlbumStatus(keyword);

  updateClearAlbumButton();

  updateYearButtons();
}


/* ========================================
   現在の検索状態
======================================== */

function updateAlbumStatus(keyword) {
  if (activeAlbumKeyword) {
    activeAlbumKeyword.textContent =
      keyword && albumSearch
        ? `"${albumSearch.value.trim()}"`
        : "ALL ALBUMS";
  }

  if (activeAlbumYear) {
    activeAlbumYear.textContent =
      selectedYear === "all"
        ? "ALL YEARS"
        : selectedYear;
  }
}


/* ========================================
   検索欄
======================================== */

albumSearch?.addEventListener(
  "input",
  filterAlbums
);


albumSearch?.addEventListener(
  "keydown",
  (event) => {
    if (event.key !== "Escape") {
      return;
    }

    clearAlbumKeyword();
  }
);


function clearAlbumKeyword() {
  if (!albumSearch) {
    return;
  }

  albumSearch.value = "";

  filterAlbums();

  albumSearch.focus();
}


clearAlbumSearch?.addEventListener(
  "click",
  clearAlbumKeyword
);


function updateClearAlbumButton() {
  if (
    !clearAlbumSearch ||
    !albumSearch
  ) {
    return;
  }

  clearAlbumSearch.hidden =
    albumSearch.value.length === 0;
}


/* ========================================
   年代ボタン
======================================== */

albumYearButtons.forEach(
  (button) => {
    button.addEventListener(
      "click",
      () => {
        selectedYear =
          button.dataset.year ||
          "all";

        filterAlbums();
      }
    );
  }
);


function updateYearButtons() {
  albumYearButtons.forEach(
    (button) => {
      button.classList.toggle(
        "active",
        button.dataset.year ===
          selectedYear
      );
    }
  );

  timelineButtons.forEach(
    (button) => {
      button.classList.toggle(
        "active",
        button.dataset.timelineYear ===
          selectedYear
      );
    }
  );
}


/* ========================================
   タイムライン
======================================== */

timelineButtons.forEach(
  (button) => {
    button.addEventListener(
      "click",
      () => {
        selectedYear =
          button.dataset.timelineYear ||
          "all";

        filterAlbums();

        const database =
          document.getElementById(
            "albumDatabase"
          );

        if (!database) {
          return;
        }

        const headerHeight =
          document.querySelector(
            ".site-header"
          )?.offsetHeight || 72;

        const targetTop =
          database
            .getBoundingClientRect()
            .top +
          window.scrollY -
          headerHeight -
          20;

        window.scrollTo({
          top: targetTop,
          behavior: "smooth"
        });
      }
    );
  }
);


/* ========================================
   全リセット
======================================== */

function resetAlbumFilters() {
  selectedYear = "all";

  if (albumSearch) {
    albumSearch.value = "";
  }

  filterAlbums();
}


resetAlbumSearchButton
  ?.addEventListener(
    "click",
    resetAlbumFilters
  );


albumNoResultsReset
  ?.addEventListener(
    "click",
    resetAlbumFilters
  );


/* ========================================
   ヒーローの年代範囲
======================================== */

function updateArchiveYears() {
  const years =
    albums
      .map((album) => {
        return Number(album.year);
      })
      .filter((year) => {
        return Number.isFinite(year);
      });

  if (years.length === 0) {
    return;
  }

  const latestYear =
    Math.max(...years);

  const oldestYear =
    Math.min(...years);

  if (archiveLatestYear) {
    archiveLatestYear.textContent =
      String(latestYear);
  }

  if (archiveOldestYear) {
    archiveOldestYear.textContent =
      String(oldestYear);
  }
}


/* ========================================
   URLの検索ワードを読み込む
======================================== */

function loadAlbumUrlParameters() {
  const parameters =
    new URLSearchParams(
      window.location.search
    );

  const keyword =
    parameters.get("keyword");

  const year =
    parameters.get("year");

  if (
    keyword &&
    albumSearch
  ) {
    albumSearch.value =
      keyword;
  }

  if (
    year &&
    (
      year === "all" ||
      /^\d{4}$/.test(year)
    )
  ) {
    selectedYear =
      year;
  }
}


/* ========================================
   起動画面
======================================== */

function runAlbumsLoader() {
  if (
    !albumsLoader ||
    !albumsLoaderProgress ||
    !albumsLoaderPercent ||
    !albumsLoaderMessage
  ) {
    return;
  }

  let progress = 0;

  const messages = [
    "ACCESSING ALBUM DATABASE...",
    "READING ARCHIVE FILES...",
    "SORTING RELEASE DATA...",
    "ALBUM ARCHIVE READY."
  ];

  const timer =
    window.setInterval(() => {
      progress +=
        Math.floor(
          Math.random() * 14
        ) + 6;

      progress =
        Math.min(
          progress,
          100
        );

      albumsLoaderProgress.style.width =
        `${progress}%`;

      albumsLoaderPercent.textContent =
        `${progress}%`;

      if (progress < 34) {
        albumsLoaderMessage.textContent =
          messages[0];

      } else if (progress < 65) {
        albumsLoaderMessage.textContent =
          messages[1];

      } else if (progress < 94) {
        albumsLoaderMessage.textContent =
          messages[2];

      } else {
        albumsLoaderMessage.textContent =
          messages[3];
      }

      if (progress === 100) {
        window.clearInterval(timer);

        window.setTimeout(() => {
          albumsLoader.classList.add(
            "is-hidden"
          );
        }, 350);
      }
    }, 80);
}


/* ========================================
   メニュー
======================================== */

function closeAlbumsMenu() {
  if (
    !albumsNav ||
    !albumsMenuButton
  ) {
    return;
  }

  albumsNav.classList.remove(
    "is-open"
  );

  albumsMenuButton.classList.remove(
    "is-active"
  );

  albumsMenuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  albumsMenuButton.setAttribute(
    "aria-label",
    "メニューを開く"
  );

  document.body.classList.remove(
    "menu-open"
  );
}


function toggleAlbumsMenu() {
  if (
    !albumsNav ||
    !albumsMenuButton
  ) {
    return;
  }

  const isOpen =
    albumsNav.classList.toggle(
      "is-open"
    );

  albumsMenuButton.classList.toggle(
    "is-active",
    isOpen
  );

  albumsMenuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  albumsMenuButton.setAttribute(
    "aria-label",
    isOpen
      ? "メニューを閉じる"
      : "メニューを開く"
  );

  document.body.classList.toggle(
    "menu-open",
    isOpen
  );
}


albumsMenuButton
  ?.addEventListener(
    "click",
    toggleAlbumsMenu
  );


albumsNav
  ?.querySelectorAll("a")
  .forEach((link) => {
    link.addEventListener(
      "click",
      closeAlbumsMenu
    );
  });


document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Escape") {
      closeAlbumsMenu();
    }
  }
);


/* ========================================
   Reveal
======================================== */

function activateAlbumsReveal() {
  const revealItems =
    document.querySelectorAll(
      ".reveal"
    );

  if (
    !(
      "IntersectionObserver"
      in window
    )
  ) {
    revealItems.forEach((item) => {
      item.classList.add(
        "is-visible"
      );
    });

    return;
  }

  const observer =
    new IntersectionObserver(
      (
        entries,
        currentObserver
      ) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "is-visible"
          );

          currentObserver.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.1,
        rootMargin:
          "0px 0px -40px 0px"
      }
    );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
}


/* ========================================
   マウス発光
======================================== */

window.addEventListener(
  "pointermove",
  (event) => {
    if (!albumsPointerGlow) {
      return;
    }

    albumsPointerGlow.style.left =
      `${event.clientX}px`;

    albumsPointerGlow.style.top =
      `${event.clientY}px`;
  }
);


/* ========================================
   ページトップ
======================================== */

function updateAlbumsPageTop() {
  if (!albumsPageTop) {
    return;
  }

  albumsPageTop.classList.toggle(
    "is-visible",
    window.scrollY > 700
  );
}


window.addEventListener(
  "scroll",
  updateAlbumsPageTop,
  {
    passive: true
  }
);


albumsPageTop?.addEventListener(
  "click",
  () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
);


/* ========================================
   画像読み込みエラー
======================================== */

function activateAlbumImageFallback() {
  if (!albumGrid) {
    return;
  }

  albumGrid.addEventListener(
    "error",
    (event) => {
      const image =
        event.target;

      if (
        !(image instanceof HTMLImageElement)
      ) {
        return;
      }

      if (
        !image.classList.contains(
          "album-cover"
        )
      ) {
        return;
      }

      image.classList.add(
        "image-error"
      );

      /*
        同じ画像を読み込み続けないため
        srcは変更しない。
      */
      image.alt =
        `${image.alt} IMAGE NOT FOUND`;
    },
    true
  );
}


/* ========================================
   初期化
======================================== */

function initAlbumsPage() {
  runAlbumsLoader();

  loadAlbumUrlParameters();

  updateArchiveYears();

  filterAlbums();

  activateAlbumsReveal();

  activateAlbumImageFallback();

  updateAlbumsPageTop();
}


if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initAlbumsPage
  );
} else {
  initAlbumsPage();
}
function renderAlbumCards(albumList) {
  albumGrid.innerHTML = "";

  albumList.forEach((album, index) => {
    const isAvailable =
      album.available === true &&
      Boolean(album.url);

    const card =
      document.createElement(
        isAvailable ? "a" : "article"
      );

    card.className = isAvailable
      ? "album-file-card"
      : "album-file-card is-coming-soon";

    if (isAvailable) {
      card.href = album.url;
    } else {
      card.setAttribute(
        "aria-disabled",
        "true"
      );
    }

    card.innerHTML = `
      <div class="album-file-image-wrap">

        <span class="album-file-number">
          ARCHIVE-${String(index + 1).padStart(2, "0")}
        </span>

        <img
          class="album-file-image"
          src="${escapeHtml(album.image)}"
          alt="${escapeHtml(album.title)}"
          loading="lazy"
        >

        <span class="album-file-year">
          ${escapeHtml(album.year)}
        </span>

        ${
          !isAvailable
            ? `
              <div class="album-coming-overlay">
                <span>FILE LOCKED</span>
                <strong>COMING SOON</strong>
              </div>
            `
            : ""
        }

      </div>

      <div class="album-file-content">

        <p class="album-file-type">
          ${escapeHtml(album.type)}
        </p>

        <h3>
          ${escapeHtml(album.title)}
        </h3>

        <p class="album-file-release">
          RELEASED / ${escapeHtml(album.release)}
        </p>

        <p class="album-file-count">
          REGISTERED
          <strong>
            ${String(album.registeredTracks).padStart(2, "0")}
            /
            ${String(album.totalTracks).padStart(2, "0")}
          </strong>
        </p>

        <div class="album-file-open">
          <span>
            ${
              isAvailable
                ? "OPEN ARCHIVE"
                : "ARCHIVE LOCKED"
            }
          </span>

          <span>
            ${isAvailable ? "→" : "×"}
          </span>
        </div>

      </div>
    `;

    albumGrid.appendChild(card);
  });
}