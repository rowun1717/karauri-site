"use strict";

/* =========================================================
   YouTube player / AUTO MODE

   【1 PLAYER MODE】
   Japanese Ver. がない曲
   HTML:
     data-youtube-id="ORIGINAL_ID"

     <div id="youtubePlayer"></div>

   【2 PLAYER MODE】
   Japanese Ver. がある曲
   HTML:
     data-youtube-id="ORIGINAL_ID"
     data-japanese-youtube-id="JAPANESE_ID"

     <div id="youtubePlayerOriginal"></div>
     <div id="youtubePlayerJapanese"></div>

   2 PLAYER MODEでは動画IDを切り替えず、
   最初から2つのPlayerを生成して切り替える。
========================================================= */

const musicPlayer =
  document.querySelector(".music-player");

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

const currentTimeLabel =
  document.getElementById("currentTime");

const durationLabel =
  document.getElementById("duration");

const lyricSets =
  document.querySelectorAll(".lyric-set[data-time]");


/* =========================
   動画ID
========================= */

const originalVideoId =
  musicPlayer?.dataset.youtubeId?.trim() || "";

const japaneseVideoId =
  musicPlayer?.dataset.japaneseYoutubeId?.trim() || "";


/* =========================
   HTML構造を自動判定
========================= */

const singlePlayerElement =
  document.getElementById("youtubePlayer");

const originalPlayerElement =
  document.getElementById("youtubePlayerOriginal");

const japanesePlayerElement =
  document.getElementById("youtubePlayerJapanese");


/*
  Japanese Ver.のIDがあり、
  2Player用divも両方ある場合だけ
  2 PLAYER MODEにする。
*/
const isTwoPlayerMode =
  Boolean(
    japaneseVideoId &&
    originalPlayerElement &&
    japanesePlayerElement
  );


/* =========================
   Player状態
========================= */

/* 1 PLAYER MODE */
let singlePlayer = null;
let singleReady = false;

/* 2 PLAYER MODE */
let originalPlayer = null;
let japanesePlayer = null;

let originalReady = false;
let japaneseReady = false;

let activeSource = "original";
let pendingSource = null;

let progressTimer = null;


/* =========================
   共通
========================= */

function formatTime(seconds) {
  if (
    !Number.isFinite(seconds) ||
    seconds < 0
  ) {
    return "0:00";
  }

  const total =
    Math.floor(seconds);

  const minutes =
    Math.floor(total / 60);

  const secs =
    total % 60;

  return (
    `${minutes}:` +
    String(secs).padStart(2, "0")
  );
}


function getActivePlayer() {
  if (!isTwoPlayerMode) {
    return singlePlayer;
  }

  if (
    activeSource === "japanese" &&
    japanesePlayer
  ) {
    return japanesePlayer;
  }

  return originalPlayer;
}


function isPlayerReady(source = activeSource) {
  if (!isTwoPlayerMode) {
    return Boolean(
      singlePlayer &&
      singleReady
    );
  }

  if (source === "japanese") {
    return Boolean(
      japaneseVideoId &&
      japanesePlayer &&
      japaneseReady
    );
  }

  return Boolean(
    originalPlayer &&
    originalReady
  );
}


function getSafeDuration() {
  const player =
    getActivePlayer();

  if (
    !player ||
    !isPlayerReady()
  ) {
    return 0;
  }

  const duration =
    Number(player.getDuration());

  return Number.isFinite(duration)
    ? duration
    : 0;
}


/* =========================
   歌詞時間
========================= */

function getLyricTime(set) {
  /*
    Japanese Ver.で
    data-time-japanese がある場合のみ、
    日本語版専用秒数を使う。
  */
  const useJapanese =
    isTwoPlayerMode &&
    activeSource === "japanese";

  const raw =
    useJapanese &&
    set.dataset.timeJapanese
      ? set.dataset.timeJapanese
      : set.dataset.time;

  const value =
    Number(raw);

  return Number.isFinite(value)
    ? value
    : NaN;
}


function updatePlayingLyric(currentTime) {
  let currentSet = null;

  lyricSets.forEach((set) => {
    const time =
      getLyricTime(set);

    if (
      Number.isFinite(time) &&
      time <= currentTime + 0.2
    ) {
      currentSet = set;
    }
  });

  lyricSets.forEach((set) => {
    set.classList.toggle(
      "is-playing",
      set === currentSet
    );
  });
}


/* =========================
   進捗表示
========================= */

function updateProgress() {
  const player =
    getActivePlayer();

  if (
    !player ||
    !isPlayerReady()
  ) {
    return;
  }

  const current =
    Number(player.getCurrentTime()) || 0;

  const duration =
    getSafeDuration();

  const percent =
    duration > 0
      ? (current / duration) * 100
      : 0;

  if (progressBar) {
    progressBar.value =
      String(percent);

    progressBar.style.setProperty(
      "--progress",
      `${Math.max(
        0,
        Math.min(100, percent)
      )}%`
    );
  }

  if (currentTimeLabel) {
    currentTimeLabel.textContent =
      formatTime(current);
  }

  if (durationLabel) {
    durationLabel.textContent =
      formatTime(duration);
  }

  updatePlayingLyric(current);
}


function startProgressTimer() {
  window.clearInterval(
    progressTimer
  );

  progressTimer =
    window.setInterval(
      updateProgress,
      250
    );
}


/* =========================
   再生ボタン表示
========================= */

function setPlayButtonState() {
  if (
    !playButton ||
    !window.YT
  ) {
    return;
  }

  const player =
    getActivePlayer();

  if (
    !player ||
    !isPlayerReady()
  ) {
    return;
  }

  const isPlaying =
    player.getPlayerState() ===
    YT.PlayerState.PLAYING;

  playButton.textContent =
    isPlaying
      ? "❚❚"
      : "▶";

  playButton.setAttribute(
    "aria-label",
    isPlaying
      ? "一時停止"
      : "再生"
  );
}


/* =========================
   2 PLAYER 音源切替
========================= */

function switchAudioSource(targetSource) {
  /*
    1 PLAYER MODEでは
    音源切替処理をしない。
  */
  if (!isTwoPlayerMode) {
    return;
  }

  const resolvedSource =
    targetSource === "japanese"
      ? "japanese"
      : "original";

  if (
    resolvedSource ===
    activeSource
  ) {
    return;
  }

  const fromPlayer =
    getActivePlayer();

  if (
    !fromPlayer ||
    !isPlayerReady(activeSource)
  ) {
    pendingSource =
      resolvedSource;

    return;
  }

  const toPlayer =
    resolvedSource === "japanese"
      ? japanesePlayer
      : originalPlayer;

  if (
    !toPlayer ||
    !isPlayerReady(resolvedSource)
  ) {
    pendingSource =
      resolvedSource;

    return;
  }

  /* 現在位置 */
  const currentTime =
    Number(
      fromPlayer.getCurrentTime()
    ) || 0;

  /* 再生状態 */
  const wasPlaying =
    window.YT &&
    fromPlayer.getPlayerState() ===
      YT.PlayerState.PLAYING;

  /* ミュート状態 */
  const wasMuted =
    typeof fromPlayer.isMuted ===
      "function"
      ? fromPlayer.isMuted()
      : false;

  /*
    旧Playerを止める。
    動画IDのloadし直しはしない。
  */
  fromPlayer.pauseVideo();

  /* 使用Playerを変更 */
  activeSource =
    resolvedSource;

  /* 同じ秒数へ */
  toPlayer.seekTo(
    Math.max(
      0,
      currentTime
    ),
    true
  );

  /* ミュート状態維持 */
  if (wasMuted) {
    toPlayer.mute();
  } else {
    toPlayer.unMute();
  }

  /* 再生状態維持 */
  if (wasPlaying) {
    toPlayer.playVideo();
  } else {
    toPlayer.pauseVideo();
  }

  pendingSource = null;

  updateProgress();
  setPlayButtonState();
}


function tryPendingSwitch() {
  if (
    !isTwoPlayerMode ||
    !pendingSource
  ) {
    return;
  }

  if (
    !isPlayerReady(activeSource)
  ) {
    return;
  }

  if (
    !isPlayerReady(pendingSource)
  ) {
    return;
  }

  const source =
    pendingSource;

  pendingSource = null;

  switchAudioSource(source);
}


/* =========================
   song.js 表示切替と同期
========================= */

document.addEventListener(
  "lyricsviewchange",
  (event) => {
    /*
      Japanese Ver.ありの曲だけ

      JAPANESE
      → 日本版Player

      ALL / ORIGINAL / KANA
      → 原曲Player

      Japanese Ver.なしの曲では
      何もしない。
    */
    if (!isTwoPlayerMode) {
      return;
    }

    const view =
      event.detail?.view;

    switchAudioSource(
      view === "japanese"
        ? "japanese"
        : "original"
    );
  }
);


/* =========================
   1 PLAYER MODE生成
========================= */

function createSinglePlayer() {
  if (
    isTwoPlayerMode ||
    singlePlayer ||
    !singlePlayerElement ||
    !originalVideoId
  ) {
    return;
  }

  singlePlayer =
    new YT.Player(
      "youtubePlayer",
      {
        videoId:
          originalVideoId,

        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          playsinline: 1
        },

        events: {
          onReady: () => {
            singleReady = true;

            startProgressTimer();
            updateProgress();
            setPlayButtonState();
          },

          onStateChange: () => {
            setPlayButtonState();
            updateProgress();
          }
        }
      }
    );
}


/* =========================
   2 PLAYER MODE生成
========================= */

function createTwoPlayers() {
  if (
    !isTwoPlayerMode ||
    originalPlayer ||
    !originalVideoId
  ) {
    return;
  }

  /* ORIGINAL Player */
  originalPlayer =
    new YT.Player(
      "youtubePlayerOriginal",
      {
        videoId:
          originalVideoId,

        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          playsinline: 1
        },

        events: {
          onReady: () => {
            originalReady = true;

            startProgressTimer();
            updateProgress();
            setPlayButtonState();

            tryPendingSwitch();
          },

          onStateChange: () => {
            if (
              activeSource ===
              "original"
            ) {
              setPlayButtonState();
              updateProgress();
            }
          }
        }
      }
    );

  /* JAPANESE Player */
  japanesePlayer =
    new YT.Player(
      "youtubePlayerJapanese",
      {
        videoId:
          japaneseVideoId,

        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          playsinline: 1
        },

        events: {
          onReady: () => {
            japaneseReady = true;

            tryPendingSwitch();
          },

          onStateChange: () => {
            if (
              activeSource ===
              "japanese"
            ) {
              setPlayButtonState();
              updateProgress();
            }
          }
        }
      }
    );
}


/* =========================
   YouTube API 初期化
========================= */

function createYouTubePlayer() {
  if (
    !musicPlayer ||
    !originalVideoId
  ) {
    return;
  }

  if (
    !window.YT ||
    typeof YT.Player !==
      "function"
  ) {
    return;
  }

  if (isTwoPlayerMode) {
    createTwoPlayers();
  } else {
    createSinglePlayer();
  }
}


window.onYouTubeIframeAPIReady =
  createYouTubePlayer;


/*
  APIが先に読み込み済みでも対応
*/
if (
  window.YT &&
  typeof YT.Player ===
    "function"
) {
  createYouTubePlayer();
}


/* =========================
   再生 / 一時停止
========================= */

playButton?.addEventListener(
  "click",
  () => {
    const player =
      getActivePlayer();

    if (
      !player ||
      !isPlayerReady()
    ) {
      return;
    }

    const isPlaying =
      window.YT &&
      player.getPlayerState() ===
        YT.PlayerState.PLAYING;

    if (isPlaying) {
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
  () => {
    const player =
      getActivePlayer();

    if (
      !player ||
      !isPlayerReady()
    ) {
      return;
    }

    const target =
      Math.max(
        0,
        (
          Number(
            player.getCurrentTime()
          ) || 0
        ) - 10
      );

    player.seekTo(
      target,
      true
    );

    updateProgress();
  }
);


/* =========================
   10秒進む
========================= */

forwardButton?.addEventListener(
  "click",
  () => {
    const player =
      getActivePlayer();

    if (
      !player ||
      !isPlayerReady()
    ) {
      return;
    }

    const duration =
      getSafeDuration();

    const current =
      Number(
        player.getCurrentTime()
      ) || 0;

    const target =
      duration > 0
        ? Math.min(
            duration,
            current + 10
          )
        : current + 10;

    player.seekTo(
      target,
      true
    );

    updateProgress();
  }
);


/* =========================
   ミュート
========================= */

muteButton?.addEventListener(
  "click",
  () => {
    const player =
      getActivePlayer();

    if (
      !player ||
      !isPlayerReady()
    ) {
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
   シークバー
========================= */

progressBar?.addEventListener(
  "input",
  () => {
    const player =
      getActivePlayer();

    if (
      !player ||
      !isPlayerReady()
    ) {
      return;
    }

    const duration =
      getSafeDuration();

    if (duration <= 0) {
      return;
    }

    const percent =
      Number(
        progressBar.value
      ) || 0;

    const target =
      duration *
      (percent / 100);

    player.seekTo(
      target,
      true
    );

    updateProgress();
  }
);


/* =========================
   歌詞クリック
========================= */

lyricSets.forEach((set) => {
  set.addEventListener(
    "click",
    () => {
      const player =
        getActivePlayer();

      if (
        !player ||
        !isPlayerReady()
      ) {
        return;
      }

      const target =
        getLyricTime(set);

      if (
        !Number.isFinite(target)
      ) {
        return;
      }

      player.seekTo(
        target,
        true
      );

      player.playVideo();

      updateProgress();
    }
  );
});
