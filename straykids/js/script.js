"use strict";


/* ========================================
   曲データ
======================================== */

const songs = [

{
    title: "THIS & THAT",
    album: "THIS & THAT",
    type: "Original Song",
    date: "2026.08.07",
    release: "2026.08.07",
    url: "song/THIS&THAT.html",
    image: "images/song/THISTHAT.jpg",
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

  {
    title: "After You",
    album: "THIS & THAT",
    type: "Original Song",
    date: "2026.08.07",
    release: "2026.08.07",
    url: "song/AfterYou.html",
    image: "images/albums/THISTHAT.jpg",
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

  {
    title: "FARMING",
    album: "THIS & THAT",
    type: "Original Song",
    date: "2026.08.07",
    release: "2026.08.07",
    url: "song/FARMING.html",
    image: "images/albums/THISTHAT.jpg",
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

  {
    title: "I DO",
    album: "THIS & THAT",
    type: "Original Song",
    date: "2026.08.07",
    release: "2026.08.07",
    url: "song/IDO.html",
    image: "images/albums/THISTHAT.jpg",
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

    {
    title: "Way Out",
    album: "THIS & THAT",
    type: "Original Song",
    date: "2026.08.07",
    release: "2026.08.07",
    url: "song/WayOut.html",
    image: "images/albums/THISTHAT.jpg",
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },


    {
    title: "Back Then",
    album: "THIS & THAT",
    type: "Original Song",
    date: "2026.08.07",
    release: "2026.08.07",
    url: "song/BackThen.html",
    image: "images/albums/THISTHAT.jpg",
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },


  {
    title: "MANIAC",
    album: "ODDINARY",
    type: "Original Song",
    date: "2026.06.12",
    release: "2022.03.18",
    url: "song/MANIAC.html",
    image: "images/song/MANIAC.jpg",
    karaoke: ["JOYSOUND", "DAM"],
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

  {
    title: "RUN IT",
    album: "RUN IT",
    type: "Original Song",
    date: "2026.06.24",
    release: "2026.06.24",
    url: "song/RUN IT.html",
    image: "images/song/RUN IT.jpg",
    karaoke: ["JOYSOUND"],
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

  {
    title: "STAY",
    album: "STAY",
    type: "Original Song",
    date: "2026.07.09",
    release: "2026.03.25",
    url: "song/STAY.html",
    image: "images/albums/STAY.jpg",
    karaoke: ["JOYSOUND", "DAM"],
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

  {
    title: "Endless Sun",
    album: "Endless Sun",
    type: "Original Song",
    date: "2026.07.10",
    release: "2026.03.13",
    url: "song/Endless Sun.html",
    image: "images/song/Endless sun.jpg",
    karaoke: ["JOYSOUND", "DAM"],
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

  {
    title: "Do It",
    album: "Do It",
    type: "Original Song",
    date: "2026.07.10",
    release: "2025.11.21",
    url: "song/Do It.html",
    image: "images/song/Do It.jpg",
    karaoke: ["JOYSOUND"],
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

  {
    title: "DIVINE",
    album: "Do It",
    type: "Original Song",
    date: "2026.07.10",
    release: "2025.11.21",
    url: "song/DIVINE.html",
    image: "images/song/DIVINE.jpg",
    karaoke: [],
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

  {
    title: "Holiday",
    album: "Do It",
    type: "Original Song",
    date: "2026.07.10",
    release: "2025.11.21",
    url: "song/Holiday.html",
    image: "images/albums/album-Do It.jpg",
    karaoke: [],
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

  {
    title: "I Like It",
    album: "ATE",
    type: "Original Song",
    date: "2026.06.29",
    release: "2024.07.19",
    url: "song/I Like It.html",
    image: "images/song/I Like It.jpg",
    karaoke: ["JOYSOUND", "DAM"],
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

  {
    title: "JJAM",
    album: "ATE",
    type: "Original Song",
    date: "2026.07.26",
    release: "2024.07.19",
    url: "song/JJAM.html",
    image: "images/song/JJAM.jpg",
    karaoke: ["JOYSOUND", "DAM"],
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

  {
    title: "back to life",
    album: "back to life",
    type: "Solo Song",
    date: "2026.06.29",
    release: "2026.06.11",
    url: "song/back to life.html",
    image: "images/albums/back to life.jpg",
    karaoke: ["JOYSOUND"],
    category: "unit",
    members: [
      "HAN",
      "ハン"
    ]
  },

  {
    title: "Hall of fame",
    album: "5-STAR",
    type: "Original Song",
    date: "2026.06.29",
    release: "2023.06.02",
    url: "song/Hall of fame.html",
    image: "images/albums/5-STAR.jpg",
    karaoke: ["JOYSOUND"],
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },

    {
    title: "Hellevator",
    album: "Mixtape",
    album: "SKZ2020",
    type: "Original Song",
    date: "2018.01.12",
    release: "2023.06.02",
    url: "song/HELLEVATOR.html",
    image: "images/song/HELLEVATOR.jpg",
    karaoke: ["JOYSOUND","DAM"],
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  },


/* ========================================
  {
    title: "CASE 143",
    album: "MAXIDENT",
    type: "Original Song",
    date: "2026.06.12",
    release: "2022.10.07",
    url: "song/CASE143.html",
    image: "images/song/CASE143.jpg",
    karaoke: ["JOYSOUND", "DAM"],
    category: "latest",
    members: [
      "Bang Chan",
      "Lee Know",
      "Changbin",
      "Hyunjin",
      "HAN",
      "Felix",
      "Seungmin",
      "I.N"
    ]
  }
======================================== */
];


/* ========================================
   アルバムデータ
======================================== */

const albums = [
  {
    title: "THIS & THAT",
    year: "2026",
    image: "images/albums/THISTHAT.jpg",
    url: "albums/THISTHAT.html",
    available: true
  },

  {
    title: "SKZ-REPLAY 2026 Pt.1",
    year: "2026",
    image: "images/albums/SKZ-REPLAY1.jpg",
    url: "albums/SKZ-REPLAY1.html",
    available: true
  },

  {
    title: "RUN IT",
    year: "2026",
    image: "images/albums/RUN IT.jpg",
    url: "albums/RUN-IT.html",
    available: true
  },

  {
    title: "STAY",
    year: "2026",
    image: "images/albums/STAY.jpg",
    url: "albums/STAY.html",
    available: true
  },

  {
    title: "Endless Sun",
    year: "2026",
    image: "images/albums/Endless Sun.jpg",
    url: "albums/Endless-Sun.html",
    available: true
  },

  {
    title: "Do It (Remixes)",
    year: "2025",
    image: "images/albums/Do It(Remixes).jpg",
    url: "",
    available: false
  },

  {
    title: "Do It",
    year: "2025",
    image: "images/albums/album-Do It.jpg",
    url: "",
    available: false
  },

  {
    title: "KARMA",
    year: "2025",
    image: "images/albums/KARMA.png",
    url: "",
    available: false
  },

  {
    title: "Hollow",
    year: "2025",
    image: "images/albums/Hollow.jpg",
    url: "",
    available: false
  },

  {
    title: "Mixtape : dominATE",
    year: "2025",
    image: "images/albums/Mixtape dominATE.jpg",
    url: "",
    available: false
  },

  {
    title: "合 (HOP)",
    year: "2024",
    image: "images/albums/合 (HOP).jpg",
    url: "",
    available: false
  },

  {
    title: "GIANT",
    year: "2024",
    image: "images/albums/GIANT.jpg",
    url: "",
    available: false
  },

  {
    title: "ATE",
    year: "2024",
    image: "images/albums/ATE.jpg",
    url: "",
    available: false
  },

  {
    title: "樂-STAR",
    year: "2023",
    image: "images/albums/ROCK-STAR.jpg",
    url: "",
    available: false
  },

  {
    title: "★★★★★ (5-STAR)",
    year: "2023",
    image: "images/albums/5-STAR.jpg",
    url: "albums/5-STAR.html",
    available: true
  },

  {
    title: "THE SOUND",
    year: "2023",
    image: "images/albums/THE SOUND.jpg",
    url: "",
    available: false
  },

  {
    title: "SKZ-REPLAY",
    year: "2022",
    image: "images/albums/SKZ-REPLAY.jpg",
    url: "",
    available: false
  },

  {
    title: "MAXIDENT",
    year: "2022",
    image: "images/albums/MAXIDENT.jpg",
    url: "",
    available: false
  },

  {
    title: "ODDINARY",
    year: "2022",
    image: "images/albums/ODDINARY.jpg",
    url: "",
    available: false
  },

  {
    title: "SKZ2021",
    year: "2021",
    image: "images/albums/SKZ2021.jpg",
    url: "",
    available: false
  },

  {
    title: "Christmas EveL",
    year: "2021",
    image: "images/albums/Christmas EveL.jpg",
    url: "",
    available: false
  },

  {
    title: "NOEASY",
    year: "2021",
    image: "images/albums/NOEASY.jpg",
    url: "",
    available: false
  },

  {
    title: "IN LIFE",
    year: "2020",
    image: "images/albums/IN LIFE.jpg",
    url: "",
    available: false
  },

  {
    title: "GO LIVE",
    year: "2020",
    image: "images/albums/GO LIVE.jpg",
    url: "",
    available: false
  },

  {
    title: "Clé : LEVANTER",
    year: "2019",
    image: "images/albums/Cle LEVANTER.jpg",
    url: "",
    available: false
  },

  {
    title: "Clé 2 : Yellow Wood",
    year: "2019",
    image: "images/albums/Cle 2 Yellow Wood.jpg",
    url: "",
    available: false
  },

  {
    title: "Clé 1 : MIROH",
    year: "2019",
    image: "images/albums/Cle 1 MIROH.jpg",
    url: "",
    available: false
  },

  {
    title: "I am YOU",
    year: "2018",
    image: "images/albums/I am YOU.jpg",
    url: "",
    available: false
  },

  {
    title: "I am WHO",
    year: "2018",
    image: "images/albums/I am WHO.jpg",
    url: "",
    available: false
  },

  {
    title: "I am NOT",
    year: "2018",
    image: "images/albums/I am NOT.jpg",
    url: "",
    available: false
  }
];

/* ========================================
   DOM取得
======================================== */

const loadingScreen =
  document.getElementById("loadingScreen");

const loadingProgress =
  document.getElementById("loadingProgress");

const loadingPercent =
  document.getElementById("loadingPercent");

const loadingMessage =
  document.getElementById("loadingMessage");

const menuButton =
  document.getElementById("menuButton");

const globalNav =
  document.getElementById("globalNav");

const songGrid =
  document.getElementById("songGrid");

const songSearch =
  document.getElementById("songSearch");

const filterButtons =
  document.querySelectorAll(
    ".filter-button"
  );

const resultCount =
  document.getElementById("resultCount");

const noResults =
  document.getElementById("noResults");

const albumRail =
  document.getElementById("albumRail");

const pointerGlow =
  document.getElementById("pointerGlow");

const pageTop =
  document.getElementById("pageTop");


/* ========================================
   起動画面
======================================== */

function runLoadingScreen() {
  if (
    !loadingScreen ||
    !loadingProgress ||
    !loadingPercent ||
    !loadingMessage
  ) {
    return;
  }

  let progress = 0;

  const messages = [
    "ACCESSING LYRIC DATABASE...",
    "LOADING SONG FILES...",
    "VERIFYING PART DATA...",
    "ACCESS GRANTED."
  ];

  const timer =
    window.setInterval(() => {
      progress +=
        Math.floor(
          Math.random() * 12
        ) + 4;

      if (progress > 100) {
        progress = 100;
      }

      loadingProgress.style.width =
        `${progress}%`;

      loadingPercent.textContent =
        `${progress}%`;

      if (progress < 35) {
        loadingMessage.textContent =
          messages[0];

      } else if (progress < 65) {
        loadingMessage.textContent =
          messages[1];

      } else if (progress < 95) {
        loadingMessage.textContent =
          messages[2];

      } else {
        loadingMessage.textContent =
          messages[3];
      }

      if (progress === 100) {
        window.clearInterval(timer);

        window.setTimeout(() => {
          loadingScreen.classList.add(
            "is-hidden"
          );
        }, 450);
      }
    }, 95);
}


/* ========================================
   メニュー
======================================== */

function setupMenu() {
  const currentMenuButton =
    document.getElementById(
      "menuButton"
    );

  /*
    globalNavとaboutNavの
    どちらのIDにも対応
  */
  const currentGlobalNav =
    document.querySelector(
      "#globalNav, #aboutNav"
    );


  if (
    !currentMenuButton ||
    !currentGlobalNav
  ) {
    console.error(
      "メニュー要素が見つかりません",
      {
        menuButton:
          currentMenuButton,

        globalNav:
          currentGlobalNav
      }
    );

    return;
  }


  function closeMenu() {
    currentGlobalNav.classList.remove(
      "is-open"
    );

    currentMenuButton.classList.remove(
      "is-active"
    );

    currentMenuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove(
      "menu-open"
    );
  }


  function openOrCloseMenu(event) {
    event.preventDefault();
    event.stopPropagation();

    const isOpen =
      currentGlobalNav.classList.toggle(
        "is-open"
      );

    currentMenuButton.classList.toggle(
      "is-active",
      isOpen
    );

    currentMenuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );
  }


  currentMenuButton.addEventListener(
    "click",
    openOrCloseMenu
  );


  /*
    スマホのタップにも対応
  */
  currentMenuButton.addEventListener(
    "touchend",
    (event) => {
      /*
        clickも続けて発生する端末では
        click側だけを使用する
      */
      event.stopPropagation();
    },
    {
      passive: true
    }
  );


  currentGlobalNav
    .querySelectorAll("a")
    .forEach((link) => {
      link.addEventListener(
        "click",
        closeMenu
      );
    });


  document.addEventListener(
    "click",
    (event) => {
      const clickedMenu =
        currentGlobalNav.contains(
          event.target
        );

      const clickedButton =
        currentMenuButton.contains(
          event.target
        );

      if (
        !clickedMenu &&
        !clickedButton &&
        currentGlobalNav.classList.contains(
          "is-open"
        )
      ) {
        closeMenu();
      }
    }
  );


  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    }
  );
}

/* ========================================
   日付処理
======================================== */

function dateToNumber(dateText) {
  return Number(
    String(dateText ?? "")
      .replace(/\D/g, "")
  );
}


/* 曲のリリース日が新しい順 */
function getSortedSongs() {
  return [...songs].sort((a, b) => {
    const releaseDifference =
      dateToNumber(b.release) -
      dateToNumber(a.release);

    if (releaseDifference !== 0) {
      return releaseDifference;
    }

    const trackA =
      Number(a.track ?? 999);

    const trackB =
      Number(b.track ?? 999);

    return trackA - trackB;
  });
}


/* サイトへの投稿日が新しい順 */
function getSongsByUpdateDate() {
  return [...songs].sort((a, b) => {
    return (
      dateToNumber(b.date) -
      dateToNumber(a.date)
    );
  });
}


/* ========================================
   統計表示
======================================== */

function setTextContent(id, value) {
  const element =
    document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}


function updateStatistics() {
  const songsByUpdateDate =
    getSongsByUpdateDate();

  const latestDate =
    songsByUpdateDate[0]?.date ?? "----";

  setTextContent(
    "heroSongCount",
    String(songs.length).padStart(3, "0")
  );

  setTextContent(
    "totalSongCount",
    String(songs.length).padStart(2, "0")
  );

  setTextContent(
    "totalAlbumCount",
    String(albums.length).padStart(2, "0")
  );

  setTextContent(
    "lastUpdateDate",
    latestDate
  );
}


/* ========================================
   HTML安全化
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
   タグ生成
======================================== */

function createTags(song) {
  const tags = [
    `<span class="data-tag">
      ${escapeHtml(song.type)}
    </span>`,

    `<span class="data-tag">
      ${escapeHtml(song.album)}
    </span>`
  ];

  const karaoke =
    Array.isArray(song.karaoke)
      ? song.karaoke
      : [];

  karaoke.forEach((service) => {
    tags.push(
      `<span class="data-tag karaoke">
        ${escapeHtml(service)}
      </span>`
    );
  });

  return tags.join("");
}


/* ========================================
   曲カード
======================================== */

function renderSongs(songList) {
  if (!songGrid) {
    return;
  }

  songGrid.innerHTML = "";

  /*
    この関数では並べ替えない。
    受け取った順番のままカードを作る。
  */

  if (resultCount) {
    resultCount.textContent =
      `${String(songList.length).padStart(
        2,
        "0"
      )} FILES`;
  }

  if (noResults) {
    noResults.hidden =
      songList.length !== 0;
  }

  songList.forEach((song, index) => {
    const card =
      document.createElement("a");

    card.className = "song-card";
    card.href = song.url;

    card.innerHTML = `
      <img
        class="song-image"
        src="${escapeHtml(song.image)}"
        alt="${escapeHtml(song.title)}"
        loading="lazy"
      >

      <div class="song-content">

        <span class="song-file-number">
          FILE-${String(index + 1).padStart(
            3,
            "0"
          )}
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
   検索・フィルター
======================================== */

let activeFilter = "all";


function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKC")
    .trim();
}


/* 配列をランダムに並べ替える */
function shuffleSongs(songList) {
  const shuffled = [...songList];

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {
    const randomIndex =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      shuffled[i],
      shuffled[randomIndex]
    ] = [
      shuffled[randomIndex],
      shuffled[i]
    ];
  }

  return shuffled;
}


/* 曲を検索・絞り込み */
function filterSongs() {
  const keyword =
    normalizeText(
      songSearch?.value ?? ""
    );

  /*
    ALLの基本順は、投稿日ではなく
    曲のリリース日が新しい順。
  */
  let filtered =
    getSortedSongs().filter((song) => {
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
          song.category,
          song.date,
          song.release,
          ...members,
          ...karaoke
        ].join(" "));

      const matchesKeyword =
        searchableText.includes(keyword);

      if (!matchesKeyword) {
        return false;
      }

      /*
        ALLとRANDOMは
        すべての曲が対象。
      */
      if (
        activeFilter === "all" ||
        activeFilter === "random"
      ) {
        return true;
      }

      /*
        JOYSOUND対応曲。
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
        DAM対応曲。
      */
      if (activeFilter === "dam") {
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
        ユニット・ソロ曲。
      */
      if (activeFilter === "unit") {
        const category =
          normalizeText(song.category);

        const type =
          normalizeText(song.type);

        return (
          category === "unit" ||
          type.includes("unit") ||
          type.includes("solo")
        );
      }

      return true;
    });

  /*
    RANDOMを押した場合だけ、
    リリース日順をシャッフルする。
  */
  if (activeFilter === "random") {
    filtered =
      shuffleSongs(filtered);
  }

  renderSongs(filtered);
}


/* 検索欄 */
songSearch?.addEventListener(
  "input",
  filterSongs
);


/* フィルターボタン */
filterButtons.forEach((button) => {
  button.addEventListener(
    "click",
    () => {
      filterButtons.forEach((item) => {
        item.classList.remove(
          "active"
        );
      });

      button.classList.add(
        "active"
      );

      activeFilter =
        button.dataset.filter ?? "all";

      filterSongs();
    }
  );
});


/* ========================================
   最新曲スライダー
======================================== */

/*
  リリース日の新しい曲から
  最大6曲を表示する。
*/
const latestSongs =
  getSortedSongs().slice(0, 6);

let latestIndex = 0;

const latestCard =
  document.getElementById(
    "latestCard"
  );

const latestImage =
  document.getElementById(
    "latestImage"
  );

const latestTitle =
  document.getElementById(
    "latestTitle"
  );

const latestAlbum =
  document.getElementById(
    "latestAlbum"
  );

const latestDate =
  document.getElementById(
    "latestDate"
  );

const latestTags =
  document.getElementById(
    "latestTags"
  );

const latestLink =
  document.getElementById(
    "latestLink"
  );

const latestCurrent =
  document.getElementById(
    "latestCurrent"
  );

const latestTotal =
  document.getElementById(
    "latestTotal"
  );

const latestFileNumber =
  document.getElementById(
    "latestFileNumber"
  );

const latestPrev =
  document.getElementById(
    "latestPrev"
  );

const latestNext =
  document.getElementById(
    "latestNext"
  );


function updateLatestCard() {
  if (
    latestSongs.length === 0 ||
    !latestCard
  ) {
    return;
  }

  const song =
    latestSongs[latestIndex];

  latestCard.classList.add(
    "is-switching"
  );

  window.setTimeout(() => {
    if (latestImage) {
      latestImage.src =
        song.image;

      latestImage.alt =
        song.title;
    }

    if (latestTitle) {
      latestTitle.textContent =
        song.title;
    }

    if (latestAlbum) {
      latestAlbum.textContent =
        song.album;
    }

    /*
      投稿日ではなく
      曲のリリース日を表示する。
    */
    if (latestDate) {
      latestDate.textContent =
        song.release;
    }

    if (latestTags) {
      latestTags.innerHTML =
        createTags(song);
    }

    if (latestLink) {
      latestLink.href =
        song.url;
    }

    if (latestCurrent) {
      latestCurrent.textContent =
        String(latestIndex + 1)
          .padStart(2, "0");
    }

    if (latestTotal) {
      latestTotal.textContent =
        String(latestSongs.length)
          .padStart(2, "0");
    }

    if (latestFileNumber) {
      latestFileNumber.textContent =
        `FILE NO. ${
          String(latestIndex + 1)
            .padStart(3, "0")
        }`;
    }

    latestCard.classList.remove(
      "is-switching"
    );
  }, 280);
}


latestPrev?.addEventListener(
  "click",
  () => {
    if (latestSongs.length === 0) {
      return;
    }

    latestIndex =
      (
        latestIndex -
        1 +
        latestSongs.length
      ) % latestSongs.length;

    updateLatestCard();
  }
);


latestNext?.addEventListener(
  "click",
  () => {
    if (latestSongs.length === 0) {
      return;
    }

    latestIndex =
      (
        latestIndex +
        1
      ) % latestSongs.length;

    updateLatestCard();
  }
);


/* ========================================
   アルバム
======================================== */

function renderAlbums() {
  if (!albumRail) {
    return;
  }

  albumRail.innerHTML = "";

  /*
    albums配列に書いた順番を
    そのまま最新順として表示する。
  */
  albums.forEach((album, index) => {

    /*
      availableがtrueで、
      URLも設定されている場合だけ開ける。
    */
    const isAvailable =
      album.available === true &&
      Boolean(album.url);


    /*
      完成済みはリンク、
      未完成はクリックできないarticleにする。
    */
    const card =
      document.createElement(
        isAvailable
          ? "a"
          : "article"
      );


    card.className =
      "album-card";


    /*
      完成済みの場合だけURLを設定。
    */
    if (isAvailable) {
      card.href =
        album.url;

    } else {
      card.classList.add(
        "is-coming-soon"
      );

      card.setAttribute(
        "aria-disabled",
        "true"
      );
    }


    card.innerHTML = `
      <div class="album-image-wrap">

        <span class="album-number">
          ARCHIVE-${String(
            index + 1
          ).padStart(2, "0")}
        </span>

        <img
          src="${escapeHtml(album.image)}"
          alt="${escapeHtml(album.title)}"
          loading="lazy"
        >

        ${
          isAvailable
            ? ""
            : `
              <div class="album-coming-overlay">
                <span>
                  FILE LOCKED
                </span>

                <strong>
                  COMING SOON
                </strong>
              </div>
            `
        }

      </div>


      <h3>
        ${escapeHtml(album.title)}
      </h3>


      <p>
        ${escapeHtml(album.year)}
      </p>


      <span class="album-card-status">
        ${
          isAvailable
            ? "OPEN ARCHIVE"
            : "ARCHIVE LOCKED"
        }
      </span>
    `;


    albumRail.appendChild(
      card
    );
  });
}


/* ========================================
   アルバムスライダー
======================================== */

const albumPrev =
  document.getElementById(
    "albumPrev"
  );

const albumNext =
  document.getElementById(
    "albumNext"
  );


albumPrev?.addEventListener(
  "click",
  () => {
    albumRail?.scrollBy({
      left: -300,
      behavior: "smooth"
    });
  }
);


albumNext?.addEventListener(
  "click",
  () => {
    albumRail?.scrollBy({
      left: 300,
      behavior: "smooth"
    });
  }
);

/* ========================================
   ランダム曲へ移動するボタン
======================================== */

const randomSongButton =
  document.getElementById(
    "randomSongButton"
  );


randomSongButton?.addEventListener(
  "click",
  () => {
    if (songs.length === 0) {
      return;
    }

    const randomIndex =
      Math.floor(
        Math.random() *
        songs.length
      );

    const randomSong =
      songs[randomIndex];

    window.location.href =
      randomSong.url;
  }
);


/* ========================================
   スクロール表示
======================================== */

function activateRevealAnimation() {
  const revealItems =
    document.querySelectorAll(
      ".reveal"
    );

  /*
    IntersectionObserverが
    使用できない環境では即表示する。
  */
  if (
    !(
      "IntersectionObserver" in
      window
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
        threshold: 0.13
      }
    );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
}


/* ========================================
   ポインター発光
======================================== */

window.addEventListener(
  "pointermove",
  (event) => {
    if (!pointerGlow) {
      return;
    }

    pointerGlow.style.left =
      `${event.clientX}px`;

    pointerGlow.style.top =
      `${event.clientY}px`;
  }
);


/* ========================================
   ページトップ
======================================== */

window.addEventListener(
  "scroll",
  () => {
    if (!pageTop) {
      return;
    }

    pageTop.classList.toggle(
      "is-visible",
      window.scrollY > 700
    );
  }
);


pageTop?.addEventListener(
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

function init() {
  runLoadingScreen();

  setupMenu();

  updateStatistics();
  filterSongs();
  renderAlbums();
  updateLatestCard();
  activateRevealAnimation();
}

/*
  JSが先に読み込まれても、
  HTMLの後に読み込まれても動かす
*/
if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    init,
    {
      once: true
    }
  );

} else {
  init();
}
