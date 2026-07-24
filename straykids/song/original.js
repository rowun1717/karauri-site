const songs = [
  {
    title: "RUN IT",
    album: "RUN IT",
    type: "Original Song",
    karaoke: [],
    date: "2026.06.24",
    image: "images/runit.jpg",
    url: "song/RUN IT.html"
  },
  {
    title: "back to life",
    album: "back to life",
    type: "Original Song",
    karaoke: [],
    date: "2026.06.29",
    image: "images/backtolife.jpg",
    url: "song/back to life.html"
  },
  {
    title: "STAY",
    album: "STAY",
    type: "Original Song",
    karaoke: ["JOYSOUND", "DAM"],
    date: "2026.07.10",
    image: "images/stay.jpg",
    url: "song/STAY.html"
  },
  {
    title: "Endless Sun",
    album: "Endless Sun",
    type: "Original Song",
    karaoke: ["JOYSOUND", "DAM"],
    date: "2026.07.10",
    image: "images/endless sun.jpg",
    url: "song/Endless Sun.html"
  },
  {
    title: "Do It",
    album: "Do It",
    type: "Original Song",
    karaoke: ["JOYSOUND", "DAM"],
    date: "2026.07.10",
    image: "images/doit.jpg",
    url: "song/Do It.html"
  },
  {
    title: "I Like It",
    album: "ATE",
    type: "Original Song",
    karaoke: ["JOYSOUND", "DAM"],
    date: "2026.06.29",
    image: "images/ilikeit.jpg",
    url: "song/I Like It.html"
  },
  {
    title: "MANIAC",
    album: "ODDINARY",
    type: "Original Song",
    karaoke: ["JOYSOUND", "DAM"],
    date: "2026.06.12",
    image: "images/MANIAC.jpg",
    url: "song/MANIAC.html"
  }
];

const archiveList = document.getElementById("archiveList");

if (archiveList) {
  const pageType = archiveList.dataset.type;
  const pageValue = archiveList.dataset.value;

  const filteredSongs = songs.filter((song) => {
    if (pageType === "type") {
      return song.type === pageValue;
    }

    if (pageType === "album") {
      return song.album === pageValue;
    }

    if (pageType === "karaoke") {
      if (pageValue === "未配信") {
        return song.karaoke.length === 0;
      }

      return song.karaoke.includes(pageValue);
    }

    return true;
  });

  filteredSongs.forEach((song) => {
    const item = document.createElement("a");

    item.href = song.url;
    item.className = "archive-item";

    item.innerHTML = `
      <h2>${song.title}</h2>
      <p>${song.date}</p>
    `;

    archiveList.appendChild(item);
  });
}