"use strict";


/* ========================================
   曲データ
======================================== */

/*
  duration：
  曲の長さを秒数で入力する。

  karaoke：
  対応サービスを書く。
  例 ["JOYSOUND", "DAM"]

  category：
  group / unit / solo
*/

const setlistSongs = [
    {
    title: "THIS & THAT",
    album: "THIS & THAT",
    type: "Original Song",
    release: "2026.08.07",
    image: "images/song/THISTHAT.jpg",
    url: "song/THIS&THAT.html",
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
    title: "After You",
    album: "THIS & THAT",
    type: "Original Song",
    release: "2026.08.07",
    image: "images/albums/THISTHAT.jpg",
    url: "song/AfterYou.html",
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
    title: "FARMING",
    album: "THIS & THAT",
    type: "Original Song",
    release: "2026.08.07",
    image: "images/albums/THISTHAT.jpg",
    url: "song/FARMING.html",
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
    title: "I DO",
    album: "THIS & THAT",
    type: "Original Song",
    release: "2026.08.07",
    image: "images/albums/THISTHAT.jpg",
    url: "song/IDO.html",
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
    title: "Way Out",
    album: "THIS & THAT",
    type: "Original Song",
    release: "2026.08.07",
    image: "images/albums/THISTHAT.jpg",
    url: "song/WayOut.html",
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
    title: "Back Then",
    album: "THIS & THAT",
    type: "Original Song",
    release: "2026.08.07",
    image: "images/albums/THISTHAT.jpg",
    url: "song/BackThen.html",
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
    id: "run-it",
    title: "RUN IT",
    album: "RUN IT",
    release: "2026.06.24",
    image:
      "images/song/RUN IT.jpg",
    url:
      "song/RUN IT.html",
    karaoke: [
      "JOYSOUND"
    ],
    category: "group",
    duration: 186
  },

  {
    id: "stay",
    title: "STAY",
    album: "STAY",
    release: "2026.07.09",
    image:
      "images/albums/STAY.jpg",
    url:
      "songs/STAY.html",
    karaoke: [
      "JOYSOUND",
      "DAM"
    ],
    category: "group",
    duration: 201
  },

  {
    id: "endless-sun",
    title: "Endless Sun",
    album: "Endless Sun",
    release: "2026.03.13",
    image:
      "images/song/Endless sun.jpg",
    url:
      "song/Endless Sun.html",
    karaoke: [
      "JOYSOUND",
      "DAM"
    ],
    category: "group",
    duration: 198
  },

  {
    id: "back-to-life",
    title: "back to life",
    album: "back to life",
    release: "2026.06.29",
    image:
      "images/albums/back to life.jpg",
    url:
      "song/back to life.html",
    karaoke: [
      "JOYSOUND"
    ],
    category: "solo",
    duration: 192
  },

  {
    id: "do-it",
    title: "Do It",
    album: "Do It",
    release: "2025.11.21",
    image:
      "images/song/Do It.jpg",
    url:
      "song/Do It.html",
    karaoke: [
      "JOYSOUND"
    ],
    category: "group",
    duration: 184
  },

  {
    id: "divine",
    title: "DIVINE",
    album: "Do It",
    release: "2025.11.21",
    image:
      "images/song/DIVINE.jpg",
    url:
      "song/DIVINE.html",
    karaoke: [],
    category: "group",
    duration: 195
  },

  {
    id: "holiday",
    title: "Holiday",
    album: "Do It",
    release: "2025.11.21",
    image:
      "images/albums/album-Do It.jpg",
    url:
      "song/Holiday.html",
    karaoke: [],
    category: "group",
    duration: 203
  },

  {
    id: "jjam",
    title: "JJAM",
    album: "ATE",
    release: "2024.07.19",
    image:
      "images/song/JJAM.jpg",
    url:
      "song/JJAM.html",
    karaoke: [
      "JOYSOUND",
      "DAM"
    ],
    category: "group",
    duration: 185
  },

  {
    id: "i-like-it",
    title: "I Like It",
    album: "ATE",
    release: "2024.07.19",
    image:
      "images/song/I Like It.jpg",
    url:
      "song/I Like It.html",
    karaoke: [
      "JOYSOUND",
      "DAM"
    ],
    category: "group",
    duration: 168
  },

  {
    id: "case-143",
    title: "CASE 143",
    album: "MAXIDENT",
    release: "2022.10.07",
    image:
      "images/song/CASE143.jpg",
    url:
      "song/CASE 143.html",
    karaoke: [
      "JOYSOUND",
      "DAM"
    ],
    category: "group",
    duration: 192
  },

  {
    id: "maniac",
    title: "MANIAC",
    album: "ODDINARY",
    release: "2022.03.18",
    image:
      "images/song/MANIAC.jpg",
    url:
      "song/MANIAC.html",
    karaoke: [
      "JOYSOUND",
      "DAM"
    ],
    category: "group",
    duration: 182
  },

    {
    id: "hall-of-fame",
    title: "Hall of fame",
    album: "5-STAR",
    release: "2023.06.02",
    url: "song/Hall of fame.html",
    image: "images/albums/5-STAR.jpg",
    karaoke: ["JOYSOUND"],
    category: "group",
    duration: 172

  },

  {
    id: "Hellevator",
    title: "Hellevator",
    album: "Mixtape",
    album: "SKZ2020",
    release: "2018.01.12",
    url: "song/HELLEVATOR.html",
    image: "images/song/HELLEVATOR.jpg",
    karaoke: ["JOYSOUND","DAM"],
    category: "group",
    duration: 240

  },

  {
    id: "District 9",
    title: "District 9",
    album: "I am NOT",
    album: "SKZ2020",
    release: "2018.03.26",
    url: "song/District9.html",
    image: "images/albums/SKZ2020.jpg",
    karaoke: ["JOYSOUND","DAM"],
    category: "group",
    duration: 213

  },

  {
    id: "Side Effects",
    title: "Side Effects",
    album: "Clé 2 : Yellow Wood",
    release: "2019.06.19",
    url: "song/SideEffects.html",
    image: "images/albums/Clé2YellowWood.jpg",
    karaoke: ["JOYSOUND","DAM"],
    category: "group",
    duration: 213

  },

];  


/* ========================================
   保存名
======================================== */

const SETLIST_STORAGE_KEY =
  "skzLyricLabSetlist";

const SETLIST_NAME_KEY =
  "skzLyricLabSetlistName";


/* ========================================
   DOM
======================================== */

const setlistLoader =
  document.getElementById(
    "setlistLoader"
  );

const setlistLoaderProgress =
  document.getElementById(
    "setlistLoaderProgress"
  );

const setlistLoaderPercent =
  document.getElementById(
    "setlistLoaderPercent"
  );

const setlistLoaderMessage =
  document.getElementById(
    "setlistLoaderMessage"
  );

const setlistMenuButton =
  document.getElementById(
    "setlistMenuButton"
  );

const setlistNav =
  document.getElementById(
    "setlistNav"
  );

const setlistPointerGlow =
  document.getElementById(
    "setlistPointerGlow"
  );

const availableSongCount =
  document.getElementById(
    "availableSongCount"
  );

const heroSelectedCount =
  document.getElementById(
    "heroSelectedCount"
  );

const previewSelectedCount =
  document.getElementById(
    "previewSelectedCount"
  );

const setlistName =
  document.getElementById(
    "setlistName"
  );

const setlistSaveStatus =
  document.getElementById(
    "setlistSaveStatus"
  );

const setlistSongSearch =
  document.getElementById(
    "setlistSongSearch"
  );

const clearSetlistSearch =
  document.getElementById(
    "clearSetlistSearch"
  );

const setlistFilterButtons =
  document.querySelectorAll(
    ".setlist-filter-button"
  );

const availableSongList =
  document.getElementById(
    "availableSongList"
  );

const libraryResultCount =
  document.getElementById(
    "libraryResultCount"
  );

const setlistNoSongs =
  document.getElementById(
    "setlistNoSongs"
  );

const selectedSetlist =
  document.getElementById(
    "selectedSetlist"
  );

const selectedSongCount =
  document.getElementById(
    "selectedSongCount"
  );

const emptySetlist =
  document.getElementById(
    "emptySetlist"
  );

const addRandomSongButton =
  document.getElementById(
    "addRandomSong"
  );

const shuffleSetlistButton =
  document.getElementById(
    "shuffleSetlist"
  );

const clearSetlistButton =
  document.getElementById(
    "clearSetlist"
  );

const summarySongCount =
  document.getElementById(
    "summarySongCount"
  );

const setlistDuration =
  document.getElementById(
    "setlistDuration"
  );

const saveSetlistButton =
  document.getElementById(
    "saveSetlist"
  );

const copySetlistButton =
  document.getElementById(
    "copySetlist"
  );

const practiceFirstSong =
  document.getElementById(
    "practiceFirstSong"
  );

const practiceDescription =
  document.getElementById(
    "practiceDescription"
  );

const startPracticeButton =
  document.getElementById(
    "startPractice"
  );

const setlistToast =
  document.getElementById(
    "setlistToast"
  );

const setlistPageTop =
  document.getElementById(
    "setlistPageTop"
  );


/* ========================================
   現在の状態
======================================== */

let activeSetlistFilter = "all";

let selectedSongIds = [];

let saveStatusTimer = null;

let toastTimer = null;


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
   検索用変換
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

function parseSetlistDate(value) {
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

function getSortedSetlistSongs() {
  return [...setlistSongs]
    .sort((first, second) => {
      return (
        parseSetlistDate(
          second.release
        ) -
        parseSetlistDate(
          first.release
        )
      );
    });
}


/* ========================================
   IDから曲を取得
======================================== */

function getSongById(songId) {
  return setlistSongs.find(
    (song) => {
      return song.id === songId;
    }
  );
}


/* ========================================
   選択済みの曲を取得
======================================== */

function getSelectedSongs() {
  return selectedSongIds
    .map((songId) => {
      return getSongById(songId);
    })
    .filter(Boolean);
}


/* ========================================
   曲ライブラリ表示
======================================== */

function renderAvailableSongs() {
  if (!availableSongList) {
    return;
  }

  const keyword =
    normalizeText(
      setlistSongSearch
        ? setlistSongSearch.value
        : ""
    );

  const filteredSongs =
    getSortedSetlistSongs()
      .filter((song) => {
        const karaoke =
          Array.isArray(song.karaoke)
            ? song.karaoke
            : [];

        const searchableText =
          normalizeText([
            song.title,
            song.album,
            song.release,
            song.category,
            ...karaoke
          ].join(" "));

        const matchesKeyword =
          searchableText.includes(
            keyword
          );

        if (!matchesKeyword) {
          return false;
        }

        if (
          activeSetlistFilter ===
          "all"
        ) {
          return true;
        }

        if (
          activeSetlistFilter ===
          "joysound"
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

        if (
          activeSetlistFilter ===
          "dam"
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

        if (
          activeSetlistFilter ===
          "unit"
        ) {
          return (
            song.category === "unit" ||
            song.category === "solo"
          );
        }

        return true;
      });

  availableSongList.innerHTML = "";

  if (libraryResultCount) {
    libraryResultCount.textContent =
      `${String(filteredSongs.length)
        .padStart(2, "0")} FILES`;
  }

  if (setlistNoSongs) {
    setlistNoSongs.hidden =
      filteredSongs.length !== 0;
  }

  filteredSongs.forEach((song) => {
    const isSelected =
      selectedSongIds.includes(
        song.id
      );

    const item =
      document.createElement("article");

    item.className =
      "available-song-item";

    item.innerHTML = `
      <img
        class="available-song-image"
        src="${escapeHtml(song.image)}"
        alt="${escapeHtml(song.title)}"
        loading="lazy"
      >

      <div class="available-song-info">

        <div class="available-song-tags">
          ${createKaraokeTags(song)}
        </div>

        <h4>
          ${escapeHtml(song.title)}
        </h4>

        <p>
          ${escapeHtml(song.album)}
          /
          ${escapeHtml(song.release)}
        </p>

      </div>

      <button
        class="add-song-button"
        type="button"
        data-add-song="${escapeHtml(song.id)}"
        ${isSelected ? "disabled" : ""}
      >
        ${isSelected ? "ADDED" : "ADD"}
      </button>
    `;

    availableSongList.appendChild(
      item
    );
  });
}


/* ========================================
   カラオケタグ
======================================== */

function createKaraokeTags(song) {
  const karaoke =
    Array.isArray(song.karaoke)
      ? song.karaoke
      : [];

  if (karaoke.length === 0) {
    return `
      <span>
        ORIGINAL
      </span>
    `;
  }

  return karaoke
    .map((service) => {
      return `
        <span>
          ${escapeHtml(service)}
        </span>
      `;
    })
    .join("");
}


/* ========================================
   ライブラリのADD
======================================== */

availableSongList
  ?.addEventListener(
    "click",
    (event) => {
      const button =
        event.target.closest(
          "[data-add-song]"
        );

      if (!button) {
        return;
      }

      const songId =
        button.dataset.addSong;

      addSongToSetlist(songId);
    }
  );


/* ========================================
   曲を追加
======================================== */

function addSongToSetlist(songId) {
  if (!getSongById(songId)) {
    return;
  }

  if (
    selectedSongIds.includes(
      songId
    )
  ) {
    showSetlistToast(
      "ALREADY ADDED"
    );

    return;
  }

  selectedSongIds.push(songId);

  updateSetlist();

  saveSetlistData();

  showSetlistToast(
    "SONG ADDED"
  );
}


/* ========================================
   選択済みリスト表示
======================================== */

function renderSelectedSongs() {
  if (!selectedSetlist) {
    return;
  }

  const selectedSongs =
    getSelectedSongs();

  selectedSetlist.innerHTML = "";

  selectedSongs.forEach(
    (song, index) => {
      const item =
        document.createElement(
          "article"
        );

      item.className =
        "selected-song-item";

      item.dataset.songId =
        song.id;

      item.innerHTML = `
        <span class="selected-song-number">
          ${String(index + 1)
            .padStart(2, "0")}
        </span>

        <img
          class="selected-song-image"
          src="${escapeHtml(song.image)}"
          alt="${escapeHtml(song.title)}"
          loading="lazy"
        >

        <div class="selected-song-info">

          <h4>
            ${escapeHtml(song.title)}
          </h4>

          <p>
            ${escapeHtml(song.album)}
          </p>

        </div>

        <div class="selected-song-controls">

          <button
            class="move-song-button"
            type="button"
            data-move-song="up"
            data-song-id="${escapeHtml(song.id)}"
            aria-label="${escapeHtml(song.title)}を上へ移動"
            ${index === 0 ? "disabled" : ""}
          >
            ↑
          </button>

          <button
            class="move-song-button"
            type="button"
            data-move-song="down"
            data-song-id="${escapeHtml(song.id)}"
            aria-label="${escapeHtml(song.title)}を下へ移動"
            ${
              index ===
              selectedSongs.length - 1
                ? "disabled"
                : ""
            }
          >
            ↓
          </button>

          <button
            class="remove-song-button"
            type="button"
            data-remove-song="${escapeHtml(song.id)}"
            aria-label="${escapeHtml(song.title)}を削除"
          >
            ×
          </button>

        </div>
      `;

      selectedSetlist.appendChild(
        item
      );
    }
  );

  if (emptySetlist) {
    emptySetlist.hidden =
      selectedSongs.length !== 0;
  }
}


/* ========================================
   選択済みリスト操作
======================================== */

selectedSetlist
  ?.addEventListener(
    "click",
    (event) => {
      const removeButton =
        event.target.closest(
          "[data-remove-song]"
        );

      if (removeButton) {
        removeSongFromSetlist(
          removeButton.dataset.removeSong
        );

        return;
      }

      const moveButton =
        event.target.closest(
          "[data-move-song]"
        );

      if (!moveButton) {
        return;
      }

      moveSong(
        moveButton.dataset.songId,
        moveButton.dataset.moveSong
      );
    }
  );


/* ========================================
   曲を削除
======================================== */

function removeSongFromSetlist(songId) {
  selectedSongIds =
    selectedSongIds.filter(
      (selectedId) => {
        return selectedId !== songId;
      }
    );

  updateSetlist();

  saveSetlistData();

  showSetlistToast(
    "SONG REMOVED"
  );
}


/* ========================================
   曲を上下移動
======================================== */

function moveSong(
  songId,
  direction
) {
  const currentIndex =
    selectedSongIds.indexOf(
      songId
    );

  if (currentIndex < 0) {
    return;
  }

  const targetIndex =
    direction === "up"
      ? currentIndex - 1
      : currentIndex + 1;

  if (
    targetIndex < 0 ||
    targetIndex >=
      selectedSongIds.length
  ) {
    return;
  }

  [
    selectedSongIds[currentIndex],
    selectedSongIds[targetIndex]
  ] = [
    selectedSongIds[targetIndex],
    selectedSongIds[currentIndex]
  ];

  updateSetlist();

  saveSetlistData();
}


/* ========================================
   ランダム追加
======================================== */

addRandomSongButton
  ?.addEventListener(
    "click",
    () => {
      const unselectedSongs =
        setlistSongs.filter((song) => {
          return !selectedSongIds.includes(
            song.id
          );
        });

      if (
        unselectedSongs.length === 0
      ) {
        showSetlistToast(
          "ALL SONGS ADDED"
        );

        return;
      }

      const randomSong =
        unselectedSongs[
          Math.floor(
            Math.random() *
            unselectedSongs.length
          )
        ];

      addSongToSetlist(
        randomSong.id
      );
    }
  );


/* ========================================
   シャッフル
======================================== */

shuffleSetlistButton
  ?.addEventListener(
    "click",
    () => {
      if (
        selectedSongIds.length < 2
      ) {
        showSetlistToast(
          "ADD MORE SONGS"
        );

        return;
      }

      for (
        let index =
          selectedSongIds.length - 1;

        index > 0;

        index--
      ) {
        const randomIndex =
          Math.floor(
            Math.random() *
            (index + 1)
          );

        [
          selectedSongIds[index],
          selectedSongIds[randomIndex]
        ] = [
          selectedSongIds[randomIndex],
          selectedSongIds[index]
        ];
      }

      updateSetlist();

      saveSetlistData();

      showSetlistToast(
        "SETLIST SHUFFLED"
      );
    }
  );


/* ========================================
   全削除
======================================== */

clearSetlistButton
  ?.addEventListener(
    "click",
    () => {
      if (
        selectedSongIds.length === 0
      ) {
        return;
      }

      const shouldClear =
        window.confirm(
          "セットリストの曲をすべて削除しますか？"
        );

      if (!shouldClear) {
        return;
      }

      selectedSongIds = [];

      updateSetlist();

      saveSetlistData();

      showSetlistToast(
        "SETLIST CLEARED"
      );
    }
  );


/* ========================================
   検索
======================================== */

setlistSongSearch
  ?.addEventListener(
    "input",
    () => {
      renderAvailableSongs();

      updateClearSearchButton();
    }
  );


setlistSongSearch
  ?.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") {
        return;
      }

      clearSetlistKeyword();
    }
  );


function clearSetlistKeyword() {
  if (!setlistSongSearch) {
    return;
  }

  setlistSongSearch.value = "";

  renderAvailableSongs();

  updateClearSearchButton();

  setlistSongSearch.focus();
}


clearSetlistSearch
  ?.addEventListener(
    "click",
    clearSetlistKeyword
  );


function updateClearSearchButton() {
  if (
    !clearSetlistSearch ||
    !setlistSongSearch
  ) {
    return;
  }

  clearSetlistSearch.hidden =
    setlistSongSearch.value.length ===
    0;
}


/* ========================================
   フィルター
======================================== */

setlistFilterButtons.forEach(
  (button) => {
    button.addEventListener(
      "click",
      () => {
        activeSetlistFilter =
          button.dataset.filter ||
          "all";

        setlistFilterButtons.forEach(
          (item) => {
            item.classList.toggle(
              "active",
              item === button
            );
          }
        );

        renderAvailableSongs();
      }
    );
  }
);


/* ========================================
   件数・時間更新
======================================== */

function updateSetlistInformation() {
  const selectedSongs =
    getSelectedSongs();

  const count =
    selectedSongs.length;

  const countText =
    String(count).padStart(2, "0");

  if (availableSongCount) {
    availableSongCount.textContent =
      String(setlistSongs.length)
        .padStart(3, "0");
  }

  if (heroSelectedCount) {
    heroSelectedCount.textContent =
      String(count).padStart(3, "0");
  }

  if (previewSelectedCount) {
    previewSelectedCount.textContent =
      countText;
  }

  if (selectedSongCount) {
    selectedSongCount.textContent =
      `${countText} FILES`;
  }

  if (summarySongCount) {
    summarySongCount.textContent =
      countText;
  }

  const totalSeconds =
    selectedSongs.reduce(
      (total, song) => {
        return (
          total +
          Number(song.duration || 0)
        );
      },
      0
    );

  if (setlistDuration) {
    setlistDuration.textContent =
      formatSetlistDuration(
        totalSeconds
      );
  }

  updatePracticeMode(
    selectedSongs
  );
}


/* ========================================
   合計時間
======================================== */

function formatSetlistDuration(
  seconds
) {
  const safeSeconds =
    Math.max(
      0,
      Number(seconds) || 0
    );

  const hours =
    Math.floor(
      safeSeconds / 3600
    );

  const minutes =
    Math.floor(
      (safeSeconds % 3600) /
      60
    );

  const remainingSeconds =
    Math.floor(
      safeSeconds % 60
    );

  if (hours > 0) {
    return (
      `${hours}:` +
      `${String(minutes)
        .padStart(2, "0")}:` +
      `${String(remainingSeconds)
        .padStart(2, "0")}`
    );
  }

  return (
    `${String(minutes)
      .padStart(2, "0")}:` +
    `${String(remainingSeconds)
      .padStart(2, "0")}`
  );
}


/* ========================================
   練習モード
======================================== */

function updatePracticeMode(
  selectedSongs
) {
  const firstSong =
    selectedSongs[0];

  if (!firstSong) {
    if (practiceFirstSong) {
      practiceFirstSong.textContent =
        "NO SONG SELECTED";
    }

    if (practiceDescription) {
      practiceDescription.textContent =
        "セットリストへ曲を追加してください。";
    }

    if (startPracticeButton) {
      startPracticeButton.disabled =
        true;
    }

    return;
  }

  if (practiceFirstSong) {
    practiceFirstSong.textContent =
      firstSong.title;
  }

  if (practiceDescription) {
    practiceDescription.textContent =
      `${selectedSongs.length}曲のセットリストを先頭から開始します。`;
  }

  if (startPracticeButton) {
    startPracticeButton.disabled =
      false;
  }
}


startPracticeButton
  ?.addEventListener(
    "click",
    () => {
      const firstSong =
        getSelectedSongs()[0];

      if (!firstSong) {
        return;
      }

      /*
        現在の練習位置を保存
      */
      try {
        localStorage.setItem(
          "skzLyricLabPracticeIndex",
          "0"
        );
      } catch (error) {
        console.warn(
          "練習位置を保存できませんでした",
          error
        );
      }

      window.location.href =
        firstSong.url;
    }
  );


/* ========================================
   全表示更新
======================================== */

function updateSetlist() {
  renderAvailableSongs();

  renderSelectedSongs();

  updateSetlistInformation();
}


/* ========================================
   保存
======================================== */

function saveSetlistData(
  showMessage = false
) {
  try {
    localStorage.setItem(
      SETLIST_STORAGE_KEY,
      JSON.stringify(
        selectedSongIds
      )
    );

    if (setlistName) {
      localStorage.setItem(
        SETLIST_NAME_KEY,
        setlistName.value
      );
    }

    updateSaveStatus(
      "SAVED"
    );

    if (showMessage) {
      showSetlistToast(
        "SETLIST SAVED"
      );
    }
  } catch (error) {
    console.error(
      "セットリストを保存できませんでした",
      error
    );

    updateSaveStatus(
      "SAVE ERROR"
    );
  }
}


saveSetlistButton
  ?.addEventListener(
    "click",
    () => {
      saveSetlistData(true);
    }
  );


/* ========================================
   保存済みデータ読込
======================================== */

function loadSetlistData() {
  try {
    const savedSetlist =
      localStorage.getItem(
        SETLIST_STORAGE_KEY
      );

    if (savedSetlist) {
      const parsed =
        JSON.parse(savedSetlist);

      if (Array.isArray(parsed)) {
        selectedSongIds =
          parsed.filter((songId) => {
            return Boolean(
              getSongById(songId)
            );
          });
      }
    }

    const savedName =
      localStorage.getItem(
        SETLIST_NAME_KEY
      );

    if (
      savedName &&
      setlistName
    ) {
      setlistName.value =
        savedName;
    }
  } catch (error) {
    console.warn(
      "保存済みセットリストを読み込めませんでした",
      error
    );

    selectedSongIds = [];
  }
}


/* ========================================
   セットリスト名の自動保存
======================================== */

setlistName?.addEventListener(
  "input",
  () => {
    updateSaveStatus(
      "EDITING"
    );

    if (saveStatusTimer) {
      window.clearTimeout(
        saveStatusTimer
      );
    }

    saveStatusTimer =
      window.setTimeout(() => {
        saveSetlistData();
      }, 450);
  }
);


/* ========================================
   保存状態
======================================== */

function updateSaveStatus(status) {
  if (!setlistSaveStatus) {
    return;
  }

  setlistSaveStatus.textContent =
    status;
}


/* ========================================
   テキスト作成
======================================== */

function createSetlistText() {
  const selectedSongs =
    getSelectedSongs();

  const name =
    setlistName?.value.trim() ||
    "MY SKZ SETLIST";

  const lines = [
    name,
    "━━━━━━━━━━━━━━"
  ];

  selectedSongs.forEach(
    (song, index) => {
      const karaoke =
        song.karaoke.length > 0
          ? ` [${song.karaoke.join(" / ")}]`
          : "";

      lines.push(
        `${index + 1}. ${song.title}${karaoke}`
      );
    }
  );

  lines.push(
    "━━━━━━━━━━━━━━"
  );

  lines.push(
    `TOTAL：${selectedSongs.length} SONGS`
  );

  return lines.join("\n");
}


/* ========================================
   コピー
======================================== */

copySetlistButton
  ?.addEventListener(
    "click",
    async () => {
      if (
        selectedSongIds.length === 0
      ) {
        showSetlistToast(
          "SETLIST IS EMPTY"
        );

        return;
      }

      const text =
        createSetlistText();

      try {
        await navigator.clipboard
          .writeText(text);

        showSetlistToast(
          "SETLIST COPIED"
        );
      } catch (error) {
        copyTextFallback(text);
      }
    }
  );


function copyTextFallback(text) {
  const textarea =
    document.createElement(
      "textarea"
    );

  textarea.value = text;

  textarea.setAttribute(
    "readonly",
    ""
  );

  textarea.style.position =
    "fixed";

  textarea.style.opacity =
    "0";

  document.body.appendChild(
    textarea
  );

  textarea.select();

  try {
    document.execCommand(
      "copy"
    );

    showSetlistToast(
      "SETLIST COPIED"
    );
  } catch (error) {
    showSetlistToast(
      "COPY FAILED"
    );
  }

  textarea.remove();
}


/* ========================================
   通知
======================================== */

function showSetlistToast(message) {
  if (!setlistToast) {
    return;
  }

  setlistToast.textContent =
    message;

  setlistToast.classList.add(
    "is-visible"
  );

  if (toastTimer) {
    window.clearTimeout(
      toastTimer
    );
  }

  toastTimer =
    window.setTimeout(() => {
      setlistToast.classList.remove(
        "is-visible"
      );
    }, 1700);
}


/* ========================================
   起動画面
======================================== */

function runSetlistLoader() {
  if (
    !setlistLoader ||
    !setlistLoaderProgress ||
    !setlistLoaderPercent ||
    !setlistLoaderMessage
  ) {
    return;
  }

  let progress = 0;

  const messages = [
    "PREPARING PERFORMANCE FILE...",
    "LOADING SONG DATABASE...",
    "RESTORING SETLIST DATA...",
    "SETLIST EDITOR READY."
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

      setlistLoaderProgress.style.width =
        `${progress}%`;

      setlistLoaderPercent.textContent =
        `${progress}%`;

      if (progress < 34) {
        setlistLoaderMessage.textContent =
          messages[0];

      } else if (progress < 65) {
        setlistLoaderMessage.textContent =
          messages[1];

      } else if (progress < 94) {
        setlistLoaderMessage.textContent =
          messages[2];

      } else {
        setlistLoaderMessage.textContent =
          messages[3];
      }

      if (progress === 100) {
        window.clearInterval(timer);

        window.setTimeout(() => {
          setlistLoader.classList.add(
            "is-hidden"
          );
        }, 350);
      }
    }, 80);
}


/* ========================================
   メニュー
======================================== */

function closeSetlistMenu() {
  if (
    !setlistNav ||
    !setlistMenuButton
  ) {
    return;
  }

  setlistNav.classList.remove(
    "is-open"
  );

  setlistMenuButton.classList.remove(
    "is-active"
  );

  setlistMenuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  document.body.classList.remove(
    "menu-open"
  );
}


function toggleSetlistMenu() {
  if (
    !setlistNav ||
    !setlistMenuButton
  ) {
    return;
  }

  const isOpen =
    setlistNav.classList.toggle(
      "is-open"
    );

  setlistMenuButton.classList.toggle(
    "is-active",
    isOpen
  );

  setlistMenuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  document.body.classList.toggle(
    "menu-open",
    isOpen
  );
}


setlistMenuButton
  ?.addEventListener(
    "click",
    toggleSetlistMenu
  );


setlistNav
  ?.querySelectorAll("a")
  .forEach((link) => {
    link.addEventListener(
      "click",
      closeSetlistMenu
    );
  });


/* ========================================
   Reveal
======================================== */

function activateSetlistReveal() {
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
    if (!setlistPointerGlow) {
      return;
    }

    setlistPointerGlow.style.left =
      `${event.clientX}px`;

    setlistPointerGlow.style.top =
      `${event.clientY}px`;
  }
);


/* ========================================
   ページトップ
======================================== */

function updateSetlistPageTop() {
  if (!setlistPageTop) {
    return;
  }

  setlistPageTop.classList.toggle(
    "is-visible",
    window.scrollY > 700
  );
}


window.addEventListener(
  "scroll",
  updateSetlistPageTop,
  {
    passive: true
  }
);


setlistPageTop
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
   ページ内リンク
======================================== */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(
            targetId
          );

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    );
  });

  /* ========================================
   LIVE SETLIST DATABASE
======================================== */

/*
  この配列はサイト管理者だけが編集する。

  country:
    japan / korea / online

  type:
    本公演・追加公演・オンラインなど

  songs内のtype:
    main   → 本編
    encore → アンコール

  titleがsetlistSongsの曲名と一致すると、
  歌詞ページへのリンクが自動で付く。
*/

const liveSetlists = [

  {
  id: "runit-seoul-day1",

  tourId: "seoul-runit",

  tour:
    "Stray Kids World Tour 〈RUN IT〉",

  day:
    "DAY 1",

  type:
    "LIVE",

  date:
    "2026.07.25",

  year: 2026,

  venue:
    "KSPO DOME",

  city:
    "SEOUL",

  country:
    "korea",

  countryLabel:
    "KOREA",

  note:
    "KSPO DOME公演1日目のセットリストです。",

    songs: [
      {
        title: "VCR",
        type: "vcr"
      },
      {
        title: "Hall Of Fame",
        type: "main"
      },
      {
        title: "Hellevator",
        type: "main"
      },
      {
        title: "District 9",
        type: "main"
      },
      {
        title: "Miroh + Levanter + I Am You Medley",
        type: "main"
      },
      {
        title: "Side Effects",
        type: "main"
      },
      {
        title: "Double Knot",
        type: "Ment"
      },
      {
        title: "Back Door",
        type: "main"
      },
      {
        title: "MANIAC",
        type: "main"
      },
      {
        title: "God’s Menu",
        type: "vcr"
      },
      {
        title: "CREED",
        type: "main"
      },
      {
        title: "Slash",
        type: "main"
      },
      {
        title: "DIVINE",
        type: "main"
      },
      {
        title: "Thunderous",
        type: "ment"
      },
      {
        title: "In My Head",
        type: "main"
      },
      {
        title: "I Do",
        type: "main"
      },
      {
        title: "Blind Spot",
        type: "vcr"
      },
      {
        title: "BLEEP",
        type: "main"
      },
      {
        title: "Do It",
        type: "main"
      },
      {
        title: "LALALALA",
        type: "main"
      },
      {
        title: "CEREMONY",
        type: "ment"
      },
      {
        title: "Chk Chk Boom",
        type: "main"
      },
      {
        title: "S-Class",
        type: "main"
      },
      {
        title: "RUN IT",
        type: "encore"
      },
      {
        title: "Stray Kids",
        type: "encore"
      },
      {
        title: "Phoenix",
        type: "ment"
      },
      {
        title: "After You",
        type: "encore"
      },
      {
        title: "Social Path",
        type: "encore"
      },
      {
        title: "MIROH",
        type: "ment"
      },
      {
        title: "TOPLINE",
        type: "encore"
      },
      {
        title: "Star Lost",
        type: "encore"
      }
    ]
  },
 {
    id: "runit-seoul-day2",

    tourId: "seoul-runit",

    tour:
        "Stray Kids World Tour 〈RUN IT〉",

    day:
        "DAY 2",

    type:
        "LIVE",

    date:
        "2026.07.26",

    year: 2026,

    venue:
        "KSPO DOME",

    city:
        "SEOUL",

    country:
        "korea",

    countryLabel:
        "KOREA",

    note:
        "KSPO DOME公演2日目のセットリストです。",

        songs: [
        {
            title: "VCR",
            type: "vcr"
        },
        {
            title: "Hall Of Fame",
            type: "main"
        },
        {
            title: "HELLAVATOR",
            type: "main"
        },
        {
            title: "District 9",
            type: "main"
        },
        {
            title: "Miroh + Levanter + I Am You Medley",
            type: "main"
        },
        {
            title: "Side Effects",
            type: "main"
        },
        {
            title: "Double Knot",
            type: "Ment"
        },
        {
            title: "Back Door",
            type: "main"
        },
        {
            title: "MANIAC",
            type: "main"
        },
        {
            title: "God’s Menu",
            type: "vcr"
        },
        {
            title: "CREED",
            type: "main"
        },
        {
            title: "Slash",
            type: "main"
        },
        {
            title: "DIVINE",
            type: "main"
        },
        {
            title: "Thunderous",
            type: "ment"
        },
        {
            title: "In My Head",
            type: "main"
        },
        {
            title: "I Do",
            type: "main"
        },
        {
            title: "Blind Spot",
            type: "vcr"
        },
        {
            title: "BLEEP",
            type: "main"
        },
        {
            title: "Do It",
            type: "main"
        },
        {
            title: "LALALALA",
            type: "main"
        },
        {
            title: "CEREMONY",
            type: "ment"
        },
        {
            title: "Chk Chk Boom",
            type: "main"
        },
        {
            title: "S-Class",
            type: "main"
        },
        {
            title: "RUN IT",
            type: "encore"
        },
        {
            title: "Stray Kids",
            type: "encore"
        },
        {
            title: "Phoenix",
            type: "ment"
        },
        {
            title: "After You",
            type: "encore"
        },
        {
            title: "Social Path",
            type: "encore"
        },
        {
            title: "MIROH",
            type: "ment"
        },
        {
            title: "DO IT",
            type: "encore"
        },
        {
            title: "Side Effects",
            type: "encore"
        }
        ]
    },
     {
    id: "runit-seoul-day3",

    tourId: "seoul-runit",

    tour:
        "Stray Kids World Tour 〈RUN IT〉",

    day:
        "DAY 3",

    type:
        "LIVE",

    date:
        "2026.07.29",

    year: 2026,

    venue:
        "KSPO DOME",

    city:
        "SEOUL",

    country:
        "korea",

    countryLabel:
        "KOREA",

    note:
        "KSPO DOME公演3日目のセットリストです。",

        songs: [
        {
            title: "VCR",
            type: "vcr"
        },
        {
            title: "Hall Of Fame",
            type: "main"
        },
        {
            title: "HELLAVATOR",
            type: "main"
        },
        {
            title: "District 9",
            type: "main"
        },
        {
            title: "Miroh + Levanter + I Am You Medley",
            type: "main"
        },
        {
            title: "Side Effects",
            type: "main"
        },
        {
            title: "Double Knot",
            type: "Ment"
        },
        {
            title: "Back Door",
            type: "main"
        },
        {
            title: "MANIAC",
            type: "main"
        },
        {
            title: "God’s Menu",
            type: "vcr"
        },
        {
            title: "CREED",
            type: "main"
        },
        {
            title: "Slash",
            type: "main"
        },
        {
            title: "DIVINE",
            type: "main"
        },
        {
            title: "Thunderous",
            type: "ment"
        },
        {
            title: "In My Head",
            type: "main"
        },
        {
            title: "I Do",
            type: "main"
        },
        {
            title: "Blind Spot",
            type: "vcr"
        },
        {
            title: "BLEEP",
            type: "main"
        },
        {
            title: "Do It",
            type: "main"
        },
        {
            title: "LALALALA",
            type: "main"
        },
        {
            title: "CEREMONY",
            type: "ment"
        },
        {
            title: "Chk Chk Boom",
            type: "main"
        },
        {
            title: "S-Class",
            type: "main"
        },
        {
            title: "RUN IT",
            type: "encore"
        },
        {
            title: "Stray Kids",
            type: "encore"
        },
        {
            title: "Phoenix",
            type: "ment"
        },
        {
            title: "After You",
            type: "encore"
        },
        {
            title: "Social Path",
            type: "encore"
        },
        {
            title: "MIROH",
            type: "ment"
        },
        {
            title: "TA",
            type: "encore"
        },
        {
            title: "Haven",
            type: "encore"
        }
        ]
    },
 {
    id: "runit-seoul-day4",

    tourId: "seoul-runit",

    tour:
        "Stray Kids World Tour 〈RUN IT〉",

    day:
        "DAY 4",

    type:
        "LIVE",

    date:
        "2026.08.01",

    year: 2026,

    venue:
        "KSPO DOME",

    city:
        "SEOUL",

    country:
        "korea",

    countryLabel:
        "KOREA",

    note:
        "KSPO DOME公演4日目のセットリストです。",

        songs: [
        {
            title: "VCR",
            type: "vcr"
        },
        {
            title: "Hall Of Fame",
            type: "main"
        },
        {
            title: "HELLAVATOR",
            type: "main"
        },
        {
            title: "District 9",
            type: "main"
        },
        {
            title: "Miroh + Levanter + I Am You Medley",
            type: "main"
        },
        {
            title: "Side Effects",
            type: "main"
        },
        {
            title: "Double Knot",
            type: "Ment"
        },
        {
            title: "Back Door",
            type: "main"
        },
        {
            title: "MANIAC",
            type: "main"
        },
        {
            title: "God’s Menu",
            type: "vcr"
        },
        {
            title: "CREED",
            type: "main"
        },
        {
            title: "Slash",
            type: "main"
        },
        {
            title: "DIVINE",
            type: "main"
        },
        {
            title: "Thunderous",
            type: "ment"
        },
        {
            title: "In My Head",
            type: "main"
        },
        {
            title: "I Do",
            type: "main"
        },
        {
            title: "Blind Spot",
            type: "vcr"
        },
        {
            title: "BLEEP",
            type: "main"
        },
        {
            title: "Do It",
            type: "main"
        },
        {
            title: "LALALALA",
            type: "main"
        },
        {
            title: "CEREMONY",
            type: "ment"
        },
        {
            title: "Chk Chk Boom",
            type: "main"
        },
        {
            title: "S-Class",
            type: "main"
        },
        {
            title: "RUN IT",
            type: "encore"
        },
        {
            title: "Stray Kids",
            type: "encore"
        },
        {
            title: "Phoenix",
            type: "ment"
        },
        {
            title: "After You",
            type: "encore"
        },
        {
            title: "Social Path",
            type: "encore"
        },
        {
            title: "MIROH",
            type: "ment"
        },
        {
            title: "I Like It",
            type: "encore"
        },
        {
            title: "0801",
            type: "encore"
        }
        ]
    },
 {
    id: "runit-seoul-day5",

    tourId: "seoul-runit",

    tour:
        "Stray Kids World Tour 〈RUN IT〉",

    day:
        "DAY 5",

    type:
        "LIVE",

    date:
        "2026.08.02",

    year: 2026,

    venue:
        "KSPO DOME",

    city:
        "SEOUL",

    country:
        "korea",

    countryLabel:
        "KOREA",

    note:
        "KSPO DOME公演5日目のセットリストです。",

        songs: [
        {
            title: "VCR",
            type: "vcr"
        },
        {
            title: "Hall Of Fame",
            type: "main"
        },
        {
            title: "HELLAVATOR",
            type: "main"
        },
        {
            title: "District 9",
            type: "main"
        },
        {
            title: "Miroh + Levanter + I Am You Medley",
            type: "main"
        },
        {
            title: "Side Effects",
            type: "main"
        },
        {
            title: "Double Knot",
            type: "Ment"
        },
        {
            title: "Back Door",
            type: "main"
        },
        {
            title: "MANIAC",
            type: "main"
        },
        {
            title: "God’s Menu",
            type: "vcr"
        },
        {
            title: "CREED",
            type: "main"
        },
        {
            title: "Slash",
            type: "main"
        },
        {
            title: "DIVINE",
            type: "main"
        },
        {
            title: "Thunderous",
            type: "ment"
        },
        {
            title: "In My Head",
            type: "main"
        },
        {
            title: "I Do",
            type: "main"
        },
        {
            title: "Blind Spot",
            type: "vcr"
        },
        {
            title: "BLEEP",
            type: "main"
        },
        {
            title: "Do It",
            type: "main"
        },
        {
            title: "LALALALA",
            type: "main"
        },
        {
            title: "CEREMONY",
            type: "ment"
        },
        {
            title: "Chk Chk Boom",
            type: "main"
        },
        {
            title: "S-Class",
            type: "main"
        },
        {
            title: "RUN IT",
            type: "encore"
        },
        {
            title: "Stray Kids",
            type: "encore"
        },
        {
            title: "Phoenix",
            type: "ment"
        },
        {
            title: "After You",
            type: "encore"
        },
        {
            title: "Social Path",
            type: "encore"
        },
        {
            title: "MIROH",
            type: "ment"
        },
        {
            title: "Side Effects",
            type: "encore"
        },
        {
            title: "Haveb",
            type: "encore"
        },
        {
            title: "RUN IT",
            type: "encore"
        },
        {
            title: "Boxer",
            type: "encore"
        },
        ]
    },

 {
    id: "runit-tokyo-day5",

    tourId: "tokyou-runit",

    tour:
        "Stray Kids World Tour 〈RUN IT〉",

    day:
        "DAY 1",

    type:
        "LIVE",

    date:
        "2026.08.29",

    year: 2026,

    venue:
        "MUFGスタジアム",

    city:
        "TOKYO",

    country:
        "japan",

    countryLabel:
        "JAPAN",

    note:
        "MUFGスタジアム公演1日目のセットリストです。",

        songs: [
        
        ]
    },

];


/* ========================================
   LIVE ARCHIVE DOM
======================================== */

const setlistModeButtons =
  document.querySelectorAll(
    ".setlist-mode-button"
  );

const setlistModePanels =
  document.querySelectorAll(
    ".setlist-mode-panel"
  );

const heroLiveSetlistCount =
  document.getElementById(
    "heroLiveSetlistCount"
  );

const previewCountLabel =
  document.getElementById(
    "previewCountLabel"
  );

const previewModeText =
  document.getElementById(
    "previewModeText"
  );

const liveSetlistSearch =
  document.getElementById(
    "liveSetlistSearch"
  );

const clearLiveSetlistSearch =
  document.getElementById(
    "clearLiveSetlistSearch"
  );

const liveFilterButtons =
  document.querySelectorAll(
    ".live-filter-button"
  );

const liveYearButtons =
  document.querySelectorAll(
    ".live-year-button"
  );

const liveSetlistGrid =
  document.getElementById(
    "liveSetlistGrid"
  );

const liveSetlistCount =
  document.getElementById(
    "liveSetlistCount"
  );

const liveSetlistNoResults =
  document.getElementById(
    "liveSetlistNoResults"
  );

const resetLiveSetlistSearch =
  document.getElementById(
    "resetLiveSetlistSearch"
  );

const liveSetlistViewer =
  document.getElementById(
    "liveSetlistViewer"
  );

const liveViewerTitle =
  document.getElementById(
    "liveViewerTitle"
  );

const liveViewerDate =
  document.getElementById(
    "liveViewerDate"
  );

const liveViewerVenue =
  document.getElementById(
    "liveViewerVenue"
  );

const liveViewerCity =
  document.getElementById(
    "liveViewerCity"
  );

const liveViewerSongCount =
  document.getElementById(
    "liveViewerSongCount"
  );

const liveViewerFileId =
  document.getElementById(
    "liveViewerFileId"
  );

const liveViewerSongList =
  document.getElementById(
    "liveViewerSongList"
  );

const liveViewerNote =
  document.getElementById(
    "liveViewerNote"
  );

const closeLiveSetlistViewer =
  document.getElementById(
    "closeLiveSetlistViewer"
  );

const copyLiveSetlistButton =
  document.getElementById(
    "copyLiveSetlist"
  );

const useLiveSetlistButton =
  document.getElementById(
    "useLiveSetlist"
  );


/* ========================================
   LIVE ARCHIVE状態
======================================== */

let activeSetlistMode =
  "builder";

let activeLiveFilter =
  "all";

let activeLiveYear =
  "all";

let openedLiveSetlistId =
  null;


/* ========================================
   モード切り替え
======================================== */

function switchSetlistMode(mode) {
  activeSetlistMode =
    mode === "live"
      ? "live"
      : "builder";

  setlistModeButtons.forEach(
    (button) => {
      const isActive =
        button.dataset.setlistMode ===
        activeSetlistMode;

      button.classList.toggle(
        "active",
        isActive
      );

      button.setAttribute(
        "aria-selected",
        String(isActive)
      );
    }
  );

  setlistModePanels.forEach(
    (panel) => {
      const isActive =
        panel.dataset.modePanel ===
        activeSetlistMode;

      panel.hidden =
        !isActive;

      panel.classList.toggle(
        "active",
        isActive
      );

      /*
        hiddenだったReveal要素を表示する
      */
      if (isActive) {
        panel
          .querySelectorAll(
            ".reveal"
          )
          .forEach((item) => {
            item.classList.add(
              "is-visible"
            );
          });
      }
    }
  );

  updateSetlistModePreview();
}


setlistModeButtons.forEach(
  (button) => {
    button.addEventListener(
      "click",
      () => {
        const mode =
          button.dataset.setlistMode;

        switchSetlistMode(mode);
      }
    );
  }
);


/* ========================================
   ヒーロープレビュー切り替え
======================================== */

function updateSetlistModePreview() {
  if (
    activeSetlistMode === "live"
  ) {
    if (previewCountLabel) {
      previewCountLabel.textContent =
        "LIVE ARCHIVE FILES";
    }

    if (previewSelectedCount) {
      previewSelectedCount.textContent =
        String(
          liveSetlists.length
        ).padStart(2, "0");
    }

    if (previewModeText) {
      previewModeText.textContent =
        "MODE / LIVE ARCHIVE";
    }

    return;
  }

  if (previewCountLabel) {
    previewCountLabel.textContent =
      "SELECTED FILES";
  }

  if (previewSelectedCount) {
    previewSelectedCount.textContent =
      String(
        selectedSongIds.length
      ).padStart(2, "0");
  }

  if (previewModeText) {
    previewModeText.textContent =
      "MODE / MY SETLIST";
  }
}


/* ========================================
   ライブの日付
======================================== */

function parseLiveDate(value) {
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
   ライブを新しい順へ
======================================== */

function getSortedLiveSetlists() {
  return [...liveSetlists]
    .sort((first, second) => {
      return (
        parseLiveDate(
          second.date
        ) -
        parseLiveDate(
          first.date
        )
      );
    });
}


/* ========================================
   ライブ検索・絞り込み
======================================== */

function filterLiveSetlists() {
  const keyword =
    normalizeText(
      liveSetlistSearch
        ? liveSetlistSearch.value
        : ""
    );

  const filtered =
    getSortedLiveSetlists()
      .filter((live) => {
        const songTitles =
          Array.isArray(live.songs)
            ? live.songs.map(
                (song) => {
                  return song.title;
                }
              )
            : [];

        const searchableText =
          normalizeText([
            live.tour,
            live.type,
            live.date,
            live.year,
            live.venue,
            live.city,
            live.country,
            live.countryLabel,
            ...songTitles
          ].join(" "));

        const matchesKeyword =
          searchableText.includes(
            keyword
          );

        const matchesCountry =
          activeLiveFilter === "all" ||
          normalizeText(
            live.country
          ) === activeLiveFilter;

        const matchesYear =
          activeLiveYear === "all" ||
          String(live.year) ===
            activeLiveYear;

        return (
          matchesKeyword &&
          matchesCountry &&
          matchesYear
        );
      });

  renderLiveSetlists(filtered);

  updateLiveSearchButtons();

  updateClearLiveSearchButton();
}


/* ========================================
   ライブカード表示
   同じtourIdを1枚のカードにまとめる
======================================== */

function renderLiveSetlists(liveList) {
  if (!liveSetlistGrid) {
    return;
  }

  liveSetlistGrid.innerHTML = "";


  /*
    同じtourIdの公演をグループ化
  */
  const tourGroups = new Map();

  liveList.forEach((live) => {
    const groupId =
      live.tourId || live.id;

    if (!tourGroups.has(groupId)) {
      tourGroups.set(
        groupId,
        []
      );
    }

    tourGroups
      .get(groupId)
      .push(live);
  });


  /*
    Mapを配列へ変換
  */
  const groupedTours =
    Array.from(
      tourGroups.values()
    );


  /*
    カウントは公演数ではなく
    ツアー数を表示
  */
  if (liveSetlistCount) {
    liveSetlistCount.textContent =
      `${String(groupedTours.length)
        .padStart(2, "0")} FILES`;
  }


  if (liveSetlistNoResults) {
    liveSetlistNoResults.hidden =
      groupedTours.length !== 0;
  }


  /*
    1ツアーにつき1カード
  */
  groupedTours.forEach(
    (tourDates, index) => {

      /*
        DAY 1 → DAY 2 → DAY 3の順
      */
      tourDates.sort((a, b) => {
        return String(a.date)
          .localeCompare(
            String(b.date)
          );
      });


      const firstLive =
        tourDates[0];

      const lastLive =
        tourDates[
          tourDates.length - 1
        ];


      /*
        日付表示
      */
      const dateText =
        firstLive.date ===
        lastLive.date
          ? firstLive.date
          : `${firstLive.date} — ${lastLive.date}`;


      /*
        会場名
      */
      const venues = [
        ...new Set(
          tourDates.map(
            (live) => live.venue
          )
        )
      ];

      const venueText =
        venues.join(" / ");


      /*
        DAYボタン
      */
      const dayButtons =
        tourDates.map(
          (live, dayIndex) => {

            const dayLabel =
              live.day ||
              `DAY ${dayIndex + 1}`;

            return `
              <button
                class="live-day-button"
                type="button"
                data-open-live="${escapeHtml(
                  live.id
                )}"
              >
                <span class="live-day-number">
                  ${escapeHtml(
                    dayLabel
                  )}
                </span>

                <span class="live-day-date">
                  ${escapeHtml(
                    live.date
                  )}
                </span>
              </button>
            `;
          }
        )
        .join("");


      const card =
        document.createElement(
          "article"
        );

      card.className =
        "live-setlist-card live-tour-card";


      card.innerHTML = `
        <div class="live-card-top">

          <span class="live-card-file-id">
            LIVE-${String(index + 1)
              .padStart(3, "0")}
          </span>

          <span class="live-card-country">
            ${escapeHtml(
              firstLive.countryLabel
            )}
          </span>

        </div>


        <h3 class="live-card-tour">
          ${escapeHtml(
            firstLive.tour
          )}
        </h3>


        <p class="live-card-type">
          ${String(
            tourDates.length
          ).padStart(2, "0")} SHOWS ARCHIVED
        </p>


        <div class="live-card-meta">

          <div>
            <span>DATE</span>

            <strong>
              ${escapeHtml(
                dateText
              )}
            </strong>
          </div>

          <div>
            <span>VENUE</span>

            <strong>
              ${escapeHtml(
                venueText
              )}
            </strong>
          </div>

          <div>
            <span>DAYS</span>

            <strong>
              ${String(
                tourDates.length
              ).padStart(2, "0")}
            </strong>
          </div>

        </div>


        <div class="live-day-selector">

          <p class="live-day-selector-label">
            SELECT PERFORMANCE
          </p>

          <div class="live-day-buttons">
            ${dayButtons}
          </div>

        </div>
      `;


      liveSetlistGrid.appendChild(
        card
      );
    }
  );
}

/* ========================================
   ライブカードを開く
======================================== */

liveSetlistGrid?.addEventListener(
  "click",
  (event) => {
    const button =
      event.target.closest(
        "[data-open-live]"
      );

    if (!button) {
      return;
    }

    openLiveSetlist(
      button.dataset.openLive
    );
  }
);


/* ========================================
   ライブ詳細表示
======================================== */

function openLiveSetlist(liveId) {
  const live =
    liveSetlists.find(
      (item) => {
        return item.id === liveId;
      }
    );

  if (
    !live ||
    !liveSetlistViewer
  ) {
    return;
  }

  openedLiveSetlistId =
    live.id;

  if (liveViewerTitle) {
    liveViewerTitle.textContent =
      live.tour;
  }

  if (liveViewerDate) {
    liveViewerDate.textContent =
      live.date;
  }

  if (liveViewerVenue) {
    liveViewerVenue.textContent =
      live.venue;
  }

  if (liveViewerCity) {
    liveViewerCity.textContent =
      `${live.city} / ${live.countryLabel}`;
  }

  if (liveViewerSongCount) {
    liveViewerSongCount.textContent =
      String(
        live.songs.length
      ).padStart(2, "0");
  }

  if (liveViewerFileId) {
    liveViewerFileId.textContent =
      live.id.toUpperCase();
  }

  if (liveViewerNote) {
    liveViewerNote.textContent =
      live.note ||
      "登録済みライブセットリスト";
  }

  renderLiveViewerSongs(live);

  liveSetlistViewer.hidden =
    false;

  liveSetlistViewer.classList.add(
    "is-visible"
  );

  window.setTimeout(() => {
    liveSetlistViewer.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 50);
}


/* ========================================
   ライブ詳細の曲順
======================================== */

function renderLiveViewerSongs(live) {
  if (!liveViewerSongList) {
    return;
  }

  liveViewerSongList.innerHTML = "";

  let encoreStarted = false;

  live.songs.forEach((liveSong, index) => {
    const registeredSong =
      findRegisteredSong(
        liveSong.title
      );

    const row =
      document.createElement("div");

    row.className =
      "live-song-row";


    if (
      liveSong.type === "encore" &&
      !encoreStarted
    ) {
      row.classList.add(
        "is-encore"
      );

      encoreStarted = true;
    }


    const titleElement =
      registeredSong
        ? `
          <a
            class="live-song-title"
            href="${escapeHtml(
              registeredSong.url
            )}"
          >
            ${escapeHtml(
              liveSong.title
            )}
          </a>
        `
        : `
          <span class="live-song-title">
            ${escapeHtml(
              liveSong.title
            )}
          </span>
        `;


    const statusElement =
      registeredSong
        ? `
          <a
            class="live-song-status has-file"
            href="${escapeHtml(
              registeredSong.url
            )}"
          >
            LYRIC FILE
          </a>
        `
        : `
          <span class="live-song-status">
            NOT FOUND
          </span>
        `;


    row.innerHTML = `
      <span class="live-song-number">
        ${String(index + 1)
          .padStart(2, "0")}
      </span>

      ${titleElement}

      ${statusElement}
    `;

    liveViewerSongList.appendChild(
      row
    );
  });
}


/* ========================================
   登録曲を曲名から探す
======================================== */

function findRegisteredSong(title) {
  const normalizedTitle =
    normalizeText(title);

  return setlistSongs.find((song) => {
    return (
      normalizeText(song.title) ===
      normalizedTitle
    );
  });
}

/* ========================================
   登録曲を曲名から探す
======================================== */

function findRegisteredSong(title) {
  const normalizedTitle =
    normalizeText(title);

  return setlistSongs.find(
    (song) => {
      return (
        normalizeText(song.title) ===
        normalizedTitle
      );
    }
  );
}


/* ========================================
   詳細を閉じる
======================================== */

closeLiveSetlistViewer
  ?.addEventListener(
    "click",
    () => {
      if (!liveSetlistViewer) {
        return;
      }

      liveSetlistViewer.classList.remove(
        "is-visible"
      );

      liveSetlistViewer.hidden =
        true;

      openedLiveSetlistId =
        null;
    }
  );


/* ========================================
   ライブセトリをコピー
======================================== */

copyLiveSetlistButton
  ?.addEventListener(
    "click",
    async () => {
      const live =
        getOpenedLiveSetlist();

      if (!live) {
        return;
      }

      const text =
        createLiveSetlistText(live);

      try {
        await navigator.clipboard
          .writeText(text);

        showSetlistToast(
          "LIVE SETLIST COPIED"
        );
      } catch (error) {
        copyTextFallback(text);
      }
    }
  );


function createLiveSetlistText(live) {
  const lines = [
    live.tour,
    `${live.date} / ${live.venue}`,
    `${live.city} / ${live.countryLabel}`,
    "━━━━━━━━━━━━━━"
  ];

  let encoreAdded = false;

  live.songs.forEach(
    (song, index) => {
      if (
        song.type === "encore" &&
        !encoreAdded
      ) {
        lines.push("");
        lines.push("ENCORE");
        encoreAdded = true;
      }

      lines.push(
        `${String(index + 1)
          .padStart(2, "0")}. ${song.title}`
      );
    }
  );

  lines.push("━━━━━━━━━━━━━━");

  lines.push(
    `${live.songs.length} SONGS`
  );

  return lines.join("\n");
}


/* ========================================
   LIVEをMY SETLISTへ移す
======================================== */

useLiveSetlistButton
  ?.addEventListener(
    "click",
    () => {
      const live =
        getOpenedLiveSetlist();

      if (!live) {
        return;
      }

      const registeredIds =
        live.songs
          .map((liveSong) => {
            return findRegisteredSong(
              liveSong.title
            );
          })
          .filter(Boolean)
          .map((song) => {
            return song.id;
          });

      /*
        同じ曲の重複を削除
      */
      selectedSongIds = [
        ...new Set(registeredIds)
      ];

      if (setlistName) {
        setlistName.value =
          live.tour;
      }

      updateSetlist();

      saveSetlistData();

      switchSetlistMode(
        "builder"
      );

      showSetlistToast(
        `${selectedSongIds.length} SONGS IMPORTED`
      );

      window.setTimeout(() => {
        document
          .getElementById(
            "setlistBuilder"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
      }, 80);
    }
  );


function getOpenedLiveSetlist() {
  return liveSetlists.find(
    (live) => {
      return (
        live.id ===
        openedLiveSetlistId
      );
    }
  );
}


/* ========================================
   ライブ検索欄
======================================== */

liveSetlistSearch?.addEventListener(
  "input",
  filterLiveSetlists
);


liveSetlistSearch?.addEventListener(
  "keydown",
  (event) => {
    if (event.key !== "Escape") {
      return;
    }

    clearLiveSearch();
  }
);


clearLiveSetlistSearch
  ?.addEventListener(
    "click",
    clearLiveSearch
  );


function clearLiveSearch() {
  if (!liveSetlistSearch) {
    return;
  }

  liveSetlistSearch.value = "";

  filterLiveSetlists();

  liveSetlistSearch.focus();
}


function updateClearLiveSearchButton() {
  if (
    !clearLiveSetlistSearch ||
    !liveSetlistSearch
  ) {
    return;
  }

  clearLiveSetlistSearch.hidden =
    liveSetlistSearch.value.length ===
    0;
}


/* ========================================
   国フィルター
======================================== */

liveFilterButtons.forEach(
  (button) => {
    button.addEventListener(
      "click",
      () => {
        activeLiveFilter =
          button.dataset.liveFilter ||
          "all";

        filterLiveSetlists();
      }
    );
  }
);


/* ========================================
   年代フィルター
======================================== */

liveYearButtons.forEach(
  (button) => {
    button.addEventListener(
      "click",
      () => {
        activeLiveYear =
          button.dataset.liveYear ||
          "all";

        filterLiveSetlists();
      }
    );
  }
);


/* ========================================
   フィルター状態更新
======================================== */

function updateLiveSearchButtons() {
  liveFilterButtons.forEach(
    (button) => {
      button.classList.toggle(
        "active",
        button.dataset.liveFilter ===
          activeLiveFilter
      );
    }
  );

  liveYearButtons.forEach(
    (button) => {
      button.classList.toggle(
        "active",
        button.dataset.liveYear ===
          activeLiveYear
      );
    }
  );
}


/* ========================================
   ライブ検索リセット
======================================== */

resetLiveSetlistSearch
  ?.addEventListener(
    "click",
    () => {
      activeLiveFilter = "all";
      activeLiveYear = "all";

      if (liveSetlistSearch) {
        liveSetlistSearch.value = "";
      }

      filterLiveSetlists();
    }
  );


/* ========================================
   LIVE ARCHIVE初期化
======================================== */

function initLiveSetlistArchive() {
  if (heroLiveSetlistCount) {
    heroLiveSetlistCount.textContent =
      String(
        liveSetlists.length
      ).padStart(3, "0");
  }

  filterLiveSetlists();

  switchSetlistMode(
    "builder"
  );
}


if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initLiveSetlistArchive
  );
} else {
  initLiveSetlistArchive();
}


/* ========================================
   初期化
======================================== */

function initSetlistPage() {
  runSetlistLoader();

  loadSetlistData();

  updateSetlist();

  updateClearSearchButton();

  activateSetlistReveal();

  updateSetlistPageTop();

  updateSaveStatus(
    "READY"
  );
}


if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initSetlistPage
  );
} else {
  initSetlistPage();
}
