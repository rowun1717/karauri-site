"use strict";

/* =========================================================
   YouTube Player
   ・通常曲
   ・韓国語版／日本語版の切り替え
   ・埋め込みエラー101／150でNO SOUND表示
========================================================= */

const musicPlayer = document.querySelector(".music-player");

const playButton = document.getElementById("playButton");
const rewindButton = document.getElementById("rewindButton");
const forwardButton = document.getElementById("forwardButton");
const muteButton = document.getElementById("muteButton");
const progressBar = document.getElementById("progressBar");
const currentTimeLabel = document.getElementById("currentTime");
const durationLabel = document.getElementById("duration");

const lyricSets = document.querySelectorAll(
  ".lyric-set[data-time]"
);

const originalVideoId =
  musicPlayer?.dataset.youtubeId?.trim() || "";

const japaneseVideoId =
  musicPlayer?.dataset.japaneseYoutubeId?.trim() || "";

const singlePlayerElement =
  document.getElementById("youtubePlayer");

const originalPlayerElement =
  document.getElementById("youtubePlayerOriginal");

const japanesePlayerElement =
  document.getElementById("youtubePlayerJapanese");

const isTwoPlayerMode = Boolean(
  japaneseVideoId &&
  originalPlayerElement &&
  japanesePlayerElement
);

/* =========================
   Player状態
========================= */

let singlePlayer = null;
let originalPlayer = null;
let japanesePlayer = null;

let singleReady = false;
let originalReady = false;
let japaneseReady = false;

let activeSource = "original";
let pendingSource = null;
let progressTimer = null;

const unavailableSources = new Set();

/* =========================
   NO SOUND
========================= */

function getVideoId(source = activeSource) {
  return source === "japanese"
    ? japaneseVideoId
    : originalVideoId;
}

function getOfficialUrl(source = activeSource) {
  const customUrl =
    source === "japanese"
      ? musicPlayer?.dataset.japaneseYoutubeUrl
      : musicPlayer?.dataset.youtubeUrl;

  if (customUrl?.trim()) {
    return customUrl.trim();
  }

  const videoId = getVideoId(source);

  return videoId
    ? `https://www.youtube.com/watch?v=${encodeURIComponent(
        videoId
      )}`
    : "https://www.youtube.com/";
}

function addNoSoundStyle() {
  if (
    document.getElementById("youtubeNoSoundStyle")
  ) {
    return;
  }

  const style = document.createElement("style");

  style.id = "youtubeNoSoundStyle";

  style.textContent = `
    .music-player.is-no-sound
    > :not(.youtube-no-sound) {
      display: none !important;
    }

    .youtube-no-sound {
      display: none;
      min-height: 210px;
      box-sizing: border-box;
      padding: 30px 22px;
      border: 1px solid rgba(255, 46, 119, 0.42);
      background:
        linear-gradient(
          145deg,
          rgba(255, 46, 119, 0.10),
          transparent 58%
        ),
        rgba(12, 7, 10, 0.88);
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      text-align: center;
    }

    .music-player.is-no-sound
    > .youtube-no-sound {
      display: flex;
    }

    .youtube-no-sound__label {
      color: #ff2e77;
      font-size: 0.72rem;
      font-weight: 900;
      letter-spacing: 0.22em;
    }

    .youtube-no-sound__title {
      color: #ffffff;
      font-size: 1.35rem;
      font-weight: 900;
      letter-spacing: 0.08em;
    }

    .youtube-no-sound__text {
      margin: 0 0 8px;
      color: rgba(255, 255, 255, 0.58);
      font-size: 0.76rem;
      line-height: 1.7;
    }

    .youtube-no-sound__link {
      display: inline-flex;
      min-height: 40px;
      padding: 0 18px;
      border: 1px solid #ff2e77;
      align-items: center;
      justify-content: center;
      color: #ff2e77;
      font-size: 0.68rem;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-decoration: none;
      transition: 0.2s ease;
    }

    .youtube-no-sound__link:hover {
      background: #ff2e77;
      color: #ffffff;
    }
  `;

  document.head.append(style);
}

function showNoSound(source = activeSource) {
  if (!musicPlayer) {
    return;
  }

  addNoSoundStyle();

  let panel = musicPlayer.querySelector(
    ".youtube-no-sound"
  );

  if (!panel) {
    panel = document.createElement("div");
    panel.className = "youtube-no-sound";

    panel.innerHTML = `
      <span class="youtube-no-sound__label">
        PLAYBACK STATUS
      </span>

      <strong class="youtube-no-sound__title">
        NO SOUND
      </strong>

      <p class="youtube-no-sound__text">
        この楽曲はサイト内再生に対応していません。
      </p>

      <a
        class="youtube-no-sound__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        OPEN ON YOUTUBE
      </a>
    `;

    musicPlayer.append(panel);
  }

  const link = panel.querySelector(
    ".youtube-no-sound__link"
  );

  if (link) {
    link.href = getOfficialUrl(source);
  }

  musicPlayer.classList.add("is-no-sound");

  window.clearInterval(progressTimer);

  lyricSets.forEach((set) => {
    set.classList.remove("is-playing");
  });
}

function hideNoSound() {
  musicPlayer?.classList.remove("is-no-sound");
}

function handlePlayerError(event, source) {
  const errorCode = Number(event?.data);

  /*
    101 / 150
    動画所有者によって埋め込みが禁止されている
  */
  if (
    errorCode !== 101 &&
    errorCode !== 150
  ) {
    return;
  }

  unavailableSources.add(source);

  if (
    !isTwoPlayerMode ||
    source === activeSource
  ) {
    showNoSound(source);
  }
}

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

  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const secs = total % 60;

  return `${minutes}:${String(secs).padStart(
    2,
    "0"
  )}`;
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
  const player = getActivePlayer();

  if (
    !player ||
    !isPlayerReady()
  ) {
    return 0;
  }

  const duration = Number(
    player.getDuration()
  );

  return Number.isFinite(duration)
    ? duration
    : 0;
}

/* =========================
   歌詞時間
========================= */

function getLyricTime(set) {
  const useJapanese =
    isTwoPlayerMode &&
    activeSource === "japanese";

  const raw =
    useJapanese &&
    set.dataset.timeJapanese
      ? set.dataset.timeJapanese
      : set.dataset.time;

  const value = Number(raw);

  return Number.isFinite(value)
    ? value
    : NaN;
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

/* =========================
   進捗表示
========================= */

function updateProgress() {
  const player = getActivePlayer();

  if (
    !player ||
    !isPlayerReady()
  ) {
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
  window.clearInterval(progressTimer);

  progressTimer = window.setInterval(
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

  const player = getActivePlayer();

  if (
    !player ||
    !isPlayerReady()
  ) {
    return;
  }

  const isPlaying =
    player.getPlayerState() ===
    YT.PlayerState.PLAYING;

  playButton.textContent = isPlaying
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
   音源切り替え
========================= */

function switchAudioSource(targetSource) {
  if (!isTwoPlayerMode) {
    return;
  }

  const resolvedSource =
    targetSource === "japanese"
      ? "japanese"
      : "original";

  /*
    切り替え先が埋め込み不可なら
    NO SOUNDを表示
  */
  if (
    unavailableSources.has(
      resolvedSource
    )
  ) {
    showNoSound(resolvedSource);
    return;
  }

  hideNoSound();

  if (resolvedSource === activeSource) {
    startProgressTimer();
    return;
  }

  const fromPlayer = getActivePlayer();

  if (
    !fromPlayer ||
    !isPlayerReady(activeSource)
  ) {
    pendingSource = resolvedSource;
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
    pendingSource = resolvedSource;
    return;
  }

  const currentTime =
    Number(fromPlayer.getCurrentTime()) || 0;

  const wasPlaying =
    window.YT &&
    fromPlayer.getPlayerState() ===
      YT.PlayerState.PLAYING;

  const wasMuted =
    typeof fromPlayer.isMuted === "function"
      ? fromPlayer.isMuted()
      : false;

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

  startProgressTimer();
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
    unavailableSources.has(
      pendingSource
    )
  ) {
    const source = pendingSource;
    pendingSource = null;
    showNoSound(source);
    return;
  }

  if (
    !isPlayerReady(activeSource) ||
    !isPlayerReady(pendingSource)
  ) {
    return;
  }

  const source = pendingSource;
  pendingSource = null;

  switchAudioSource(source);
}

/* =========================
   歌詞表示と音源を同期
========================= */

document.addEventListener(
  "lyricsviewchange",
  (event) => {
    if (!isTwoPlayerMode) {
      return;
    }

    const view = event.detail?.view;

    switchAudioSource(
      view === "japanese"
        ? "japanese"
        : "original"
    );
  }
);

/* =========================
   1 PLAYER生成
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

  singlePlayer = new YT.Player(
    "youtubePlayer",
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
          singleReady = true;

          startProgressTimer();
          updateProgress();
          setPlayButtonState();
        },

        onStateChange: () => {
          setPlayButtonState();
          updateProgress();
        },

        onError: (event) => {
          handlePlayerError(
            event,
            "original"
          );
        }
      }
    }
  );
}

/* =========================
   2 PLAYER生成
========================= */

function createTwoPlayers() {
  if (
    !isTwoPlayerMode ||
    originalPlayer ||
    !originalVideoId
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
          setPlayButtonState();
          tryPendingSwitch();
        },

        onStateChange: () => {
          if (
            activeSource === "original"
          ) {
            setPlayButtonState();
            updateProgress();
          }
        },

        onError: (event) => {
          handlePlayerError(
            event,
            "original"
          );
        }
      }
    }
  );

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
          if (
            activeSource === "japanese"
          ) {
            setPlayButtonState();
            updateProgress();
          }
        },

        onError: (event) => {
          handlePlayerError(
            event,
            "japanese"
          );
        }
      }
    }
  );
}

/* =========================
   YouTube API初期化
========================= */

function createYouTubePlayer() {
  if (
    !musicPlayer ||
    !originalVideoId
  ) {
    return;
  }

  /*
    HTMLで最初からNO SOUNDを指定する場合

    data-playback="nosound"
  */
  if (
    musicPlayer.dataset.playback ===
    "nosound"
  ) {
    unavailableSources.add(
      activeSource
    );

    showNoSound(activeSource);
    return;
  }

  if (
    !window.YT ||
    typeof YT.Player !== "function"
  ) {
    return;
  }

  if (isTwoPlayerMode) {
    createTwoPlayers();
  } else {
    createSinglePlayer();
  }
}

window.onYouTubeIframeAPIReady = () => {
  createYouTubePlayer();
};

/*
  APIの読み込み順に左右されないように
  Playerが使えるまで確認
*/
let youtubeApiRetryCount = 0;

const youtubeApiRetryTimer =
  window.setInterval(() => {
    youtubeApiRetryCount += 1;

    if (
      window.YT &&
      typeof window.YT.Player ===
        "function"
    ) {
      window.clearInterval(
        youtubeApiRetryTimer
      );

      createYouTubePlayer();
      return;
    }

    if (youtubeApiRetryCount >= 100) {
      window.clearInterval(
        youtubeApiRetryTimer
      );

      console.error(
        "YouTube IFrame API could not be loaded."
      );
    }
  }, 100);

/* =========================
   再生／一時停止
========================= */

playButton?.addEventListener(
  "click",
  () => {
    const player = getActivePlayer();

    if (
      !player ||
      !isPlayerReady() ||
      unavailableSources.has(
        activeSource
      )
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
    const player = getActivePlayer();

    if (
      !player ||
      !isPlayerReady()
    ) {
      return;
    }

    const current =
      Number(player.getCurrentTime()) || 0;

    player.seekTo(
      Math.max(0, current - 10),
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
    const player = getActivePlayer();

    if (
      !player ||
      !isPlayerReady()
    ) {
      return;
    }

    const duration = getSafeDuration();

    const current =
      Number(player.getCurrentTime()) || 0;

    const target =
      duration > 0
        ? Math.min(
            duration,
            current + 10
          )
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

    if (
      !player ||
      !isPlayerReady()
    ) {
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

    if (
      !player ||
      !isPlayerReady()
    ) {
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

lyricSets.forEach((set) => {
  set.addEventListener(
    "click",
    () => {
      if (
        unavailableSources.has(
          activeSource
        )
      ) {
        return;
      }

      const player = getActivePlayer();

      if (
        !player ||
        !isPlayerReady()
      ) {
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
});
