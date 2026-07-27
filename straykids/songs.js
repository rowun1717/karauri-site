const songs = [
  {
    title: "MANIAC",
    album: "ODDINARY",
    type: "Original Song",
    date: "2026.06.12",
    url: "song/MANIAC.html",
    image: "images/MANIAC.jpg",

    members: [
      "Bang Chan",
      "バンチャン",
      "Changbin",
      "チャンビン",
      "HAN",
      "ハン",
      "Felix",
      "フィリックス",
      "Hyunjin",
      "ヒョンジン",
      "Lee Know",
      "リノ",
      "Seungmin",
      "スンミン",
      "I.N",
      "アイエン"
    ],
  },

    {
    title: "RUN IT",
    album: "RUN IT",
    type: "Original Song",
    date: "2026.06.24",
    url: "song/RUN IT.html",
    image: "images/RUN IT.jpg",

    members: [
      "Bang Chan",
      "バンチャン",
      "Changbin",
      "チャンビン",
      "HAN",
      "ハン",
      "Felix",
      "フィリックス",
      "Hyunjin",
      "ヒョンジン",
      "Lee Know",
      "リノ",
      "Seungmin",
      "スンミン",
      "I.N",
      "アイエン"
    ],
  },

      {
    title: "STAY",
    album: "STAY",
    type: "Original Song",
    date: "2026.07.10",
    url: "song/STAY.html",
    image: "images/STAY.jpg",

    members: [
      "Bang Chan",
      "バンチャン",
      "Changbin",
      "チャンビン",
      "HAN",
      "ハン",
      "Felix",
      "フィリックス",
      "Hyunjin",
      "ヒョンジン",
      "Lee Know",
      "リノ",
      "Seungmin",
      "スンミン",
      "I.N",
      "アイエン"
    ],
  },

        {
    title: "Endless Sun",
    album: "Endless Sun",
    type: "Original Song",
    date: "2026.07.10",
    url: "song/Endless Sun.html",
    image: "images/Endless Sun.jpg",

    members: [
      "Bang Chan",
      "バンチャン",
      "Changbin",
      "チャンビン",
      "HAN",
      "ハン",
      "Felix",
      "フィリックス",
      "Hyunjin",
      "ヒョンジン",
      "Lee Know",
      "リノ",
      "Seungmin",
      "スンミン",
      "I.N",
      "アイエン"
    ],
  },

  {
    title: "Do It",
    album: "Do It",
    type: "Original Song",
    date: "2026.07.10",
    url: "song/Do It.html",
    image: "images/Do It.jpg",

    members: [
      "Bang Chan",
      "バンチャン",
      "Changbin",
      "チャンビン",
      "HAN",
      "ハン",
      "Felix",
      "フィリックス",
      "Hyunjin",
      "ヒョンジン",
      "Lee Know",
      "リノ",
      "Seungmin",
      "スンミン",
      "I.N",
      "アイエン"
    ],
  },

  {
    title: "DIVINE",
    album: "Do It",
    type: "Original Song",
    date: "2026.07.10",
    url: "song/DIVINE.html",
    image: "images/DIVINE.jpg",

    members: [
      "Bang Chan",
      "バンチャン",
      "Changbin",
      "チャンビン",
      "HAN",
      "ハン",
      "Felix",
      "フィリックス",
      "Hyunjin",
      "ヒョンジン",
      "Lee Know",
      "リノ",
      "Seungmin",
      "スンミン",
      "I.N",
      "アイエン"
    ],
  },

  {
    title: "Holiday",
    album: "Do It",
    type: "Original Song",
    date: "2026.07.10",
    url: "song/Holiday.html",
    image: "images/album-Do It.jpg",

    members: [
      "Bang Chan",
      "バンチャン",
      "Changbin",
      "チャンビン",
      "HAN",
      "ハン",
      "Felix",
      "フィリックス",
      "Hyunjin",
      "ヒョンジン",
      "Lee Know",
      "リノ",
      "Seungmin",
      "スンミン",
      "I.N",
      "アイエン"
    ],
  },

    {
    title: "I Like It",
    album: "ATE",
    type: "Original Song",
    date: "2026.06.29",
    url: "song/I Like It.html",
    image: "images/I Like It.jpg",

    members: [
      "Bang Chan",
      "バンチャン",
      "Changbin",
      "チャンビン",
      "HAN",
      "ハン",
      "Felix",
      "フィリックス",
      "Hyunjin",
      "ヒョンジン",
      "Lee Know",
      "リノ",
      "Seungmin",
      "スンミン",
      "I.N",
      "アイエン"
    ],
  },

  {
    title: "JJAM",
    album: "ATE",
    type: "Original Song",
    date: "2026.07.26",
    url: "song/JJAM.html",
    image: "images/JJAM.jpg",

    members: [
      "Bang Chan",
      "バンチャン",
      "Changbin",
      "チャンビン",
      "HAN",
      "ハン",
      "Felix",
      "フィリックス",
      "Hyunjin",
      "ヒョンジン",
      "Lee Know",
      "リノ",
      "Seungmin",
      "スンミン",
      "I.N",
      "アイエン"
    ],
  },

      {
    title: "back to life",
    album: "back to life",
    type: "Original Song",
    date: "2026.06.29",
    url: "song/back to life.html",
    image: "images/back to life.jpg",

    members: [
      "HAN",
      "ハン",
    ],
  },

];

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchCategory = document.getElementById("searchCategory");
  const searchResults = document.getElementById("searchResults");

  if (!searchInput || !searchCategory || !searchResults) {
    console.error("検索に必要なHTML要素が見つかりません");
    return;
  }

  function normalizeText(text) {
    return String(text ?? "")
      .toLowerCase()
      .trim();
  }

  function renderSongs(songList) {
    searchResults.innerHTML = "";

    if (songList.length === 0) {
      searchResults.innerHTML = `
        <p class="no-results">
          該当する曲が見つかりませんでした。
        </p>
      `;
      return;
    }

    songList.forEach((song) => {
      const card = document.createElement("a");

      card.href = song.url;
      card.className = "song-card";

      card.innerHTML = `
        <img
          src="${song.image}"
          alt="${song.title}"
          class="song-image"
        >

        <div class="song-info">
          <div class="song-tags">
            <span class="tag">${song.type}</span>
            <span class="tag">${song.album}</span>
          </div>

          <h2>${song.title}</h2>
          <p>📅 ${song.date}</p>
        </div>
      `;

      searchResults.appendChild(card);
    });
  }

  function filterSongs() {
    const keyword = normalizeText(searchInput.value);
    const category = searchCategory.value;

    if (keyword === "") {
      renderSongs(songs);
      return;
    }

    const filteredSongs = songs.filter((song) => {
      const title = normalizeText(song.title);
      const album = normalizeText(song.album);
      const type = normalizeText(song.type);
      const members = Array.isArray(song.members)
        ? song.members.map(normalizeText)
        : [];

      switch (category) {
        case "title":
          return title.includes(keyword);

        case "album":
          return album.includes(keyword);

        case "member":
          return members.some((member) =>
            member.includes(keyword)
          );

        case "all":
        default:
          return (
            title.includes(keyword) ||
            album.includes(keyword) ||
            type.includes(keyword) ||
            members.some((member) =>
              member.includes(keyword)
            )
          );
      }
    });

    renderSongs(filteredSongs);
  }

  searchInput.addEventListener("input", filterSongs);
  searchCategory.addEventListener("change", filterSongs);

  renderSongs(songs);
});