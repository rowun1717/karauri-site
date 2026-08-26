"use strict";


/* =========================
   Firebase SDK
========================= */

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";


import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


import {
  getDatabase,
  onDisconnect,
  onValue,
  push,
  ref as databaseRef,
  serverTimestamp as realtimeServerTimestamp,
  set as databaseSet
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";


/* =========================
   Firebase設定
========================= */

const firebaseConfig = {
  apiKey:
    "AIzaSyCKMloq12fotE877nozG0NA8LE2CgxxHrw",

  authDomain:
    "skz-lyric-lab.firebaseapp.com",

  databaseURL:
    "https://skz-lyric-lab-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId:
    "skz-lyric-lab",

  storageBucket:
    "skz-lyric-lab.firebasestorage.app",

  messagingSenderId:
    "603132772841",

  appId:
    "1:603132772841:web:e0e28838077020ef43cb78"
};


const app =
  initializeApp(firebaseConfig);

const auth =
  getAuth(app);

const db =
  getFirestore(app);

const realtimeDb =
  getDatabase(app);


/* =========================
   基本データ
========================= */

const PROFILE_KEY =
  "skzLyricLabStayProfileV1";


const members = {
  bangchan: {
    label: "BANG CHAN",
    color: "#b5b9ce"
  },

  leeknow: {
    label: "LEE KNOW",
    color: "#00dce7"
  },

  changbin: {
    label: "CHANGBIN",
    color: "#df35f0"
  },

  hyunjin: {
    label: "HYUNJIN",
    color: "#ff285f"
  },

  han: {
    label: "HAN",
    color: "#9a6ac4"
  },

  felix: {
    label: "FELIX",
    color: "#f2cf27"
  },

  seungmin: {
    label: "SEUNGMIN",
    color: "#21dca1"
  },

  in: {
    label: "I.N",
    color: "#ff9db2"
  }
};


const channels = [
  {
    id: "general",
    code: "CH-001",
    name: "GENERAL",
    icon: "●●●",
    count: 128
  },

  {
    id: "live",
    code: "CH-002",
    name: "LIVE TALK",
    icon: "◉",
    count: 96
  },

  {
    id: "setlist",
    code: "CH-003",
    name: "SETLIST",
    icon: "☷",
    count: 64
  },

  {
    id: "fanchant",
    code: "CH-004",
    name: "FANCHANT",
    icon: "◀",
    count: 72
  }
];


/* =========================
   DOM
========================= */

const channelList =
  document.getElementById(
    "channelList"
  );

const messageList =
  document.getElementById(
    "messageList"
  );

const messageForm =
  document.getElementById(
    "messageForm"
  );

const messageInput =
  document.getElementById(
    "messageInput"
  );

const characterCount =
  document.getElementById(
    "characterCount"
  );

const currentChannelTitle =
  document.getElementById(
    "currentChannelTitle"
  );

const currentChannelCode =
  document.getElementById(
    "currentChannelCode"
  );

const profileButton =
  document.getElementById(
    "profileButton"
  );

const profileDialog =
  document.getElementById(
    "profileDialog"
  );

const profileForm =
  document.getElementById(
    "profileForm"
  );

const displayName =
  document.getElementById(
    "displayName"
  );

const memberSelect =
  document.getElementById(
    "memberSelect"
  );

const onlineList =
  document.getElementById(
    "onlineList"
  );

const onlineCount =
  document.getElementById(
    "onlineCount"
  );

const replyPreview =
  document.getElementById(
    "replyPreview"
  );

const replyText =
  document.getElementById(
    "replyText"
  );

const cancelReply =
  document.getElementById(
    "cancelReply"
  );


/* =========================
   状態
========================= */

let activeChannel =
  "general";

let replyTarget =
  null;

let messages =
  [];

let currentUser =
  null;

let stopMessages =
  null;

let stopLikeListeners =
  [];

let activePresenceRef =
  null;

let presenceStarted =
  false;

let profile =
  loadProfile();


/* =========================
   プロフィール読込
========================= */

function loadProfile() {
  try {
    return (
      JSON.parse(
        localStorage.getItem(
          PROFILE_KEY
        )
      ) || {
        name: "URI",
        member: "seungmin"
      }
    );

  } catch {
    return {
      name: "URI",
      member: "seungmin"
    };
  }
}


/* =========================
   HTML安全処理
========================= */

function escapeHtml(value) {
  return String(value)
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}


/* =========================
   時刻
========================= */

function formatTime(timestamp) {
  if (!timestamp?.toDate) {
    return "NOW";
  }

  return new Intl.DateTimeFormat(
    "ja-JP",
    {
      hour: "2-digit",
      minute: "2-digit"
    }
  ).format(
    timestamp.toDate()
  );
}


/* =========================
   チャンネル表示
========================= */

function renderChannels() {
  channelList.innerHTML =
    channels.map(
      (channel) => {
        const activeClass =
          channel.id === activeChannel
            ? "active"
            : "";

        return `
          <button
            class="
              channel-button
              ${activeClass}
            "
            type="button"
            data-channel="${channel.id}"
          >
            <span class="channel-icon">
              ${channel.icon}
            </span>

            <span class="channel-name">
              ${channel.name}
            </span>

            <span class="channel-meta">
              ${channel.code}
              <br>
              ♙ ${channel.count}
            </span>
          </button>
        `;
      }
    ).join("");
}


/* =========================
   投稿表示
========================= */

function renderMessages() {
  stopLikeListeners.forEach(
    (stop) => {
      stop();
    }
  );

  stopLikeListeners = [];


  messageList.innerHTML =
    messages.map(
      (message) => {
        const member =
          members[message.member] ||
          members.seungmin;

        const replyElement =
          message.reply
            ? `
              <p class="quoted-reply">
                ↳
                ${escapeHtml(
                  message.reply.user
                )}：
                ${escapeHtml(
                  message.reply.text
                )}
              </p>
            `
            : "";

        return `
          <article
            class="message-card"
            style="
              --accent:
              ${member.color}
            "
            data-id="${message.id}"
          >
            <div class="member-badge">
              ${escapeHtml(
                member.label
              )}
            </div>

            <div>
              <header class="message-head">
                <strong class="message-user">
                  ${escapeHtml(
                    message.user
                  )}
                  /
                  ${escapeHtml(
                    member.label
                  )}
                </strong>

                <time class="message-time">
                  ${escapeHtml(
                    formatTime(
                      message.createdAt
                    )
                  )}
                </time>
              </header>

              ${replyElement}

              <p class="message-body">
                ${escapeHtml(
                  message.text
                )}
              </p>

              <footer class="message-actions">
                <button
                  class="
                    action-button
                    reply-button
                  "
                  type="button"
                >
                  ↩ REPLY
                </button>

                <button
                  class="
                    action-button
                    like-button
                  "
                  type="button"
                  aria-label="いいね"
                >
                  ♡ 0
                </button>
              </footer>
            </div>
          </article>
        `;
      }
    ).join("");


  messages.forEach(
    (message) => {
      watchLikes(
        message.id
      );
    }
  );


  messageList.scrollTop =
    messageList.scrollHeight;
}


/* =========================
   いいね監視
========================= */

function watchLikes(messageId) {
  const likesReference =
    collection(
      db,
      "messages",
      messageId,
      "likes"
    );


  const stop =
    onSnapshot(
      likesReference,
      (snapshot) => {
        const escapedId =
          CSS.escape(
            messageId
          );

        const card =
          messageList.querySelector(
            `[data-id="${escapedId}"]`
          );

        const button =
          card?.querySelector(
            ".like-button"
          );

        if (!button) {
          return;
        }


        const liked =
          currentUser &&
          snapshot.docs.some(
            (item) => {
              return (
                item.id ===
                currentUser.uid
              );
            }
          );


        button.classList.toggle(
          "liked",
          Boolean(liked)
        );


        button.textContent =
          `${
            liked
              ? "♥"
              : "♡"
          } ${snapshot.size}`;
      }
    );


  stopLikeListeners.push(
    stop
  );
}


/* =========================
   オンライン一覧表示
========================= */

function renderOnlineUsers(users) {
  onlineCount.textContent =
    String(
      users.length
    );


  if (users.length === 0) {
    onlineList.innerHTML = `
      <p class="message-body">
        CONNECTING...
      </p>
    `;

    return;
  }


  onlineList.innerHTML =
    users.map(
      (user) => {
        const member =
          members[user.member] ||
          members.seungmin;

        const shortId =
          user.uid
            .slice(
              0,
              8
            )
            .toUpperCase();

        return `
          <div
            class="online-member"
            style="
              --accent:
              ${member.color}
            "
          >
            <span class="online-dot">
              VIII
            </span>

            <div>
              <strong>
                ${escapeHtml(
                  user.user
                )}
                /
                ${escapeHtml(
                  member.label
                )}
              </strong>

              <small>
                ID :
                STAY-${escapeHtml(
                  shortId
                )}
              </small>
            </div>
          </div>
        `;
      }
    ).join("");
}


/* =========================
   オンライン情報を書き込む
========================= */

async function writePresence() {
  if (!activePresenceRef) {
    return;
  }


  await databaseSet(
    activePresenceRef,
    {
      user:
        profile.name.slice(
          0,
          18
        ),

      member:
        profile.member,

      connectedAt:
        realtimeServerTimestamp()
    }
  );
}


/* =========================
   オンライン状態の監視
========================= */

function startPresence(user) {
  if (presenceStarted) {
    return;
  }

  presenceStarted =
    true;


  const connectedReference =
    databaseRef(
      realtimeDb,
      ".info/connected"
    );


  const presenceReference =
    databaseRef(
      realtimeDb,
      "presence"
    );


  /*
    全ユーザーのオンライン情報を監視
  */

  onValue(
    presenceReference,
    (snapshot) => {
      const presenceData =
        snapshot.val() || {};


      const users =
        Object.entries(
          presenceData
        ).flatMap(
          ([uid, connections]) => {
            const connection =
              Object.values(
                connections || {}
              )[0];

            if (!connection) {
              return [];
            }

            return [
              {
                uid,
                ...connection
              }
            ];
          }
        );


      renderOnlineUsers(
        users
      );
    }
  );


  /*
    自分の接続状態を監視
  */

  onValue(
    connectedReference,
    async (snapshot) => {
      if (
        snapshot.val() !== true
      ) {
        return;
      }


      activePresenceRef =
        push(
          databaseRef(
            realtimeDb,
            `presence/${user.uid}`
          )
        );


      try {
        /*
          タブを閉じた・通信が切れたとき
          Firebase側で自動削除
        */

        await onDisconnect(
          activePresenceRef
        ).remove();


        /*
          現在のユーザー情報を登録
        */

        await writePresence();

      } catch (error) {
        console.error(
          "Presence error:",
          error
        );
      }
    }
  );
}


/* =========================
   チャンネル見出し
========================= */

function updateChannelHeading() {
  const channel =
    channels.find(
      (item) => {
        return (
          item.id ===
          activeChannel
        );
      }
    );


  if (!channel) {
    return;
  }


  currentChannelTitle.textContent =
    channel.name;

  currentChannelCode.textContent =
    channel.code;
}


/* =========================
   投稿をリアルタイム監視
========================= */

function subscribeToMessages() {
  if (stopMessages) {
    stopMessages();
  }


  const messagesQuery =
    query(
      collection(
        db,
        "messages"
      ),

      where(
        "channel",
        "==",
        activeChannel
      )
    );


  stopMessages =
    onSnapshot(
      messagesQuery,

      (snapshot) => {
        messages =
          snapshot.docs
            .map(
              (item) => {
                return {
                  id: item.id,
                  ...item.data()
                };
              }
            )
            .sort(
              (a, b) => {
                const left =
                  a.createdAt
                    ?.toMillis?.() ||
                  0;

                const right =
                  b.createdAt
                    ?.toMillis?.() ||
                  0;

                return (
                  left - right
                );
              }
            );


        renderMessages();
      },

      (error) => {
        console.error(
          error
        );

        messageList.innerHTML = `
          <p class="message-body">
            通信に失敗しました。
            ページを再読み込みしてください。
          </p>
        `;
      }
    );
}


/* =========================
   返信
========================= */

function setReply(message) {
  replyTarget = {
    user:
      message.user,

    text:
      message.text.slice(
        0,
        55
      )
  };


  replyText.textContent =
    `↳ ${replyTarget.user}：` +
    replyTarget.text;

  replyPreview.hidden =
    false;

  messageInput.focus();
}


function clearReply() {
  replyTarget =
    null;

  replyPreview.hidden =
    true;
}


/* =========================
   チャンネル切り替え
========================= */

channelList.addEventListener(
  "click",
  (event) => {
    const button =
      event.target.closest(
        "[data-channel]"
      );

    if (!button) {
      return;
    }


    activeChannel =
      button.dataset.channel;

    clearReply();
    renderChannels();
    updateChannelHeading();
    subscribeToMessages();
  }
);


/* =========================
   返信・いいね
========================= */

messageList.addEventListener(
  "click",
  async (event) => {
    const card =
      event.target.closest(
        ".message-card"
      );

    if (
      !card ||
      !currentUser
    ) {
      return;
    }


    const message =
      messages.find(
        (item) => {
          return (
            item.id ===
            card.dataset.id
          );
        }
      );

    if (!message) {
      return;
    }


    if (
      event.target.closest(
        ".reply-button"
      )
    ) {
      setReply(
        message
      );

      return;
    }


    const likeButton =
      event.target.closest(
        ".like-button"
      );

    if (!likeButton) {
      return;
    }


    const likeReference =
      doc(
        db,
        "messages",
        message.id,
        "likes",
        currentUser.uid
      );


    const liked =
      likeButton.classList.contains(
        "liked"
      );


    try {
      if (liked) {
        await deleteDoc(
          likeReference
        );

      } else {
        await setDoc(
          likeReference,
          {
            userId:
              currentUser.uid,

            createdAt:
              serverTimestamp()
          }
        );
      }

    } catch (error) {
      console.error(
        error
      );

      alert(
        "いいねを更新できませんでした。"
      );
    }
  }
);


/* =========================
   新規投稿
========================= */

messageForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();


    const text =
      messageInput.value.trim();

    if (
      !text ||
      !currentUser
    ) {
      return;
    }


    const sendButton =
      messageForm.querySelector(
        ".send-button"
      );

    sendButton.disabled =
      true;


    try {
      await addDoc(
        collection(
          db,
          "messages"
        ),

        {
          authorId:
            currentUser.uid,

          user:
            profile.name.slice(
              0,
              20
            ),

          member:
            profile.member,

          text:
            text.slice(
              0,
              240
            ),

          channel:
            activeChannel,

          createdAt:
            serverTimestamp(),

          reply:
            replyTarget
        }
      );


      messageForm.reset();

      characterCount.textContent =
        "0 / 240";

      clearReply();

    } catch (error) {
      console.error(
        error
      );

      alert(
        "投稿できませんでした。" +
        "Firebaseの設定を確認してください。"
      );

    } finally {
      sendButton.disabled =
        false;
    }
  }
);


/* =========================
   文字数
========================= */

messageInput.addEventListener(
  "input",
  () => {
    characterCount.textContent =
      `${messageInput.value.length} / 240`;
  }
);


/* =========================
   返信取消
========================= */

cancelReply.addEventListener(
  "click",
  clearReply
);


/* =========================
   プロフィール
========================= */

profileButton.addEventListener(
  "click",
  () => {
    displayName.value =
      profile.name;

    memberSelect.value =
      profile.member;

    profileDialog.showModal();
  }
);


profileForm.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();


    profile = {
      name:
        displayName.value
          .trim()
          .slice(
            0,
            18
          ) ||
        "STAY",

      member:
        memberSelect.value
    };


    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify(
        profile
      )
    );


    profileButton.textContent =
      profile.name;


    /*
      オンライン一覧の名前・推しも更新
    */

    writePresence().catch(
      (error) => {
        console.error(
          "Presence update error:",
          error
        );
      }
    );


    profileDialog.close();
  }
);


/* =========================
   初期表示
========================= */

Object.entries(
  members
).forEach(
  ([value, member]) => {
    memberSelect.add(
      new Option(
        member.label,
        value
      )
    );
  }
);


profileButton.textContent =
  profile.name;

renderChannels();
renderOnlineUsers([]);
updateChannelHeading();


messageList.innerHTML = `
  <p class="message-body">
    CONNECTING TO STAY TALK...
  </p>
`;


/* =========================
   匿名ログイン
========================= */

onAuthStateChanged(
  auth,
  (user) => {
    if (!user) {
      return;
    }


    currentUser =
      user;


    /*
      投稿の監視開始
    */

    subscribeToMessages();


    /*
      オンライン状態の監視開始
    */

    startPresence(
      user
    );
  }
);


if (!auth.currentUser) {
  signInAnonymously(
    auth
  ).catch(
    (error) => {
      console.error(
        error
      );

      messageList.innerHTML = `
        <p class="message-body">
          接続できませんでした。
          ページを再読み込みしてください。
        </p>
      `;
    }
  );
}