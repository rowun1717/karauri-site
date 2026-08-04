"use strict";


/* ========================================
   曲データ
======================================== */

/*
  release：
  実際のリリース日を書く。
  ALLはこの日付が新しい順になる。

  karaoke：
  対応しているサービスを書く。
  例 ["JOYSOUND", "DAM"]

  category：
  通常曲は "group"
  ユニット曲は "unit"
  ソロ曲は "solo"
*/

const songs = [
  {
    title: "Endless Sun",
    album: "Endless Sun",
    type: "Original Song",
    release: "2026.03.13",
    image: "images/song/Endless Sun.jpg",
    url: "songs/Endless Sun.html",
    karaoke: [
      "JOYSOUND",
      "DAM"
    ],
    category: "group",
    members: [
      "bangchan",
      "leeknow",
      "changbin",
      "hyunjin",
      "han",
      "felix",
      "seungmin",
      "in"
    ]
  },

  {
    title: "RUN IT",
    album: "RUN IT",
    type: "Original Song",
    release: "2026.06.24",
    image: "images/song/RUN IT.jpg",
    url: "song/RUN IT.html",
    karaoke: [
      "JOYSOUND"
    ],
    category: "group",
    members: [
      "bangchan",
      "leeknow",
      "changbin",
      "hyunjin",
      "han",
      "felix",
      "seungmin",
      "in"
    ]
  },

  {
    title: "STAY",
    album: "STAY",
    type: "Original Song",
    release: "2026.07.09",
    image: "images/albums/STAY.jpg",
    url: "song/STAY.html",
    karaoke: [
      "JOYSOUND",
      "DAM"
    ],
    category: "group",
    members: [
      "bangchan",
      "leeknow",
      "changbin",
      "hyunjin",
      "han",
      "felix",
      "seungmin",
      "in"
    ]
  },

  {
    title: "back to life",
    album: "back to life",
    type: "Solo Song",
    release: "2026.06.29",
    image: "images/albums/back to life.jpg",
    url: "song/back to life.html",
    karaoke: [
      "JOYSOUND"
    ],
    category: "solo",
    members: [
      "bangchan"
    ]
  },

  {
    title: "JJAM",
    album: "ATE",
    type: "Original Song",
    release: "2024.07.19",
    image: "images/song/JJAM.jpg",
    url: "song/JJAM.html",
    karaoke: [
      "JOYSOUND",
      "DAM"
    ],
    category: "group",
    members: [
      "bangchan",
      "leeknow",
      "changbin",
      "hyunjin",
      "han",
      "felix",
      "seungmin",
      "in"
    ]
  },

  {
    title: "I Like It",
    album: "ATE",
    type: "Original Song",
    release: "2024.07.19",
    track: 7,
    image: "images/song/I Like It.jpg",
    url: "song/I Like It.html",
    karaoke: [
      "JOYSOUND",
      "DAM"
    ],
    category: "group",
    members: [
      "bangchan",
      "leeknow",
      "changbin",
      "hyunjin",
      "han",
      "felix",
      "seungmin",
      "in"
    ]
  },

  {
    title: "MANIAC",
    album: "ODDINARY",
    type: "Original Song",
    release: "2022.03.18",
    image: "images/song/MANIAC.jpg",
    url: "song/MANIAC.html",
    karaoke: [
      "JOYSOUND",
      "DAM"
    ],
    category: "group",
    members: [
      "bangchan",
      "leeknow",
      "changbin",
      "hyunjin",
      "han",
      "felix",
      "seungmin",
      "in"
    ]
  },

  {
    title: "CASE 143",
    album: "MAXIDENT",
    type: "Original Song",
    release: "2022.10.07",
    image: "images/song/CASE143.jpg",
    url: "song/CASE 143.html",
    karaoke: [
      "JOYSOUND",
      "DAM"
    ],
    category: "group",
    members: [
      "bangchan",
      "leeknow",
      "changbin",
      "hyunjin",
      "han",
      "felix",
      "seungmin",
      "in"
    ]
  },

  {
    title: "Do It",
    album: "Do It",
    type: "Original Song",
    release: "2025.11.21",
    image: "images/song/Do It.jpg",
    url: "song/Do It.html",
    karaoke: [
      "JOYSOUND"
    ],
    category: "group",
    members: [
      "bangchan",
      "leeknow",
      "changbin",
      "hyunjin",
      "han",
      "felix",
      "seungmin",
      "in"
    ]
  },

  {
    title: "DIVINE",
    album: "Do It",
    type: "Original Song",
    release: "2025.11.21",
    track: 2,
    image: "images/song/DIVINE.jpg",
    url: "song/DIVINE.html",
    karaoke: [],
    category: "group",
    members: [
      "bangchan",
      "leeknow",
      "changbin",
      "hyunjin",
      "han",
      "felix",
      "seungmin",
      "in"
    ]
  },

  {
    title: "Holiday",
    album: "Do It",
    type: "Original Song",
    release: "2025.11.21",
    track: 3,
    image: "images/albums/album-Do It.jpg",
    url: "song/Holiday.html",
    karaoke: [],
    category: "group",
    members: [
      "bangchan",
      "leeknow",
      "changbin",
      "hyunjin",
      "han",
      "felix",
      "seungmin",
      "in"
    ]
  }
];


/* ========================================
   DOM
======================================== */

const searchLoader =
  document.getElementById(
    "searchLoader"
  );

const searchLoaderProgress =
  document.getElementById(
    "searchLoaderProgress"
  );

const searchLoaderPercent =
  document.getElementById(
    "searchLoaderPercent"
  );

const searchLoaderMessage =
  document.getElementById(
    "searchLoaderMessage"
  );

const searchMenuButton =
  document.getElementById(
    "searchMenuButton"
  );

const searchNav =
  document.getElementById(
    "searchNav"
  );

const songSearch =
  document.getElementById(
    "songSearch"
  );

const clearSearchButton =
  document.getElementById(
    "clearSearchButton"
  );

const quickKeywords =
  document.getElementById(
    "quickKeywords"
  );

const filterButtons =
  document.querySelectorAll(
    ".search-filter-button"
  );

const songGrid =
  document.getElementById(
    "songGrid"
  );

const resultCount =
  document.getElementById(
    "resultCount"
  );

const searchHeroCount =
  document.getElementById(
    "searchHeroCount"
  );

const activeKeyword =
  document.getElementById(
    "activeKeyword"
  );

const activeFilterName =
  document.getElementById(
    "activeFilterName"
  );

const resetSearchButton =
  document.getElementById(
    "resetSearchButton"
  );

const noResults =
  document.getElementById(
    "noResults"
  );

const noResultsResetButton =
  document.getElementById(
    "noResultsResetButton"
  );

const searchPointerGlow =
  document.getElementById(
    "searchPointerGlow"
  );

const searchPageTop =
  document.getElementById(
    "searchPageTop"
  );


/* ========================================
   現在の状態
======================================== */

let activeFilter = "all";


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
   文字の検索用変換
======================================== */

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKC")
    .trim();
}


/* ========================================
   日付を比較できる形に変換
======================================== */

function parseReleaseDate(value) {
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
   最新曲順
======================================== */

function getSortedSongs(songList = songs) {
  return [...songList]
    .sort((a, b) => {
      const dateDifference =
        parseReleaseDate(b.release) -
        parseReleaseDate(a.release);

      if (dateDifference !== 0) {
        return dateDifference;
      }

      /*
        同じアルバム・同じ発売日の場合は
        トラック順にする
      */
      const trackA =
        Number(a.track ?? 999);

      const trackB =
        Number(b.track ?? 999);

      return trackA - trackB;
    });
}


/* ========================================
   ランダム並び替え
======================================== */

function shuffleSongs(songList) {
  const shuffled = [...songList];

  for (
    let index = shuffled.length - 1;
    index > 0;
    index--
  ) {
    const randomIndex =
      Math.floor(
        Math.random() *
        (index + 1)
      );

    [
      shuffled[index],
      shuffled[randomIndex]
    ] = [
      shuffled[randomIndex],
      shuffled[index]
    ];
  }

  return shuffled;
}


/* ========================================
   タグ作成
======================================== */

function createTags(song) {
  const tags = [];

  if (song.type) {
    tags.push(`
      <span class="data-tag">
        ${escapeHtml(song.type)}
      </span>
    `);
  }

  if (song.album) {
    tags.push(`
      <span class="data-tag">
        ${escapeHtml(song.album)}
      </span>
    `);
  }

  const karaoke =
    Array.isArray(song.karaoke)
      ? song.karaoke
      : [];

  karaoke.forEach((service) => {
    const serviceClass =
      normalizeText(service);

    tags.push(`
      <span
        class="data-tag service ${escapeHtml(serviceClass)}"
      >
        ${escapeHtml(service)}
      </span>
    `);
  });

  return tags.join("");
}


/* ========================================
   曲カード表示
======================================== */

function renderSongs(songList) {
  if (!songGrid) {
    return;
  }

  /*
    ここでは並び替えをしない。
    渡された順番のまま表示することで
    RANDOMの順番を守る。
  */
  songGrid.innerHTML = "";

  if (resultCount) {
    resultCount.textContent =
      `${String(songList.length)
        .padStart(2, "0")} FILES`;
  }

  if (searchHeroCount) {
    searchHeroCount.textContent =
      String(songList.length)
        .padStart(3, "0");
  }

  if (noResults) {
    noResults.hidden =
      songList.length !== 0;
  }

  songList.forEach((song, index) => {
    const card =
      document.createElement("a");

    card.className =
      "song-card reveal is-visible";

    card.href =
      song.url || "#";

    card.innerHTML = `
      <img
        class="song-image"
        src="${escapeHtml(song.image)}"
        alt="${escapeHtml(song.title)}"
        loading="lazy"
      >

      <div class="song-content">

        <span class="song-file-number">
          FILE-${String(index + 1)
            .padStart(3, "0")}
        </span>

        <div class="song-tags">
          ${createTags(song)}
        </div>

        <h3 class="song-title">
          ${escapeHtml(song.title)}
        </h3>

        <p class="song-meta">
          RELEASED /
          ${escapeHtml(song.release)}
        </p>

        <span class="song-open">
          OPEN FILE
          <span>→</span>
        </span>

      </div>
    `;

    songGrid.appendChild(card);
  });
}


/* ========================================
   曲の検索・フィルター
======================================== */

function filterSongs(options = {}) {
  const {
    reshuffle = false
  } = options;

  const keyword =
    normalizeText(
      songSearch
        ? songSearch.value
        : ""
    );

  /*
    最初に検索ワードと
    カテゴリーで絞り込む
  */
  let filtered =
    songs.filter((song) => {
      const members =
        Array.isArray(song.members)
          ? song.members
          : [];

      const karaoke =
        Array.isArray(song.karaoke)
          ? song.karaoke
          : [];

      const searchableText =
        normalizeText([
          song.title,
          song.album,
          song.type,
          song.release,
          song.category,
          ...members,
          ...karaoke
        ].join(" "));

      const matchesKeyword =
        searchableText.includes(
          keyword
        );

      if (!matchesKeyword) {
        return false;
      }


      /*
        ALLとRANDOMは全曲対象
      */
      if (
        activeFilter === "all" ||
        activeFilter === "random"
      ) {
        return true;
      }


      /*
        JOYSOUND対応曲
      */
      if (
        activeFilter === "joysound"
      ) {
        return karaoke.some(
          (service) => {
            return (
              normalizeText(service) ===
              "joysound"
            );
          }
        );
      }


      /*
        DAM対応曲
      */
      if (
        activeFilter === "dam"
      ) {
        return karaoke.some(
          (service) => {
            return (
              normalizeText(service) ===
              "dam"
            );
          }
        );
      }


      /*
        ユニット・ソロ曲
      */
      if (
        activeFilter === "unit"
      ) {
        const category =
          normalizeText(
            song.category
          );

        const type =
          normalizeText(
            song.type
          );

        return (
          category === "unit" ||
          category === "solo" ||
          type.includes("unit") ||
          type.includes("solo")
        );
      }

      return true;
    });


  /*
    RANDOMは必ずシャッフル
  */
  if (activeFilter === "random") {
    filtered =
      shuffleSongs(filtered);
  } else {
    /*
      RANDOM以外は最新曲順
    */
    filtered =
      getSortedSongs(filtered);
  }

  renderSongs(filtered);

  updateSearchStatus(
    keyword
  );

  updateClearButton();

  updateQuickKeywordButtons();

  /*
    RANDOMボタンをもう一度押した場合も
    並び替わったことが分かるようにする
  */
  if (
    activeFilter === "random" &&
    reshuffle &&
    songGrid
  ) {
    songGrid.animate(
      [
        {
          opacity: 0.35,
          transform:
            "translateY(8px)"
        },
        {
          opacity: 1,
          transform:
            "translateY(0)"
        }
      ],
      {
        duration: 300,
        easing: "ease-out"
      }
    );
  }
}


/* ========================================
   検索状態表示
======================================== */

function updateSearchStatus(keyword) {
  if (activeKeyword) {
    activeKeyword.textContent =
      keyword
        ? `"${songSearch.value.trim()}"`
        : "NONE";
  }

  if (activeFilterName) {
    const filterNames = {
      all: "ALL / NEWEST",
      random: "RANDOM",
      joysound: "JOYSOUND",
      dam: "DAM",
      unit: "UNIT / SOLO"
    };

    activeFilterName.textContent =
      filterNames[activeFilter] ||
      "ALL / NEWEST";
  }
}


/* ========================================
   検索クリアボタン
======================================== */

function updateClearButton() {
  if (
    !clearSearchButton ||
    !songSearch
  ) {
    return;
  }

  clearSearchButton.hidden =
    songSearch.value.length === 0;
}


function clearKeyword() {
  if (!songSearch) {
    return;
  }

  songSearch.value = "";

  filterSongs();

  songSearch.focus();
}


clearSearchButton
  ?.addEventListener(
    "click",
    clearKeyword
  );


/* ========================================
   検索入力
======================================== */

songSearch?.addEventListener(
  "input",
  () => {
    filterSongs();
  }
);


songSearch?.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Escape") {
      clearKeyword();
    }
  }
);


/* ========================================
   フィルターボタン
======================================== */

filterButtons.forEach((button) => {
  button.addEventListener(
    "click",
    () => {
      const selectedFilter =
        button.dataset.filter ||
        "all";

      /*
        RANDOMをもう一度押した場合も
        新しいランダム順にする
      */
      const isRandomAgain =
        activeFilter === "random" &&
        selectedFilter === "random";

      activeFilter =
        selectedFilter;

      filterButtons.forEach(
        (item) => {
          item.classList.toggle(
            "active",
            item === button
          );
        }
      );

      filterSongs({
        reshuffle:
          isRandomAgain ||
          selectedFilter === "random"
      });
    }
  );
});


/* ========================================
   クイックキーワード
======================================== */

quickKeywords
  ?.querySelectorAll(
    "[data-keyword]"
  )
  .forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        if (!songSearch) {
          return;
        }

        const keyword =
          button.dataset.keyword || "";

        /*
          同じキーワードを押したら解除
        */
        const isSameKeyword =
          normalizeText(
            songSearch.value
          ) ===
          normalizeText(keyword);

        songSearch.value =
          isSameKeyword
            ? ""
            : keyword;

        filterSongs();
      }
    );
  });


function updateQuickKeywordButtons() {
  if (!quickKeywords) {
    return;
  }

  const currentKeyword =
    normalizeText(
      songSearch
        ? songSearch.value
        : ""
    );

  quickKeywords
    .querySelectorAll(
      "[data-keyword]"
    )
    .forEach((button) => {
      const buttonKeyword =
        normalizeText(
          button.dataset.keyword
        );

      button.classList.toggle(
        "active",
        currentKeyword !== "" &&
        currentKeyword ===
          buttonKeyword
      );
    });
}


/* ========================================
   全リセット
======================================== */

function resetSearch() {
  activeFilter = "all";

  if (songSearch) {
    songSearch.value = "";
  }

  filterButtons.forEach(
    (button) => {
      button.classList.toggle(
        "active",
        button.dataset.filter ===
          "all"
      );
    }
  );

  filterSongs();
}


resetSearchButton
  ?.addEventListener(
    "click",
    resetSearch
  );


noResultsResetButton
  ?.addEventListener(
    "click",
    resetSearch
  );


/* ========================================
   ローディング
======================================== */

function runSearchLoader() {
  if (
    !searchLoader ||
    !searchLoaderProgress ||
    !searchLoaderPercent ||
    !searchLoaderMessage
  ) {
    return;
  }

  let progress = 0;

  const messages = [
    "CONNECTING DATABASE...",
    "SCANNING LYRIC FILES...",
    "INDEXING SONG DATA...",
    "SEARCH SYSTEM READY."
  ];

  const timer =
    window.setInterval(() => {
      progress +=
        Math.floor(
          Math.random() * 15
        ) + 7;

      progress =
        Math.min(
          progress,
          100
        );

      searchLoaderProgress.style.width =
        `${progress}%`;

      searchLoaderPercent.textContent =
        `${progress}%`;

      if (progress < 35) {
        searchLoaderMessage.textContent =
          messages[0];
      } else if (progress < 65) {
        searchLoaderMessage.textContent =
          messages[1];
      } else if (progress < 95) {
        searchLoaderMessage.textContent =
          messages[2];
      } else {
        searchLoaderMessage.textContent =
          messages[3];
      }

      if (progress === 100) {
        window.clearInterval(timer);

        window.setTimeout(() => {
          searchLoader.classList.add(
            "is-hidden"
          );
        }, 300);
      }
    }, 75);
}


/* ========================================
   メニュー
======================================== */

function closeSearchMenu() {
  if (
    !searchNav ||
    !searchMenuButton
  ) {
    return;
  }

  searchNav.classList.remove(
    "is-open"
  );

  searchMenuButton.classList.remove(
    "is-active"
  );

  searchMenuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  document.body.classList.remove(
    "menu-open"
  );
}


function toggleSearchMenu() {
  if (
    !searchNav ||
    !searchMenuButton
  ) {
    return;
  }

  const isOpen =
    searchNav.classList.toggle(
      "is-open"
    );

  searchMenuButton.classList.toggle(
    "is-active",
    isOpen
  );

  searchMenuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  document.body.classList.toggle(
    "menu-open",
    isOpen
  );
}


searchMenuButton
  ?.addEventListener(
    "click",
    toggleSearchMenu
  );


searchNav
  ?.querySelectorAll("a")
  .forEach((link) => {
    link.addEventListener(
      "click",
      closeSearchMenu
    );
  });


/* ========================================
   Reveal
======================================== */

function activateSearchReveal() {
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
    revealItems.forEach(
      (item) => {
        item.classList.add(
          "is-visible"
        );
      }
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      (
        entries,
        currentObserver
      ) => {
        entries.forEach(
          (entry) => {
            if (
              !entry.isIntersecting
            ) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            currentObserver.unobserve(
              entry.target
            );
          }
        );
      },
      {
        threshold: 0.1
      }
    );

  revealItems.forEach(
    (item) => {
      observer.observe(item);
    }
  );
}


/* ========================================
   マウス発光
======================================== */

window.addEventListener(
  "pointermove",
  (event) => {
    if (!searchPointerGlow) {
      return;
    }

    searchPointerGlow.style.left =
      `${event.clientX}px`;

    searchPointerGlow.style.top =
      `${event.clientY}px`;
  }
);


/* ========================================
   ページトップ
======================================== */

window.addEventListener(
  "scroll",
  () => {
    if (!searchPageTop) {
      return;
    }

    searchPageTop.classList.toggle(
      "is-visible",
      window.scrollY > 650
    );
  }
);


searchPageTop
  ?.addEventListener(
    "click",
    () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  );


/* ========================================
   初期化
======================================== */

function initSearchPage() {
  runSearchLoader();

  /*
    最初はALL・最新曲順
  */
  activeFilter = "all";

  filterButtons.forEach(
    (button) => {
      button.classList.toggle(
        "active",
        button.dataset.filter ===
          "all"
      );
    }
  );

  filterSongs();

  activateSearchReveal();
}


if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initSearchPage
  );
} else {
  initSearchPage();
}