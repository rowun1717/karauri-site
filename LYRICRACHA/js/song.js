"use strict";


/* =========================
   DOM
========================= */

const fileLoader =
  document.getElementById(
    "fileLoader"
  );

const loaderProgress =
  document.getElementById(
    "loaderProgress"
  );

const loaderPercent =
  document.getElementById(
    "loaderPercent"
  );

const loaderMessage =
  document.getElementById(
    "loaderMessage"
  );

const songMenuButton =
  document.getElementById(
    "menuButton"
  );

const songNav =
  document.getElementById(
    "globalNav"
  );

const memberFilterButtons =
  document.querySelectorAll(
    ".member-filter-button"
  );

const lyricBlocks =
  document.querySelectorAll(
    ".lyric-block"
  );

const viewButtons =
  document.querySelectorAll(
    ".view-button"
  );

const fanchantToggle =
  document.getElementById(
    "fanchantToggle"
  );

const lines =
  document.querySelectorAll(
    ".line"
  );

const songPointerGlow =
  document.getElementById(
    "songPointerGlow"
  );

const songPageTop =
  document.getElementById(
    "songPageTop"
  );

/* =========================
   ファイル起動演出
========================= */

function runFileLoader() {
  let progress = 0;

  const messages = [
    "OPENING LYRIC FILE...",
    "DECODING KANA DATA...",
    "IDENTIFYING MEMBER PARTS...",
    "FILE ACCESS GRANTED."
  ];

  const timer =
    window.setInterval(() => {

      progress +=
        Math.floor(
          Math.random() * 13
        ) + 5;

      if (progress > 100) {
        progress = 100;
      }

      loaderProgress.style.width =
        `${progress}%`;

      loaderPercent.textContent =
        `${progress}%`;

      if (progress < 35) {
        loaderMessage.textContent =
          messages[0];
      } else if (progress < 65) {
        loaderMessage.textContent =
          messages[1];
      } else if (progress < 94) {
        loaderMessage.textContent =
          messages[2];
      } else {
        loaderMessage.textContent =
          messages[3];
      }

      if (progress === 100) {
        window.clearInterval(timer);

        window.setTimeout(() => {
          fileLoader.classList.add(
            "is-hidden"
          );
        }, 380);
      }

    }, 85);
}


/* =========================
   メニュー
========================= */

function toggleSongMenu() {
  const isOpen =
    songNav.classList.toggle(
      "is-open"
    );

  songMenuButton.classList.toggle(
    "is-active",
    isOpen
  );

  songMenuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  document.body.classList.toggle(
    "menu-open",
    isOpen
  );
}

songMenuButton.addEventListener(
  "click",
  toggleSongMenu
);

songNav.querySelectorAll("a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        songNav.classList.remove(
          "is-open"
        );

        songMenuButton.classList.remove(
          "is-active"
        );

        songMenuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove(
          "menu-open"
        );

      }
    );

  });


/* =========================
   メンバー絞り込み
========================= */

memberFilterButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        memberFilterButtons.forEach(
          (item) => {
            item.classList.remove(
              "active"
            );
          }
        );

        button.classList.add(
          "active"
        );

        const selectedMember =
          button.dataset.member;


        lyricBlocks.forEach(
          (block) => {

            const member =
              block.dataset.member;

            const backingMember =
              block.dataset.backingMember;


            /* 全歌詞を表示 */
            if (
              selectedMember === "all"
            ) {
              block.classList.remove(
                "is-hidden"
              );

              return;
            }


            /*
              メイン担当または
              バックボーカル担当が一致
            */
            const shouldShow =
              member === selectedMember ||
              member === "all-members" ||
              backingMember ===
                selectedMember;


            block.classList.toggle(
              "is-hidden",
              !shouldShow
            );

          }
        );

      }
    );

  }
);

/* =========================
   歌詞表示切り替え
========================= */

const viewClassMap = {
  all: "all",
  original: "original",
  kana: "ruby",
  ruby: "ruby",
  japanese: "translation",
  translation: "translation"
};


/* 表示モードをbodyへ反映。
   CSSの文字サイズ変更と音源切替イベントに使う。 */
function applyLyricsViewMode(selectedView) {
  const normalizedView =
    selectedView === "ruby" ? "kana" :
    selectedView === "translation" ? "japanese" :
    selectedView;

  document.body.classList.remove(
    "lyrics-view-all",
    "lyrics-view-original",
    "lyrics-view-kana",
    "lyrics-view-japanese"
  );

  document.body.classList.add(
    `lyrics-view-${normalizedView}`
  );

}

viewButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      /*
        data-viewがないボタンは処理しない。
        FANCHANTボタンが歌詞表示を消すのを防ぐ。
      */
      const selectedView =
        button.dataset.view;

      if (!selectedView) {
        return;
      }

      const targetClass =
        viewClassMap[selectedView];

      if (!targetClass) {
        return;
      }

      viewButtons.forEach((item) => {

        /*
          FANCHANTボタンのactiveには触らない
        */
        if (item.dataset.view) {
          item.classList.remove(
            "active"
          );
        }

      });

      button.classList.add(
        "active"
      );

      applyLyricsViewMode(selectedView);

      lines.forEach((line) => {

        if (targetClass === "all") {
          line.classList.remove(
            "is-hidden"
          );

          return;
        }

        const shouldShow =
          line.classList.contains(
            targetClass
          );

        line.classList.toggle(
          "is-hidden",
          !shouldShow
        );

      });

    }
  );

});


/* =========================
   掛け声表示切り替え
========================= */

function updateFanchantButton(
  isVisible
) {
  if (!fanchantToggle) {
    return;
  }

  fanchantToggle.classList.toggle(
    "active",
    isVisible
  );

  fanchantToggle.setAttribute(
    "aria-pressed",
    String(isVisible)
  );

  fanchantToggle.textContent =
    isVisible
      ? "FANCHANT ON"
      : "FANCHANT OFF";
}


fanchantToggle?.addEventListener(
  "click",
  () => {

    const isVisible =
      document.body.classList.toggle(
        "show-fanchant"
      );

    updateFanchantButton(
      isVisible
    );

  }
);



/* =========================
   スクロール表示
========================= */

function activateReveal() {
  const revealItems =
    document.querySelectorAll(
      ".reveal"
    );

  const observer =
    new IntersectionObserver(
      (entries, currentObserver) => {

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
        threshold: 0.12
      }
    );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
}


/* =========================
   マウス発光
========================= */

window.addEventListener(
  "pointermove",
  (event) => {

    songPointerGlow.style.left =
      `${event.clientX}px`;

    songPointerGlow.style.top =
      `${event.clientY}px`;

  }
);


/* =========================
   ページトップ
========================= */

window.addEventListener(
  "scroll",
  () => {

    songPageTop.classList.toggle(
      "is-visible",
      window.scrollY > 700
    );

  }
);

songPageTop.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* =========================
   初期化
========================= */

function initSongPage() {
  applyLyricsViewMode("all");
  runFileLoader();
  activateReveal();
  initFloatingLyricControls();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSongPage, { once: true });
} else {
  initSongPage();
}

/* Floating lyric controls: reuse the existing controls as the single source of truth. */
function initFloatingLyricControls() {
  const originalButtons = Array.from(document.querySelectorAll('.view-button[data-view]'));
  if (!originalButtons.length || document.getElementById('floatingLyricControls')) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'floatingLyricControls';
  wrapper.className = 'floating-lyric-controls';
  wrapper.innerHTML = `
    <div class="floating-lyric-panel" id="floatingLyricPanel" hidden>
      <div class="floating-lyric-title">LYRIC CONTROL</div>
      <div class="floating-lyric-modes" role="group" aria-label="歌詞表示の切り替え">
        <button type="button" data-floating-view="all">ALL DATA</button>
        <button type="button" data-floating-view="original">ORIGINAL</button>
        <button type="button" data-floating-view="kana">KANA</button>
        <button type="button" data-floating-view="japanese">JAPANESE</button>
      </div>
      <button type="button" class="floating-lyric-fanchant" id="floatingFanchant" aria-pressed="false">FANCHANT OFF</button>
    </div>
    <button type="button" class="floating-lyric-trigger" id="floatingLyricTrigger" aria-label="歌詞切り替えメニューを開く" aria-expanded="false" aria-controls="floatingLyricPanel">☷</button>`;
  document.body.appendChild(wrapper);
  const trigger = wrapper.querySelector('#floatingLyricTrigger');
  const panel = wrapper.querySelector('#floatingLyricPanel');
  const floatModes = Array.from(wrapper.querySelectorAll('[data-floating-view]'));
  const floatChant = wrapper.querySelector('#floatingFanchant');
  const sourceChant = document.getElementById('fanchantToggle');
  if (!sourceChant) floatChant.hidden = true;

  function sync() {
    const active = originalButtons.find(button => button.classList.contains('active'));
    const selected = active?.dataset.view || 'all';
    floatModes.forEach(button => {
      const chosen = button.dataset.floatingView === selected;
      button.classList.toggle('active', chosen);
      button.setAttribute('aria-pressed', String(chosen));
    });
    const chantEnabled = document.body.classList.contains('show-fanchant');
    floatChant.classList.toggle('active', chantEnabled);
    floatChant.setAttribute('aria-pressed', String(chantEnabled));
    floatChant.textContent = chantEnabled ? 'FANCHANT ON' : 'FANCHANT OFF';
  }
  function closePanel() {
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', '歌詞切り替えメニューを開く');
    trigger.textContent = '☷';
  }
  trigger.addEventListener('click', () => {
    const shouldOpen = panel.hidden;
    panel.hidden = !shouldOpen;
    trigger.setAttribute('aria-expanded', String(shouldOpen));
    trigger.setAttribute('aria-label', shouldOpen ? '歌詞切り替えメニューを閉じる' : '歌詞切り替えメニューを開く');
    trigger.textContent = shouldOpen ? '×' : '☷';
    sync();
  });
  floatModes.forEach(button => button.addEventListener('click', () => {
    const original = originalButtons.find(item => item.dataset.view === button.dataset.floatingView);
    if (original) original.click();
    sync();
    closePanel();
  }));
  floatChant.addEventListener('click', () => {
    sourceChant?.click();
    sync();
  });
  originalButtons.forEach(button => button.addEventListener('click', sync));
  sourceChant?.addEventListener('click', sync);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closePanel(); });
  document.addEventListener('click', event => {
    if (!panel.hidden && !wrapper.contains(event.target)) closePanel();
  });
  sync();
}
