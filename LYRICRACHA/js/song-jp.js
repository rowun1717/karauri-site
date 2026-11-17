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

/* 日本語版専用: JP/KR 全表示と各単独表示 */
const viewClassMap = {"jp-all":"all", "kr-all":"all", original:"original", kana:"ruby", japanese:"translation"};
function applyLyricsViewMode(selectedView) {
  document.body.classList.remove("lyrics-view-all", "lyrics-view-original", "lyrics-view-kana", "lyrics-view-japanese", "lyrics-view-jp-all", "lyrics-view-kr-all");
  document.body.classList.add(`lyrics-view-${selectedView}`);
  if (selectedView === "jp-all" || selectedView === "kr-all") document.body.classList.add("lyrics-view-all");
  document.querySelectorAll('.lyric-data').forEach(data => {
    data.querySelectorAll('.line').forEach(line => {
      const isRuby = line.classList.contains('ruby');
      const isOriginal = line.classList.contains('original');
      const isTranslation = line.classList.contains('translation');
      const english = line.classList.contains('jp-main-english');
      const placeholder = line.classList.contains('is-untranslated');
      const japanese = isTranslation && !placeholder;
      let show = false;
      if (selectedView === 'jp-all') show = japanese || (isOriginal && (english || !data.querySelector('.line.translation:not(.is-untranslated)'))) || (isOriginal && !english);
      else if (selectedView === 'kr-all') show = isRuby || isOriginal || japanese;
      else if (selectedView === 'original') show = isOriginal;
      else if (selectedView === 'kana') show = isRuby;
      else if (selectedView === 'japanese') show = japanese || english;
      // The same English lyric must not be shown twice in Japanese-only mode.
      line.classList.toggle('is-hidden', !show);
    });
  });
}
const viewButtons = document.querySelectorAll('.view-button[data-view]');
viewButtons.forEach(button => button.addEventListener('click', () => {
  const mode = button.dataset.view;
  if (!(mode in viewClassMap)) return;
  viewButtons.forEach(item => item.classList.toggle('active', item === button));
  applyLyricsViewMode(mode);
}));

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

/* Mark Korean-language lines and untranslated placeholders.
   The Japanese release source currently lacks Japanese text for some English lines. */
function prepareLanguageAwareLyrics() {
  document.querySelectorAll('.lyric-set').forEach(set => {
    const originals = Array.from(set.querySelectorAll('.line.original'));
    const translations = Array.from(set.querySelectorAll('.line.translation'));
    if (originals.some(line => /[\uac00-\ud7af]/.test(line.textContent))) {
      set.classList.add('has-korean-original');
    }
    let japaneseCount = 0;
    // English lyrics sung in the Japanese version remain main lyrics in ALL.
    // Pair original/translation lines in their existing order, rather than
    // classifying an entire lyric-set (which can mix Korean and English).
    originals.forEach((original, index) => {
      const translation = translations[index];
      if (!translation) return;
      const clean = el => Array.from(el.childNodes)
        .filter(node => !(node.nodeType === 1 && node.classList?.contains('chant-inline')))
        .map(node => node.textContent).join(' ').replace(/\s+/g, ' ').trim();
      const originalText = clean(original);
      const translatedText = clean(translation);
      if (/[A-Za-z]/.test(originalText) &&
          !/[\uac00-\ud7af\u3040-\u30ff\u3400-\u9fff]/.test(originalText) &&
          originalText.replace(/\s+/g, ' ') === translatedText.replace(/\s+/g, ' ')) {
        original.classList.add('jp-main-english');
      }
    });
    translations.forEach(line => {
      const raw = line.textContent.trim();
      if (/[\u3040-\u30ff\u3400-\u9fff]/.test(raw)) {
        japaneseCount++;
      } else {
        line.classList.add('is-untranslated');
      }
    });
    if (japaneseCount === 0) set.classList.add('has-no-japanese');
  });
}

function initSongPage() {
  prepareLanguageAwareLyrics();
  applyLyricsViewMode("jp-all");
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
        <button type="button" data-floating-view="jp-all">JP ver. ALL</button>
        <button type="button" data-floating-view="kr-all">KR ver. ALL</button>
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
    const selected = active?.dataset.view || 'jp-all';
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
