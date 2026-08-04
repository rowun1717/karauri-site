"use strict";

let player = null;
let playerReady = false;
let progressTimer = null;


/* =========================
   HTML要素の取得
========================= */

const musicPlayer =
  document.querySelector(".music-player");

const videoId =
  musicPlayer?.dataset.youtubeId;

const playButton =
  document.getElementById("playButton");

const rewindButton =
  document.getElementById("rewindButton");

const forwardButton =
  document.getElementById("forwardButton");

const muteButton =
  document.getElementById("muteButton");

const progressBar =
  document.getElementById("progressBar");

const currentTimeDisplay =
  document.getElementById("currentTime");

const durationDisplay =
  document.getElementById("duration");

const lyricSets =
  document.querySelectorAll(".lyric-set");


/* =========================
   YouTubeプレイヤー作成
========================= */

function createYouTubePlayer() {
  /*
    すでに作成済みなら
    二重作成しない
  */
  if (player) {
    return;
  }

  if (!videoId) {
    console.error(
      "data-youtube-idが設定されていません"
    );

    return;
  }

  const youtubePlayerElement =
    document.getElementById(
      "youtubePlayer"
    );

  if (!youtubePlayerElement) {
    console.error(
      "#youtubePlayerが見つかりません"
    );

    return;
  }

  /*
    YouTube APIがまだ準備前なら
    ここでは作成しない
  */
  if (
    !window.YT ||
    typeof window.YT.Player !==
      "function"
  ) {
    return;
  }

  player =
    new window.YT.Player(
      "youtubePlayer",
      {
        width: "100%",
        height: "315",

        videoId,

        playerVars: {
          controls: 1,
          playsinline: 1,
          rel: 0
        },

        events: {
          onReady:
            handlePlayerReady,

          onStateChange:
            handlePlayerStateChange,

          onError:
            handlePlayerError
        }
      }
    );
}


/*
  YouTube APIが後から
  読み込まれた場合
*/
window.onYouTubeIframeAPIReady =
  function () {
    createYouTubePlayer();
  };


/*
  更新時など、YouTube APIが先に
  読み込まれていた場合にも対応
*/
function initializeYouTubePlayer() {
  if (
    window.YT &&
    typeof window.YT.Player ===
      "function"
  ) {
    createYouTubePlayer();
    return;
  }

  let checkCount = 0;

  const apiCheckTimer =
    window.setInterval(() => {
      checkCount += 1;

      if (
        window.YT &&
        typeof window.YT.Player ===
          "function"
      ) {
        window.clearInterval(
          apiCheckTimer
        );

        createYouTubePlayer();
        return;
      }

      /*
        10秒で確認を終了
      */
      if (checkCount >= 100) {
        window.clearInterval(
          apiCheckTimer
        );

        console.error(
          "YouTube APIを読み込めませんでした"
        );
      }
    }, 100);
}


if (
  document.readyState === "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializeYouTubePlayer
  );
} else {
  initializeYouTubePlayer();
}

/* =========================
   プレイヤー準備完了
========================= */

function handlePlayerReady() {
  playerReady = true;

  console.log(
    "YouTubeプレイヤー準備完了"
  );

  setupLyricClick();

  progressTimer =
    window.setInterval(
      updatePlayerDisplay,
      200
    );

  updatePlayerDisplay();
}


/* =========================
   再生状態の変化
========================= */

function handlePlayerStateChange(event) {
  if (!playButton) {
    return;
  }

  const isPlaying =
    event.data ===
    YT.PlayerState.PLAYING;

  playButton.textContent =
    isPlaying
      ? "Ⅱ"
      : "▶";

  playButton.setAttribute(
    "aria-label",
    isPlaying
      ? "一時停止"
      : "再生"
  );
}


/* =========================
   YouTubeエラー
========================= */

function handlePlayerError(event) {
  console.error(
    "YouTubeプレイヤーエラー:",
    event.data
  );
}


/* =========================
   再生・一時停止
========================= */

playButton?.addEventListener(
  "click",
  function () {
    if (!isPlayerAvailable()) {
      return;
    }

    const state =
      player.getPlayerState();

    if (
      state ===
      YT.PlayerState.PLAYING
    ) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }
);


/* =========================
   10秒戻る
========================= */

rewindButton?.addEventListener(
  "click",
  function () {
    if (!isPlayerAvailable()) {
      return;
    }

    const currentTime =
      player.getCurrentTime() || 0;

    const targetTime =
      Math.max(
        0,
        currentTime - 10
      );

    player.seekTo(
      targetTime,
      true
    );
  }
);


/* =========================
   10秒進む
========================= */

forwardButton?.addEventListener(
  "click",
  function () {
    if (!isPlayerAvailable()) {
      return;
    }

    const currentTime =
      player.getCurrentTime() || 0;

    const duration =
      player.getDuration() || 0;

    const targetTime =
      Math.min(
        duration,
        currentTime + 10
      );

    player.seekTo(
      targetTime,
      true
    );
  }
);


/* =========================
   ミュート
========================= */

muteButton?.addEventListener(
  "click",
  function () {
    if (!isPlayerAvailable()) {
      return;
    }

    if (player.isMuted()) {
      player.unMute();

      muteButton.textContent =
        "🔊";

      muteButton.setAttribute(
        "aria-label",
        "ミュート"
      );
    } else {
      player.mute();

      muteButton.textContent =
        "🔇";

      muteButton.setAttribute(
        "aria-label",
        "ミュート解除"
      );
    }
  }
);


/* =========================
   再生バー操作
========================= */

progressBar?.addEventListener(
  "input",
  function () {
    if (!isPlayerAvailable()) {
      return;
    }

    const duration =
      player.getDuration() || 0;

    if (duration <= 0) {
      return;
    }

    const percent =
      Number(
        progressBar.value
      );

    const targetTime =
      duration *
      (percent / 100);

    player.seekTo(
      targetTime,
      true
    );

    progressBar.style.setProperty(
      "--progress",
      `${percent}%`
    );
  }
);


/* =========================
   歌詞クリック
========================= */

function setupLyricClick() {
  lyricSets.forEach(
    function (lyricSet) {
      lyricSet.addEventListener(
        "click",
        function () {
          if (!isPlayerAvailable()) {
            return;
          }

          const time =
            Number(
              lyricSet.dataset.time
            );

          if (!Number.isFinite(time)) {
            console.warn(
              "data-timeが正しくありません",
              lyricSet
            );

            return;
          }

          console.log(
            "歌詞クリック:",
            time
          );

          player.seekTo(
            time,
            true
          );

          player.playVideo();
        }
      );
    }
  );
}


/* =========================
   時間・バーの更新
========================= */

function updatePlayerDisplay() {
  if (!isPlayerAvailable(false)) {
    return;
  }

  const currentTime =
    player.getCurrentTime() || 0;

  const duration =
    player.getDuration() || 0;

  if (currentTimeDisplay) {
    currentTimeDisplay.textContent =
      formatTime(currentTime);
  }

  if (durationDisplay) {
    durationDisplay.textContent =
      formatTime(duration);
  }

  if (
    progressBar &&
    duration > 0
  ) {
    const percent =
      (
        currentTime /
        duration
      ) * 100;

    progressBar.value =
      String(percent);

    progressBar.style.setProperty(
      "--progress",
      `${percent}%`
    );
  }
}


/* =========================
   プレイヤー使用可能確認
========================= */

function isPlayerAvailable(
  showWarning = true
) {
  const available =
    playerReady &&
    player &&
    typeof player.getPlayerState ===
      "function";

  if (
    !available &&
    showWarning
  ) {
    console.warn(
      "プレイヤーがまだ準備できていません"
    );
  }

  return available;
}


/* =========================
   秒数を0:00形式に変換
========================= */

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const safeSeconds =
    Math.max(
      0,
      seconds
    );

  const minutes =
    Math.floor(
      safeSeconds / 60
    );

  const remainingSeconds =
    Math.floor(
      safeSeconds % 60
    );

  return `${minutes}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}


/* =========================
   ページを閉じる時に停止
========================= */

window.addEventListener(
  "beforeunload",
  function () {
    if (progressTimer) {
      window.clearInterval(
        progressTimer
      );
    }
  }
);