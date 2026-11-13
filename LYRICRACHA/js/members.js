"use strict";


/* ========================================
   DOM
======================================== */

const membersLoader =
  document.getElementById(
    "membersLoader"
  );

const membersLoaderProgress =
  document.getElementById(
    "membersLoaderProgress"
  );

const membersLoaderPercent =
  document.getElementById(
    "membersLoaderPercent"
  );

const membersLoaderMessage =
  document.getElementById(
    "membersLoaderMessage"
  );

const membersMenuButton =
  document.getElementById(
    "membersMenuButton"
  );

const membersNav =
  document.getElementById(
    "membersNav"
  );

const membersPointerGlow =
  document.getElementById(
    "membersPointerGlow"
  );

const membersPageTop =
  document.getElementById(
    "membersPageTop"
  );

const memberQuickNav =
  document.getElementById(
    "memberQuickNav"
  );

const memberQuickLinks =
  document.querySelectorAll(
    "#memberQuickNav a"
  );

const memberCards =
  document.querySelectorAll(
    ".member-file-card"
  );


/* ========================================
   起動画面
======================================== */

function runMembersLoader() {
  if (
    !membersLoader ||
    !membersLoaderProgress ||
    !membersLoaderPercent ||
    !membersLoaderMessage
  ) {
    return;
  }

  let progress = 0;

  const messages = [
    "ACCESSING MEMBER DATABASE...",
    "READING SUBJECT FILES...",
    "LOADING PART COLOR DATA...",
    "ALL SUBJECTS VERIFIED."
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

      membersLoaderProgress.style.width =
        `${progress}%`;

      membersLoaderPercent.textContent =
        `${progress}%`;

      if (progress < 34) {
        membersLoaderMessage.textContent =
          messages[0];

      } else if (progress < 64) {
        membersLoaderMessage.textContent =
          messages[1];

      } else if (progress < 94) {
        membersLoaderMessage.textContent =
          messages[2];

      } else {
        membersLoaderMessage.textContent =
          messages[3];
      }

      if (progress === 100) {
        window.clearInterval(timer);

        window.setTimeout(() => {
          membersLoader.classList.add(
            "is-hidden"
          );
        }, 350);
      }
    }, 80);
}


/* ========================================
   メニュー
======================================== */

function closeMembersMenu() {
  if (
    !membersNav ||
    !membersMenuButton
  ) {
    return;
  }

  membersNav.classList.remove(
    "is-open"
  );

  membersMenuButton.classList.remove(
    "is-active"
  );

  membersMenuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  membersMenuButton.setAttribute(
    "aria-label",
    "メニューを開く"
  );

  document.body.classList.remove(
    "menu-open"
  );
}


function toggleMembersMenu() {
  if (
    !membersNav ||
    !membersMenuButton
  ) {
    return;
  }

  const isOpen =
    membersNav.classList.toggle(
      "is-open"
    );

  membersMenuButton.classList.toggle(
    "is-active",
    isOpen
  );

  membersMenuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  membersMenuButton.setAttribute(
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


membersMenuButton
  ?.addEventListener(
    "click",
    toggleMembersMenu
  );


membersNav
  ?.querySelectorAll("a")
  .forEach((link) => {
    link.addEventListener(
      "click",
      closeMembersMenu
    );
  });


/* ========================================
   Escでメニューを閉じる
======================================== */

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Escape") {
      closeMembersMenu();
    }
  }
);


/* ========================================
   Reveal
======================================== */

function activateMembersReveal() {
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

  const revealObserver =
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
    revealObserver.observe(item);
  });
}


/* ========================================
   メンバーへのスムーズ移動
======================================== */

memberQuickLinks.forEach((link) => {
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

      const headerHeight =
        document.querySelector(
          ".site-header"
        )?.offsetHeight || 72;

      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        24;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });

      /*
        URLの#メンバー名も変更する
      */
      window.history.replaceState(
        null,
        "",
        targetId
      );

      setActiveMemberLink(
        target.id
      );

      /*
        移動先カードを一瞬発光させる
      */
      target.classList.remove(
        "is-targeted"
      );

      window.requestAnimationFrame(
        () => {
          target.classList.add(
            "is-targeted"
          );
        }
      );

      window.setTimeout(() => {
        target.classList.remove(
          "is-targeted"
        );
      }, 1000);
    }
  );
});


/* ========================================
   現在のメンバーリンク
======================================== */

function setActiveMemberLink(
  memberId
) {
  memberQuickLinks.forEach((link) => {
    const linkTarget =
      link.getAttribute("href");

    link.classList.toggle(
      "active",
      linkTarget ===
        `#${memberId}`
    );
  });
}


/* ========================================
   表示中メンバーを検出
======================================== */

function activateMemberTracking() {
  if (
    !memberCards.length ||
    !(
      "IntersectionObserver"
      in window
    )
  ) {
    return;
  }

  const visibleMembers =
    new Map();

  const memberObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleMembers.set(
              entry.target.id,
              entry.intersectionRatio
            );
          } else {
            visibleMembers.delete(
              entry.target.id
            );
          }
        });

        if (
          visibleMembers.size === 0
        ) {
          return;
        }

        const mostVisibleMember =
          [...visibleMembers.entries()]
            .sort(
              (first, second) =>
                second[1] - first[1]
            )[0][0];

        setActiveMemberLink(
          mostVisibleMember
        );
      },
      {
        threshold: [
          0.15,
          0.3,
          0.5,
          0.7
        ],
        rootMargin:
          "-15% 0px -45% 0px"
      }
    );

  memberCards.forEach((card) => {
    memberObserver.observe(card);
  });
}


/* ========================================
   メンバーカードのマウス発光
======================================== */

memberCards.forEach((card) => {
  card.addEventListener(
    "pointermove",
    (event) => {
      const rect =
        card.getBoundingClientRect();

      const pointerX =
        event.clientX -
        rect.left;

      const pointerY =
        event.clientY -
        rect.top;

      card.style.setProperty(
        "--pointer-x",
        `${pointerX}px`
      );

      card.style.setProperty(
        "--pointer-y",
        `${pointerY}px`
      );
    }
  );
});


/* ========================================
   背景のマウス発光
======================================== */

window.addEventListener(
  "pointermove",
  (event) => {
    if (!membersPointerGlow) {
      return;
    }

    membersPointerGlow.style.left =
      `${event.clientX}px`;

    membersPointerGlow.style.top =
      `${event.clientY}px`;
  }
);


/* ========================================
   ページトップ
======================================== */

function updateMembersPageTop() {
  if (!membersPageTop) {
    return;
  }

  membersPageTop.classList.toggle(
    "is-visible",
    window.scrollY > 700
  );
}


window.addEventListener(
  "scroll",
  updateMembersPageTop,
  {
    passive: true
  }
);


membersPageTop
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
   #付きURLで開いた時の位置調整
======================================== */

function scrollToInitialMember() {
  const memberId =
    window.location.hash
      .replace("#", "");

  if (!memberId) {
    return;
  }

  const memberCard =
    document.getElementById(
      memberId
    );

  if (
    !memberCard ||
    !memberCard.classList.contains(
      "member-file-card"
    )
  ) {
    return;
  }

  setActiveMemberLink(
    memberId
  );

  /*
    ローディング画面が閉じてから移動
  */
  window.setTimeout(() => {
    const headerHeight =
      document.querySelector(
        ".site-header"
      )?.offsetHeight || 72;

    const targetTop =
      memberCard
        .getBoundingClientRect()
        .top +
      window.scrollY -
      headerHeight -
      24;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });

    memberCard.classList.add(
      "is-targeted"
    );

    window.setTimeout(() => {
      memberCard.classList.remove(
        "is-targeted"
      );
    }, 1000);
  }, 900);
}


/* ========================================
   画像読み込み失敗時
======================================== */

function activateImageFallback() {
  const memberImages =
    document.querySelectorAll(
      ".member-card-image img"
    );

  memberImages.forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        image.classList.add(
          "image-error"
        );

        image.alt =
          `${image.alt} IMAGE NOT FOUND`;
      }
    );
  });
}


/* ========================================
   初期化
======================================== */

function initMembersPage() {
  runMembersLoader();

  activateMembersReveal();

  activateMemberTracking();

  activateImageFallback();

  updateMembersPageTop();

  scrollToInitialMember();
}


if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initMembersPage
  );
} else {
  initMembersPage();
}