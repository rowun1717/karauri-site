"use strict";

/* =========================================================
   YouTube player
   - data-youtube-id: ORIGINAL / KANA / ALL で使う原曲
   - data-japanese-youtube-id: JAPANESE で使う日本語版
   - 日本語版IDが空なら従来どおり原曲のまま
   - 音源切替時は現在秒数・再生/停止・ミュート状態を維持
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

let youtubePlayer = null;
let progressTimer = null;
let activeSource = "original";
let pendingSwitch = null;

const originalVideoId =
  musicPlayer?.dataset.youtubeId?.trim() || "";

const japaneseVideoId =
  musicPlayer?.dataset.japaneseYoutubeId?.trim() || "";


function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const secs = total % 60;

  return `${minutes}:${String(secs).padStart(2, "0")}`;
}


function playerReady() {
  return Boolean(
    youtubePlayer &&
    typeof youtubePlayer.getCurrentTime === "function"
  );
}


function getSafeDuration() {
  if (!playerReady()) return 0;

  const duration =
    Number(youtubePlayer.getDuration());

  return Number.isFinite(duration)
    ? duration
    : 0;
}


function updateProgress() {
  if (!playerReady()) return;

  const current =
    Number(
      youtubePlayer.getCurrentTime()
    ) || 0;

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


function setPlayButtonState(state) {
  if (!playButton || !window.YT) {
    return;
  }

  const isPlaying =
    state ===
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


function updatePlayingLyric(
  currentTime
) {
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


function getLyricTime(set) {
  const useJapanese =
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


/* =========================
   原曲 / Japanese Ver. 切替
========================= */

function switchVideoSource(
  targetSource
) {

  const wantsJapanese =
    targetSource === "japanese";

  const targetVideoId =
    wantsJapanese &&
    japaneseVideoId
      ? japaneseVideoId
      : originalVideoId;

  /*
    Japanese Ver.のIDが設定されていない場合は
    ORIGINAL扱いに戻す。
  */
  const resolvedSource =
    wantsJapanese &&
    japaneseVideoId
      ? "japanese"
      : "original";

  if (!targetVideoId) {
    return;
  }

  /*
    YouTube Playerがまだ準備できていない場合は
    あとで切り替える。
  */
  if (!playerReady()) {
    pendingSwitch =
      resolvedSource;

    return;
  }

  /*
    すでに同じ音源なら何もしない
  */
  if (
    activeSource ===
    resolvedSource
  ) {
    return;
  }

  /*
    現在位置を保存
  */
  const currentTime =
    Number(
      youtubePlayer.getCurrentTime()
    ) || 0;

  /*
    再生状態を保存
  */
  const state =
    youtubePlayer.getPlayerState();

  const wasPlaying =
    window.YT &&
    state ===
      YT.PlayerState.PLAYING;

  /*
    ミュート状態を保存
  */
  const wasMuted =
    youtubePlayer.isMuted();

  activeSource =
    resolvedSource;

  const playerOptions = {
    videoId:
      targetVideoId,

    startSeconds:
      Math.max(
        0,
        currentTime
      )
  };

  /*
    再生中だった場合
    → 新しい音源もそのまま再生

    停止中だった場合
    → 同じ秒数で待機
  */
  if (wasPlaying) {

    youtubePlayer.loadVideoById(
      playerOptions
    );

  } else {

    youtubePlayer.cueVideoById(
      playerOptions
    );

  }

  /*
    ミュート状態も維持
  */
  if (wasMuted) {
    youtubePlayer.mute();
  }
}


/* =========================
   song.js の表示切替と同期
========================= */

document.addEventListener(
  "lyricsviewchange",
  (event) => {

    const view =
      event.detail?.view;

    /*
      JAPANESE
      → Japanese Ver.

      ALL / ORIGINAL / KANA
      → 原曲
    */
    switchVideoSource(
      view === "japanese"
        ? "japanese"
        : "original"
    );

  }
);


/* =========================
   YouTube Player生成
========================= */

function createYouTubePlayer() {

  if (
    youtubePlayer ||
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

  youtubePlayer =
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

            startProgressTimer();
            updateProgress();

            /*
              ページ読み込み直後に
              JAPANESEが選択されていた場合など
            */
            if (pendingSwitch) {

              const source =
                pendingSwitch;

              pendingSwitch =
                null;

              switchVideoSource(
                source
              );

            }

          },

          onStateChange:
            (event) => {

              setPlayButtonState(
                event.data
              );

              updateProgress();

            }

        }

      }
    );
}


/* =========================
   YouTube IFrame API
========================= */

window.onYouTubeIframeAPIReady =
  createYouTubePlayer;


/*
  APIが先に読み込み済みでも
  初期化できるようにする
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

    if (!playerReady()) {
      return;
    }

    const state =
      youtubePlayer.getPlayerState();

    const isPlaying =
      window.YT &&
      state ===
        YT.PlayerState.PLAYING;

    if (isPlaying) {

      youtubePlayer.pauseVideo();

    } else {

      youtubePlayer.playVideo();

    }

  }
);


/* =========================
   10秒戻る
========================= */

rewindButton?.addEventListener(
  "click",
  () => {

    if (!playerReady()) {
      return;
    }

    const target =
      Math.max(
        0,
        (
          Number(
            youtubePlayer
              .getCurrentTime()
          ) || 0
        ) - 10
      );

    youtubePlayer.seekTo(
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

    if (!playerReady()) {
      return;
    }

    const duration =
      getSafeDuration();

    const current =
      Number(
        youtubePlayer
          .getCurrentTime()
      ) || 0;

    const target =
      duration > 0
        ? Math.min(
            duration,
            current + 10
          )
        : current + 10;

    youtubePlayer.seekTo(
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

    if (!playerReady()) {
      return;
    }

    if (
      youtubePlayer.isMuted()
    ) {

      youtubePlayer.unMute();

      muteButton.textContent =
        "🔊";

      muteButton.setAttribute(
        "aria-label",
        "ミュート"
      );

    } else {

      youtubePlayer.mute();

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

    if (!playerReady()) {
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

    youtubePlayer.seekTo(
      target,
      true
    );

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

        if (!playerReady()) {
          return;
        }

        /*
          ORIGINALなら data-time
          JAPANESEなら data-time-japanese
          があればそちらを使用
        */
        const target =
          getLyricTime(set);

        if (
          !Number.isFinite(target)
        ) {
          return;
        }

        youtubePlayer.seekTo(
          target,
          true
        );

        youtubePlayer.playVideo();

        updateProgress();

      }
    );

  }
);
