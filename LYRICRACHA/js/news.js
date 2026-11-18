
(() => {
  const news = window.LYRIRACHA_NEWS || [];

  const sortedNews = [...news].sort(
    (a, b) => b.date.localeCompare(a.date)
  );

  const isNew = (date) => {
    const published = new Date(`${date}T00:00:00`);
    const today = new Date();

    const elapsed = today - published;

    return elapsed >= 0 &&
      elapsed < 7 * 24 * 60 * 60 * 1000;
  };

  const createNewsItem = (item, isHome = false) => {
    const article = document.createElement("article");
    article.className = "news-log-item";

    const date = document.createElement("time");
    date.dateTime = item.date;
    date.textContent = item.date.replaceAll("-", ".");

    const category = document.createElement("span");
    category.className = "news-log-category";
    category.textContent = `[${item.category}]`;

    const title = document.createElement("strong");
    title.textContent = item.title;

    article.append(date, category, title);

    if (isNew(item.date)) {
      const badge = document.createElement("span");
      badge.className = "news-log-new";
      badge.textContent = "NEW";
      article.append(badge);
    }

    const bodyText = isHome
      ? (item.summary || item.body)
      : item.body;

    if (bodyText) {
      const body = document.createElement("p");
      body.className = "news-log-body";
      body.textContent = bodyText;
      article.append(body);
    }

    return article;
  };

  const home = document.getElementById("homeNewsList");
  const all = document.getElementById("allNewsList");

  if (home) {
    sortedNews.slice(0, 3).forEach((item) => {
      home.append(createNewsItem(item, true));
    });
  }

  if (all) {
    sortedNews.forEach((item) => {
      all.append(createNewsItem(item, false));
    });
  }
})();
