"use strict";


/* ========================================
   DOM
======================================== */

const aboutLoader =
  document.getElementById(
    "aboutLoader"
  );

const aboutLoaderProgress =
  document.getElementById(
    "aboutLoaderProgress"
  );

const aboutLoaderPercent =
  document.getElementById(
    "aboutLoaderPercent"
  );

const aboutLoaderMessage =
  document.getElementById(
    "aboutLoaderMessage"
  );

const aboutMenuButton =
  document.getElementById(
    "aboutMenuButton"
  );

const aboutNav =
  document.getElementById(
    "aboutNav"
  );

const aboutPointerGlow =
  document.getElementById(
    "aboutPointerGlow"
  );

const aboutPageTop =
  document.getElementById(
    "aboutPageTop"
  );

const guideIndexLinks =
  document.querySelectorAll(
    '.guide-index a[href^="#"]'
  );


/* ========================================
   起動画面
======================================== */

function runAboutLoader() {
  if (
    !aboutLoader ||
    !aboutLoaderProgress ||
    !aboutLoaderPercent ||
    !aboutLoaderMessage
  ) {
    return;
  }

  let progress = 0;

  const messages = [
    "OPENING SYSTEM MANUAL...",
    "LOADING GUIDE FILES...",
    "VERIFYING ACCESS DATA...",
    "GUIDE ACCESS GRANTED."
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

      aboutLoaderProgress.style.width =
        `${progress}%`;

      aboutLoaderPercent.textContent =
        `${progress}%`;

      if (progress < 32) {
        aboutLoaderMessage.textContent =
          messages[0];

      } else if (progress < 63) {
        aboutLoaderMessage.textContent =
          messages[1];

      } else if (progress < 92) {
        aboutLoaderMessage.textContent =
          messages[2];

      } else {
        aboutLoaderMessage.textContent =
          messages[3];
      }

      if (progress === 100) {
        window.clearInterval(timer);

        window.setTimeout(() => {
          aboutLoader.classList.add(
            "is-hidden"
          );

          document.body.classList.add(
            "about-loaded"
          );
        }, 420);
      }
    }, 85);
}


/* ========================================
   メニュー
======================================== */

function closeAboutMenu() {
  if (
    !aboutMenuButton ||
    !aboutNav
  ) {
    return;
  }

  aboutNav.classList.remove(
    "is-open"
  );

  aboutMenuButton.classList.remove(
    "is-active"
  );

  aboutMenuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  document.body.classList.remove(
    "menu-open"
  );
}


function toggleAboutMenu() {
  if (
    !aboutMenuButton ||
    !aboutNav
  ) {
    return;
  }

  const isOpen =
    aboutNav.classList.toggle(
      "is-open"
    );

  aboutMenuButton.classList.toggle(
    "is-active",
    isOpen
  );

  aboutMenuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  document.body.classList.toggle(
    "menu-open",
    isOpen
  );
}


aboutMenuButton?.addEventListener(
  "click",
  toggleAboutMenu
);


aboutNav
  ?.querySelectorAll("a")
  .forEach((link) => {
    link.addEventListener(
      "click",
      closeAboutMenu
    );
  });


/* Escapeキーでメニューを閉じる */
document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Escape") {
      closeAboutMenu();
    }
  }
);


/* 画面を広げたときに状態を戻す */
window.addEventListener(
  "resize",
  () => {
    if (window.innerWidth > 900) {
      closeAboutMenu();
    }
  }
);


/* ========================================
   スクロール表示
======================================== */

function activateAboutReveal() {
  const revealItems =
    document.querySelectorAll(
      ".reveal"
    );

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
        threshold: 0.12,
        rootMargin:
          "0px 0px -45px 0px"
      }
    );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
}


/* ========================================
   ページ内リンク
======================================== */

function activateGuideLinks() {
  guideIndexLinks.forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          !targetId.startsWith("#")
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
}


/* ========================================
   現在の項目を表示
======================================== */

function activateCurrentSection() {
  if (
    !(
      "IntersectionObserver" in
      window
    )
  ) {
    return;
  }

  const sections =
    document.querySelectorAll(
      ".about-section[id]"
    );

  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionId =
            entry.target.id;

          guideIndexLinks.forEach(
            (link) => {
              const isCurrent =
                link.getAttribute(
                  "href"
                ) ===
                `#${sectionId}`;

              link.classList.toggle(
                "is-active",
                isCurrent
              );
            }
          );
        });
      },
      {
        rootMargin:
          "-30% 0px -58% 0px",

        threshold: 0
      }
    );

  sections.forEach((section) => {
    observer.observe(section);
  });
}


/* ========================================
   ポインター発光
======================================== */

function activatePointerGlow() {
  if (!aboutPointerGlow) {
    return;
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      aboutPointerGlow.style.left =
        `${event.clientX}px`;

      aboutPointerGlow.style.top =
        `${event.clientY}px`;
    },
    {
      passive: true
    }
  );
}


/* ========================================
   ページトップ
======================================== */

function updateAboutPageTop() {
  if (!aboutPageTop) {
    return;
  }

  aboutPageTop.classList.toggle(
    "is-visible",
    window.scrollY > 650
  );
}


window.addEventListener(
  "scroll",
  updateAboutPageTop,
  {
    passive: true
  }
);


aboutPageTop?.addEventListener(
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

function initAboutPage() {
  runAboutLoader();

  activateAboutReveal();

  activateGuideLinks();

  activateCurrentSection();

  activatePointerGlow();

  updateAboutPageTop();
}


if (
  document.readyState === "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initAboutPage
  );
} else {
  initAboutPage();
}