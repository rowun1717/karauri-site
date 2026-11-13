"use strict";


/* ========================================
   JavaScript有効化
======================================== */

document.documentElement.classList.add(
  "js-enabled"
);


/* ========================================
   DOM
======================================== */

const albumLoader =
  document.getElementById(
    "albumLoader"
  );

const albumLoaderProgress =
  document.getElementById(
    "albumLoaderProgress"
  );

const albumLoaderPercent =
  document.getElementById(
    "albumLoaderPercent"
  );

const albumLoaderMessage =
  document.getElementById(
    "albumLoaderMessage"
  );


const albumMenuButton =
  document.getElementById(
    "albumMenuButton"
  );

const albumNav =
  document.getElementById(
    "albumNav"
  );


const albumPointerGlow =
  document.getElementById(
    "albumPointerGlow"
  );


const albumPageTop =
  document.getElementById(
    "albumPageTop"
  );


const trackSearch =
  document.getElementById(
    "trackSearch"
  );

const trackFilterButtons =
  document.querySelectorAll(
    "[data-track-filter]"
  );

const trackCards =
  document.querySelectorAll(
    ".track-card"
  );

const trackResultCount =
  document.getElementById(
    "trackResultCount"
  );

const albumTrackCount =
  document.getElementById(
    "albumTrackCount"
  );

const trackNoResults =
  document.getElementById(
    "trackNoResults"
  );


/* ========================================
   状態
======================================== */

let activeTrackFilter = "all";


/* ========================================
   ローディング
======================================== */

function runAlbumLoader() {
  if (
    !albumLoader ||
    !albumLoaderProgress ||
    !albumLoaderPercent ||
    !albumLoaderMessage
  ) {
    return;
  }


  let progress = 0;


  const messages = [
    "ACCESSING ALBUM FILE...",
    "READING TRACK DATABASE...",
    "VERIFYING LYRIC FILES...",
    "ALBUM ACCESS GRANTED."
  ];


  const timer =
    window.setInterval(() => {

      progress +=
        Math.floor(
          Math.random() * 12
        ) + 5;


      if (progress > 100) {
        progress = 100;
      }


      albumLoaderProgress.style.width =
        `${progress}%`;

      albumLoaderPercent.textContent =
        `${progress}%`;


      if (progress < 32) {

        albumLoaderMessage.textContent =
          messages[0];

      } else if (progress < 63) {

        albumLoaderMessage.textContent =
          messages[1];

      } else if (progress < 92) {

        albumLoaderMessage.textContent =
          messages[2];

      } else {

        albumLoaderMessage.textContent =
          messages[3];

      }


      if (progress === 100) {

        window.clearInterval(
          timer
        );


        window.setTimeout(() => {

          albumLoader.classList.add(
            "is-hidden"
          );

        }, 450);


        window.setTimeout(() => {

          albumLoader.remove();

        }, 1100);

      }

    }, 75);
}


/* ========================================
   メニュー
======================================== */

function openAlbumMenu() {
  if (
    !albumMenuButton ||
    !albumNav
  ) {
    return;
  }


  albumNav.classList.add(
    "is-open"
  );

  albumMenuButton.classList.add(
    "is-active"
  );

  albumMenuButton.setAttribute(
    "aria-expanded",
    "true"
  );

  albumMenuButton.setAttribute(
    "aria-label",
    "メニューを閉じる"
  );

  document.body.classList.add(
    "menu-open"
  );
}


function closeAlbumMenu() {
  if (
    !albumMenuButton ||
    !albumNav
  ) {
    return;
  }


  albumNav.classList.remove(
    "is-open"
  );

  albumMenuButton.classList.remove(
    "is-active"
  );

  albumMenuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  albumMenuButton.setAttribute(
    "aria-label",
    "メニューを開く"
  );

  document.body.classList.remove(
    "menu-open"
  );
}


function toggleAlbumMenu() {
  if (!albumNav) {
    return;
  }


  const isOpen =
    albumNav.classList.contains(
      "is-open"
    );


  if (isOpen) {
    closeAlbumMenu();
  } else {
    openAlbumMenu();
  }
}


albumMenuButton?.addEventListener(
  "click",
  toggleAlbumMenu
);


albumNav
  ?.querySelectorAll("a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      closeAlbumMenu
    );

  });


/* 画面を広げた時にメニューを戻す */

window.addEventListener(
  "resize",
  () => {

    if (window.innerWidth > 980) {
      closeAlbumMenu();
    }

  }
);


/* Escキーでメニューを閉じる */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {
      closeAlbumMenu();
    }

  }
);


/* ========================================
   文字の正規化
======================================== */

function normalizeTrackText(
  value
) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKC")
    .trim();
}


/* ========================================
   トラックフィルター
======================================== */

function matchesTrackCategory(
  trackCard
) {
  if (
    activeTrackFilter === "all"
  ) {
    return true;
  }


  const trackType =
    normalizeTrackText(
      trackCard.dataset.trackType
    );

  const trackStatus =
    normalizeTrackText(
      trackCard.dataset.trackStatus
    );


  /*
    TITLE曲
  */
  if (
    activeTrackFilter === "title"
  ) {
    return trackType === "title";
  }


  /*
    UNIT曲
  */
  if (
    activeTrackFilter === "unit"
  ) {
    return trackType === "unit";
  }


  /*
    歌詞ページ完成済み
  */
  if (
    activeTrackFilter === "lyrics"
  ) {
    return trackStatus === "lyrics";
  }


  return true;
}


/* ========================================
   トラック検索
======================================== */

function filterTracks() {
  const keyword =
    normalizeTrackText(
      trackSearch
        ? trackSearch.value
        : ""
    );


  let visibleCount = 0;


  trackCards.forEach(
    (trackCard) => {

      const trackTitle =
        normalizeTrackText(
          trackCard.dataset.trackTitle
        );


      /*
        カード内の文字も検索対象にする
      */
      const trackText =
        normalizeTrackText(
          trackCard.textContent
        );


      const matchesKeyword =
        trackTitle.includes(
          keyword
        ) ||
        trackText.includes(
          keyword
        );


      const matchesCategory =
        matchesTrackCategory(
          trackCard
        );


      const shouldShow =
        matchesKeyword &&
        matchesCategory;


      trackCard.classList.toggle(
        "is-hidden",
        !shouldShow
      );


      if (shouldShow) {
        visibleCount += 1;
      }

    }
  );


  /*
    表示件数
  */
  if (trackResultCount) {

    const trackLabel =
      visibleCount === 1
        ? "TRACK"
        : "TRACKS";

    trackResultCount.textContent =
      `${String(visibleCount)
        .padStart(2, "0")} ${trackLabel}`;

  }


  /*
    検索結果なし
  */
  if (trackNoResults) {
    trackNoResults.hidden =
      visibleCount !== 0;
  }
}


/* 検索欄 */

trackSearch?.addEventListener(
  "input",
  filterTracks
);


/* フィルターボタン */

trackFilterButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        trackFilterButtons.forEach(
          (item) => {

            item.classList.remove(
              "active"
            );

          }
        );


        button.classList.add(
          "active"
        );


        activeTrackFilter =
          button.dataset.trackFilter ||
          "all";


        filterTracks();

      }
    );

  }
);


/* ========================================
   アルバム総曲数
======================================== */

function updateAlbumTrackCount() {
  const totalTracks =
    trackCards.length;


  if (albumTrackCount) {
    albumTrackCount.textContent =
      String(totalTracks)
        .padStart(2, "0");
  }
}


/* ========================================
   スクロール表示
======================================== */

function activateAlbumReveal() {
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
        threshold: 0.1,
        rootMargin:
          "0px 0px -40px 0px"
      }
    );


  revealItems.forEach(
    (item) => {

      observer.observe(
        item
      );

    }
  );
}


/* ========================================
   マウス発光
======================================== */

window.addEventListener(
  "pointermove",
  (event) => {

    if (!albumPointerGlow) {
      return;
    }


    albumPointerGlow.style.left =
      `${event.clientX}px`;

    albumPointerGlow.style.top =
      `${event.clientY}px`;

  }
);


/* ========================================
   ページトップ
======================================== */

function updateAlbumPageTop() {
  if (!albumPageTop) {
    return;
  }


  albumPageTop.classList.toggle(
    "is-visible",
    window.scrollY > 650
  );
}


window.addEventListener(
  "scroll",
  updateAlbumPageTop,
  {
    passive: true
  }
);


albumPageTop?.addEventListener(
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

function initAlbumDetailPage() {
  runAlbumLoader();

  updateAlbumTrackCount();

  filterTracks();

  activateAlbumReveal();

  updateAlbumPageTop();
}


/*
  scriptがHTML下部にある場合と
  head内にある場合の両方に対応
*/

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initAlbumDetailPage
  );

} else {

  initAlbumDetailPage();

}