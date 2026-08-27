"use strict";

/* =========================================================
   YouTube player / 2 PLAYER MODE
   - data-youtube-id: ORIGINAL / KANA / ALL で使う原曲
   - data-japanese-youtube-id: JAPANESE で使う日本語版
   - 原曲と日本語版を最初から別々のPlayerとして生成
   - 表示モード切替時に動画IDをloadし直さない
   - 音源切替時は現在秒数・再生/停止・ミュート状態を維持
   - Japanese Ver.がない曲は原曲のまま
   - lyric-set の data-time クリックでその秒数へ移動
   - 日本語版だけ秒数が違う曲は data-time-japanese を任意指定可能
========================================================= */

const musicPlayer = document.querySelector(".music-player");
const playButton = document.getElementById("playButton");
const rewindButton = document.getElementById("rewindButton");
const forwardButton = document.getElementById("forwardButton");
const muteButton = document.getElementById("muteButton");
const progressBar = document.getElementById("progressBar");
const currentTimeLabel = document.getElementById("currentTime");
const durationLabel = document.getElementById("duration");
const lyricSets = document.querySelectorAll(".lyric-set[data-time]");

const originalVideoId =
  musicPlayer?.dataset.youtubeId?.trim() || "";

const japaneseVideoId =
  musicPlayer?.dataset.japaneseYoutubeId?.trim() || "";

let originalPlayer = null;
let japanesePlayer = null;
let originalReady = false;
let japaneseReady = false;
let activeSource = "original";
let progressTimer = null;
let pendingSource = null;


function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const secs = total % 60;

  return `${minutes}:${String(secs).padStart(2, "0")}`;
}


function getActivePlayer() {
  if (
    activeSource === "japanese" &&
    japaneseVideoId &&
    japanesePlayer
  ) {
    return japanesePlayer;
  }

  return originalPlayer;
}


function isPlayerReady(source = activeSource) {
  return source === "japanese"
    ? Boolean(japaneseVideoId && japanesePlayer && japaneseReady)
    : Boolean(originalPlayer && originalReady);
}


function getSafeDuration() {
  const player = getActivePlayer();

  if (!player || !isPlayerReady()) {
    return 0;
  }

  const duration = Number(player.getDuration());

  return Number.isFinite(duration)
    ? duration
    : 0;
}


function updateProgress() {
  const player = getActivePlayer();

  if (!player || !isPlayerReady()) {
    return;
  }

  const current =
    Number(player.getCurrentTime()) || 0;

  const duration = getSafeDuration();

  const percent =
    duration > 0
      ? (current / duration) * 100
      : 0;

  if (progressBar) {
    progressBar.value = String(percent);

    progressBar.style.setProperty(
      "--progress",
      `${Math.max(0, Math.min(100, percent))}%`
    );
  }

  if (currentTimeLabel) {
    currentTimeLabel.textContent = formatTime(current);
  }

  if (durationLabel) {
    durationLabel.textContent = formatTime(duration);
  }

  updatePlayingLyric(current);
}


function startProgressTimer() {
  window.clearInterval(progressTimer);

  progressTimer = window.setInterval(
    updateProgress,
    250
  );
}


function setPlayButtonStateFromActivePlayer() {
  if (!playButton || !window.YT) {
    return;
  }

  const player = getActivePlayer();

  if (!player || !isPlayerReady()) {
    return;
  }

  const isPlaying =
    player.getPlayerState() === YT.PlayerState.PLAYING;

  playButton.textContent = isPlaying
    ? "❚❚"
    : "▶";

  playButton.setAttribute(
    "aria-label",
    isPlaying ? "一時停止" : "再生"
  );
}


function updatePlayingLyric(currentTime) {
  let currentSet = null;

  lyricSets.forEach((set) => {
    const time = getLyricTime(set);

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


function getLyricTime(set) {
  const useJapanese =
    activeSource === "japanese";

  const raw =
    useJapanese && set.dataset.timeJapanese
      ? set.dataset.timeJapanese
      : set.dataset.time;

  const value = Number(raw);

  return Number.isFinite(value)
    ? value
    : NaN;
}


/* =========================
   原曲 / Japanese Ver. 切替
   2つのPlayerを入れ替えるだけ。
   loadVideoById / cueVideoById は使わない。
========================= */

function switchAudioSource(targetSource) {
  const resolvedSource =
    targetSource === "japanese" && japaneseVideoId
      ? "japanese"
      : "original";

  if (resolvedSource === activeSource) {
    return;
  }

  const fromPlayer = getActivePlayer();
  const fromReady = isPlayerReady(activeSource);

  if (!fromPlayer || !fromReady) {
    pendingSource = resolvedSource;
    return;
  }

  const currentTime =
    Number(fromPlayer.getCurrentTime()) || 0;

  const wasPlaying =
    window.YT &&
    fromPlayer.getPlayerState() === YT.PlayerState.PLAYING;

  const wasMuted =
    typeof fromPlayer.isMuted === "function"
      ? fromPlayer.isMuted()
      : false;

  const toPlayer =
    resolvedSource === "japanese"
      ? japanesePlayer
      : originalPlayer;

  if (!toPlayer || !isPlayerReady(resolvedSource)) {
    pendingSource = resolvedSource;
    return;
  }

  fromPlayer.pauseVideo();

  activeSource = resolvedSource;

  toPlayer.seekTo(
    Math.max(0, currentTime),
    true
  );

  if (wasMuted) {
    toPlayer.mute();
  } else {
    toPlayer.unMute();
  }

  if (wasPlaying) {
    toPlayer.playVideo();
  } else {
    toPlayer.pauseVideo();
  }

  pendingSource = null;

  updateProgress();
  setPlayButtonStateFromActivePlayer();
}


function tryPendingSwitch() {
  if (!pendingSource) {
    return;
  }

  if (!isPlayerReady(activeSource)) {
    return;
  }

  if (!isPlayerReady(pendingSource)) {
    return;
  }

  const source = pendingSource;
  pendingSource = null;

  switchAudioSource(source);
}


/* =========================
   song.js の表示切替と同期
========================= */

document.addEventListener(
  "lyricsviewchange",
  (event) => {
    const view = event.detail?.view;

    switchAudioSource(
      view === "japanese"
        ? "japanese"
        : "original"
    );
  }
);


/* =========================
   YouTube Player生成
========================= */

function createYouTubePlayers() {
  if (
    originalPlayer ||
    !musicPlayer ||
    !originalVideoId
  ) {
    return;
  }

  if (
    !window.YT ||
    typeof YT.Player !== "function"
  ) {
    return;
  }

  originalPlayer = new YT.Player(
    "youtubePlayerOriginal",
    {
      videoId: originalVideoId,

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
          setPlayButtonStateFromActivePlayer();
          tryPendingSwitch();
        },

        onStateChange: () => {
          if (activeSource === "original") {
            setPlayButtonStateFromActivePlayer();
            updateProgress();
          }
        }
      }
    }
  );

  if (japaneseVideoId) {
    japanesePlayer = new YT.Player(
      "youtubePlayerJapanese",
      {
        videoId: japaneseVideoId,

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
            if (activeSource === "japanese") {
              setPlayButtonStateFromActivePlayer();
              updateProgress();
            }
          }
        }
      }
    );
  }
}


/* =========================
   YouTube IFrame API
========================= */

window.onYouTubeIframeAPIReady =
  createYouTubePlayers;

if (
  window.YT &&
  typeof YT.Player === "function"
) {
  createYouTubePlayers();
}


/* =========================
   再生 / 一時停止
========================= */

playButton?.addEventListener(
  "click",
  () => {
    const player = getActivePlayer();

    if (!player || !isPlayerReady()) {
      return;
    }

    const isPlaying =
      window.YT &&
      player.getPlayerState() === YT.PlayerState.PLAYING;

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
    const player = getActivePlayer();

    if (!player || !isPlayerReady()) {
      return;
    }

    const target = Math.max(
      0,
      (Number(player.getCurrentTime()) || 0) - 10
    );

    player.seekTo(target, true);
    updateProgress();
  }
);


/* =========================
   10秒進む
========================= */

forwardButton?.addEventListener(
  "click",
  () => {
    const player = getActivePlayer();

    if (!player || !isPlayerReady()) {
      return;
    }

    const duration = getSafeDuration();
    const current =
      Number(player.getCurrentTime()) || 0;

    const target =
      duration > 0
        ? Math.min(duration, current + 10)
        : current + 10;

    player.seekTo(target, true);
    updateProgress();
  }
);


/* =========================
   ミュート
========================= */

muteButton?.addEventListener(
  "click",
  () => {
    const player = getActivePlayer();

    if (!player || !isPlayerReady()) {
      return;
    }

    if (player.isMuted()) {
      player.unMute();

      muteButton.textContent = "🔊";

      muteButton.setAttribute(
        "aria-label",
        "ミュート"
      );
    } else {
      player.mute();

      muteButton.textContent = "🔇";

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
    const player = getActivePlayer();

    if (!player || !isPlayerReady()) {
      return;
    }

    const duration = getSafeDuration();

    if (duration <= 0) {
      return;
    }

    const percent =
      Number(progressBar.value) || 0;

    const target =
      duration * (percent / 100);

    player.seekTo(target, true);
    updateProgress();
  }
);


/* =========================
   歌詞クリック
========================= */

lyricSets.forEach(
  (set) => {
    set.addEventListener(
      "click",
      () => {
        const player = getActivePlayer();

        if (!player || !isPlayerReady()) {
          return;
        }

        const target = getLyricTime(set);

        if (!Number.isFinite(target)) {
          return;
        }

        player.seekTo(target, true);
        player.playVideo();
        updateProgress();
      }
    );
  }
);
