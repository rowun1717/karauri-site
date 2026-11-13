"use strict";

/* =========================================================
   YouTube Player / 日本語版メイン曲専用

   HTML設定例：

   <section
     class="music-player"
     data-youtube-id="韓国語版の動画ID"
     data-japanese-youtube-id="日本語版の動画ID"
     data-main-source="japanese"
   >
     <div class="youtube-player-wrap">
       <div id="youtubePlayerOriginal"></div>
       <div id="youtubePlayerJapanese"></div>
     </div>
   </section>

   表示ボタンと音源：

   ALL / JAPANESE
   → 日本語版

   ORIGINAL / KANA
   → 韓国語版
========================================================= */

/* =========================
   DOM
========================= */

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
  document.querySelectorAll(
    ".lyric-set[data-time]"
  );


/* =========================
   動画ID
========================= */

/*
  韓国語版
*/
const originalVideoId =
  musicPlayer?.dataset.youtubeId?.trim() ||
  "";


/*
  日本語版
*/
const japaneseVideoId =
  musicPlayer
    ?.dataset
    .japaneseYoutubeId
    ?.trim() ||
  "";


/* =========================
   Player要素
========================= */

const originalPlayerElement =
  document.getElementById(
    "youtubePlayerOriginal"
  );

const japanesePlayerElement =
  document.getElementById(
    "youtubePlayerJapanese"
  );


/* =========================
   Player状態
========================= */

let originalPlayer = null;
let japanesePlayer = null;

let originalReady = false;
let japaneseReady = false;


/*
  この専用JSでは日本語版を初期音源にする
*/
let activeSource = "japanese";

let pendingSource = null;
let progressTimer = null;


/* =========================
   共通処理
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
  if (
    activeSource === "japanese"
  ) {
    return japanesePlayer;
  }

  return originalPlayer;
}


function isPlayerReady(
  source = activeSource
) {
  if (
    source === "japanese"
  ) {
    return Boolean(
      japaneseVideoId &&
      japanesePlayer &&
      japaneseReady
    );
  }

  return Boolean(
    originalVideoId &&
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
    Number(
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
  /*
    日本語版のときは
    data-time-japaneseを優先。

    指定がなければdata-timeを使用。
  */
  const raw =
    activeSource === "japanese" &&
    set.dataset.timeJapanese
      ? set.dataset.timeJapanese
      : set.dataset.time;

  const value =
    Number(raw);

  return Number.isFinite(value)
    ? value
    : NaN;
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
    Number(
      player.getCurrentTime()
    ) || 0;

  const duration =
    getSafeDuration();

  const percent =
    duration > 0
      ? (
          current /
          duration
        ) * 100
      : 0;

  if (progressBar) {
    progressBar.value =
      String(percent);

    progressBar.style.setProperty(
      "--progress",
      `${
        Math.max(
          0,
          Math.min(
            100,
            percent
          )
        )
      }%`
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
   音源切り替え
========================= */

function switchAudioSource(
  targetSource
) {
  const resolvedSource =
    targetSource === "original"
      ? "original"
      : "japanese";

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
    !isPlayerReady(
      activeSource
    )
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
    !isPlayerReady(
      resolvedSource
    )
  ) {
    pendingSource =
      resolvedSource;

    return;
  }


  /*
    切り替え前の再生位置
  */
  const currentTime =
    Number(
      fromPlayer.getCurrentTime()
    ) || 0;


  /*
    再生中かどうか
  */
  const wasPlaying =
    window.YT &&
    fromPlayer.getPlayerState() ===
      YT.PlayerState.PLAYING;


  /*
    ミュート状態
  */
  const wasMuted =
    typeof fromPlayer.isMuted ===
      "function"
      ? fromPlayer.isMuted()
      : false;


  /*
    元のPlayerを停止
  */
  fromPlayer.pauseVideo();


  /*
    使用するPlayerを変更
  */
  activeSource =
    resolvedSource;


  /*
    同じ秒数へ移動
  */
  toPlayer.seekTo(
    Math.max(
      0,
      currentTime
    ),
    true
  );


  /*
    ミュート状態を引き継ぐ
  */
  if (wasMuted) {
    toPlayer.mute();
  } else {
    toPlayer.unMute();
  }


  /*
    再生状態を引き継ぐ
  */
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
  if (!pendingSource) {
    return;
  }

  if (
    !isPlayerReady(
      activeSource
    )
  ) {
    return;
  }

  if (
    !isPlayerReady(
      pendingSource
    )
  ) {
    return;
  }

  const source =
    pendingSource;

  pendingSource = null;

  switchAudioSource(source);
}


/* =========================
   歌詞表示切り替えとの同期
========================= */

document.addEventListener(
  "lyricsviewchange",
  (event) => {
    const view =
      event.detail?.view;

    /*
      ORIGINAL
      KANA
      → 韓国語版音源
    */
    if (
      view === "original" ||
      view === "kana"
    ) {
      switchAudioSource(
        "original"
      );

      return;
    }

    /*
      ALL
      JAPANESE
      → 日本語版音源
    */
    switchAudioSource(
      "japanese"
    );
  }
);


/* =========================
   Player生成
========================= */

function createPlayers() {
  if (
    !originalVideoId ||
    !japaneseVideoId ||
    !originalPlayerElement ||
    !japanesePlayerElement
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

  if (
    originalPlayer ||
    japanesePlayer
  ) {
    return;
  }


  /* =========================
     韓国語版Player
  ========================= */

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

            if (
              activeSource ===
              "original"
            ) {
              startProgressTimer();
              updateProgress();
              setPlayButtonState();
            }

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


  /* =========================
     日本語版Player
  ========================= */

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

            if (
              activeSource ===
              "japanese"
            ) {
              startProgressTimer();
              updateProgress();
              setPlayButtonState();
            }

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
   YouTube API初期化
========================= */

window.onYouTubeIframeAPIReady =
  createPlayers;


/*
  APIがすでに読み込まれている場合
*/
if (
  window.YT &&
  typeof YT.Player ===
    "function"
) {
  createPlayers();
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
      (
        percent /
        100
      );

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