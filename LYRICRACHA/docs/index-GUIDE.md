# SKZ Lyric LAB トップページHTMLガイド

対象ファイル：

```text
index.html
```

このファイルは、SKZ Lyric LABのトップページ全体を構成している。

主な内容：

1. ページ基本設定
2. ローディング画面
3. 共通ヘッダー・メニュー
4. ヒーロー画面
5. サイト統計
6. 最新曲表示
7. クイックアクセス
8. アルバム一覧
9. 曲データベース
10. フッター
11. JavaScriptの読み込み

---

## 1. HTMLの基本設定

```html
<!DOCTYPE html>
<html lang="ja">
```

* `<!DOCTYPE html>`：HTML5を使用する宣言
* `lang="ja"`：ページの主な言語が日本語であることを示す

---

## 2. head内の設定

### 文字コード

```html
<meta charset="UTF-8">
```

日本語などを文字化けさせずに表示する。

### スマートフォン対応

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
>
```

スマホ画面の横幅に合わせてページを表示する。

これがないと、スマホでもPC版のような大きなレイアウトになる。

### ページ説明

```html
<meta
  name="description"
  content="Stray Kidsのカナルビ・和訳・パート分けを掲載する非公式ファンサイト"
>
```

検索エンジンやリンク共有時に使用されるサイト説明。

### ページタイトル

```html
<title>SKZ Lyric LAB</title>
```

ブラウザのタブに表示される名前。

---

## 3. CSSファイル

```html
<link rel="stylesheet" href="css/style.css">

<link
  rel="stylesheet"
  href="css/common-header.css?v=20260806-1"
>
```

### `style.css`

トップページ全体のデザインを担当する。

主な対象：

* ローディング画面
* ヒーロー
* 最新曲
* アルバム一覧
* 曲カード
* フッター
* スマホ表示

### `common-header.css`

全ページ共通のヘッダーとハンバーガーメニューを担当する。

### `?v=20260806-1`

```text
common-header.css?v=20260806-1
```

ブラウザに古いCSSが残るのを防ぐキャッシュ対策。

CSSを更新したのに反映されない場合は数字を変更する。

```html
href="css/common-header.css?v=20260808-1"
```

---

## 4. アイコン・PWA設定

### ブラウザアイコン

```html
<link
  rel="icon"
  type="image/png"
  sizes="48x48"
  href="/karauri-site/straykids/images/icons/favicon.png?v=3"
>
```

ブラウザのタブや共有画面などで使用される。

### ホーム画面用アイコン

```html
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="/karauri-site/straykids/images/icons/apple-touch-icon.png?v=3"
>
```

iPhoneなどでホーム画面へ追加した際に使われるアイコン。

### Webアプリ設定

```html
<link
  rel="manifest"
  href="/karauri-site/straykids/manifest.json?v=3"
>
```

Androidの「ホーム画面に追加」「アプリをインストール」で使用する設定ファイル。

### テーマカラー

```html
<meta name="theme-color" content="#ff3f83">
```

対応ブラウザのアドレスバーなどに使用される色。

---

# body内の構造

## 5. ローディング画面

```html
<div id="loadingScreen" class="loading-screen">
```

ページを開いた直後に表示される起動画面。

### JavaScriptで使用するID

| ID                | 役割         |
| ----------------- | ---------- |
| `loadingScreen`   | ローディング画面全体 |
| `loadingMessage`  | 読み込みメッセージ  |
| `loadingProgress` | 進行バー       |
| `loadingPercent`  | パーセント表示    |

```html
<h1 class="loading-logo" data-text="SKZ">
  SKZ
</h1>
```

`data-text="SKZ"`は、CSSのグリッチ演出で同じ文字を複製するために使用する。

---

## 6. 背景演出

```html
<div class="background-grid"></div>
<div class="scanlines"></div>
<div id="pointerGlow" class="pointer-glow"></div>
```

| クラス・ID             | 役割           |
| ------------------ | ------------ |
| `.background-grid` | 背景の格子模様      |
| `.scanlines`       | モニター風の走査線    |
| `#pointerGlow`     | マウス位置に追従する発光 |

`pointerGlow`はJavaScriptから座標を変更する。

---

## 7. 共通ヘッダー

```html
<header class="site-header">
```

サイト上部のロゴとメニューボタンを表示する。

### ロゴ

```html
<a href="index.html" class="header-logo">
```

クリックするとトップページへ戻る。

### ハンバーガーボタン

```html
<button
  id="menuButton"
  class="menu-button"
  aria-expanded="false"
  aria-controls="globalNav"
>
```

| 属性                          | 意味               |
| --------------------------- | ---------------- |
| `id="menuButton"`           | JavaScriptから取得する |
| `aria-expanded="false"`     | メニューが閉じている状態     |
| `aria-controls="globalNav"` | 操作対象のメニューID      |
| `aria-label`                | 読み上げソフト用の説明      |

JavaScriptが開閉時に次のように変更する。

```text
aria-expanded="false" → 閉じている
aria-expanded="true"  → 開いている
```

---

## 8. グローバルナビゲーション

```html
<nav
  id="globalNav"
  class="global-nav"
  aria-label="メインメニュー"
>
```

ヘッダーの外に配置されている共通メニュー。

JavaScriptが `.is-open` を付け外しして開閉する。

```text
global-nav
↓ メニューボタンを押す
global-nav is-open
```

### メニューの移動先

| 表示       | 移動先         |
| -------- | ----------- |
| LATEST   | トップページの最新曲  |
| ARCHIVE  | トップページのアルバム |
| DATABASE | トップページの曲一覧  |
| SEARCH   | 検索ページ       |
| MEMBERS  | メンバーページ     |
| ABOUT    | サイト説明ページ    |

```html
<a href="index.html#latest">
```

`#latest`は、同じIDを持つ場所へ移動するページ内リンク。

---

# メインコンテンツ

## 9. ヒーロー画面

```html
<section class="hero">
```

トップページ最上部のメインビジュアル。

構成：

```text
hero
├─ 背景演出
├─ サイトタイトル・説明
├─ ステータス
├─ 操作ボタン
├─ メイン画像
└─ スクロール案内
```

### `.reveal`

```html
<div class="hero-content reveal">
```

スクロールしたときに表示アニメーションを付けるクラス。

JavaScriptによって次のクラスが追加される。

```text
reveal
↓ 表示範囲に入る
reveal is-visible
```

### グリッチタイトル

```html
<span
  class="hero-title-main glitch"
  data-text="LYRIC LAB"
>
  LYRIC LAB
</span>
```

`data-text`はCSSの疑似要素で文字を複製するために使用する。

表示文字を変える場合は、両方を同じ内容にする。

```html
data-text="LYRIC LAB"
>
  LYRIC LAB
```

---

## 10. ヒーローステータス

```html
<strong id="heroSongCount">000</strong>
```

登録曲数を表示する。

初期値は `000` だが、JavaScriptが `songs` 配列の件数へ変更する。

```text
songs.length
↓
heroSongCount
```

---

## 11. ヒーローボタン

### 曲データベースへ移動

```html
<a href="#database">
  ENTER DATABASE
</a>
```

トップページ内の曲一覧までスクロールする。

### ランダム曲

```html
<button id="randomSongButton">
  RANDOM FILE
</button>
```

JavaScriptが登録曲から1曲をランダムに選び、その歌詞ページへ移動する。

### Aboutページ

```html
<a class="hero-guide-link" href="about.html">
  VIEW SYSTEM GUIDE
</a>
```

初めてサイトを使う人向けの説明ページへ移動する。

---

## 12. ヒーロー画像

```html
<img
  src="images/song/RUN IT.jpg"
  alt="Stray Kids"
>
```

* `src`：表示する画像の場所
* `alt`：画像を表示できない場合や読み上げ用の説明

装飾用クラス：

```text
.frame-corner
.scan-beam
.hero-circle
```

これらはCSSで角枠・スキャン光・円形演出を表示する。

---

## 13. サイト状況

```html
<section class="status-strip">
```

サイトの登録状況を表示する。

### JavaScriptで更新されるID

| ID                | 表示内容    |
| ----------------- | ------- |
| `totalSongCount`  | 登録曲数    |
| `totalAlbumCount` | 登録アルバム数 |
| `lastUpdateDate`  | 最新更新日   |

これらはHTMLへ直接毎回入力せず、JavaScriptのデータから自動取得する。

---

## 14. 最新曲セクション

```html
<section
  id="latest"
  class="section latest-section"
>
```

登録曲の中から新しい曲をスライダー形式で表示する。

### 操作ボタン

```html
<button id="latestPrev">←</button>
<button id="latestNext">→</button>
```

| ID           | 動作  |
| ------------ | --- |
| `latestPrev` | 前の曲 |
| `latestNext` | 次の曲 |

### JavaScriptが更新する要素

| ID                 | 内容            |
| ------------------ | ------------- |
| `latestCard`       | カード全体         |
| `latestImage`      | 曲画像           |
| `latestCurrent`    | 現在の番号         |
| `latestTotal`      | 表示曲数          |
| `latestFileNumber` | ファイル番号        |
| `latestTags`       | 曲・アルバム・カラオケタグ |
| `latestTitle`      | 曲名            |
| `latestAlbum`      | アルバム名         |
| `latestDate`       | リリース日         |
| `latestLink`       | 歌詞ページのURL     |

最新曲の内容はHTMLへ直接追加するのではなく、JavaScriptの `songs` 配列から生成する。

---

## 15. クイックアクセス

```html
<section class="section quick-section">
```

主要ページへすぐ移動するためのカード。

| カード     | 移動先            |
| ------- | -------------- |
| Search  | `search.html`  |
| Members | `members.html` |
| Setlist | `setlist.html` |
| Albums  | `albums.html`  |

新しいカードを追加するときは、次の形式を複製する。

```html
<a href="移動先.html" class="quick-card reveal">
  <span class="quick-code">Q-05</span>
  <span class="quick-icon">記号</span>
  <h3>名前</h3>
  <p>説明</p>
  <span class="quick-arrow">↗</span>
</a>
```

---

## 16. アルバム一覧

```html
<section
  id="archive"
  class="section album-section"
>
```

アルバムカードを横スライダーで表示する。

### アルバムカードの挿入先

```html
<div id="albumRail" class="album-rail"></div>
```

HTML内にはアルバムカードを書かない。

JavaScriptの `albums` 配列と `renderAlbums()` によって自動生成される。

### スライダー

```html
<button id="albumPrev">←</button>
<button id="albumNext">→</button>
```

| ID          | 動作      |
| ----------- | ------- |
| `albumPrev` | 左へスクロール |
| `albumNext` | 右へスクロール |

---

## 17. 曲データベース

```html
<section
  id="database"
  class="section database-section"
>
```

登録曲の検索・絞り込み・一覧表示を担当する。

### 検索結果数

```html
<p id="resultCount">
  0 FILES
</p>
```

JavaScriptが検索結果の件数へ書き換える。

### 検索欄

```html
<input
  id="songSearch"
  type="search"
  placeholder="SEARCH LYRIC DATABASE"
  autocomplete="off"
>
```

入力するたびにJavaScriptの検索処理が実行される。

---

## 18. フィルターボタン

```html
<button
  class="filter-button"
  data-filter="joysound"
>
  JOYSOUND
</button>
```

### `data-filter`の意味

| 値          | 動作               |
| ---------- | ---------------- |
| `all`      | 全曲をリリース日の新しい順で表示 |
| `random`   | 全曲をランダム表示        |
| `joysound` | JOYSOUND対応曲のみ    |
| `dam`      | DAM対応曲のみ         |

表示名ではなく、`data-filter`の値をJavaScriptが読み取る。

新しいフィルターを追加する場合は、HTMLだけでなくJavaScriptにも条件を追加する必要がある。

---

## 19. 曲カードの挿入先

```html
<div id="songGrid" class="song-grid"></div>
```

曲カードはJavaScriptの `renderSongs()` が自動生成する。

### 該当曲がない場合

```html
<p id="noResults" hidden>
  NO MATCHING FILES FOUND.
</p>
```

検索結果が0件のときだけJavaScriptが表示する。

`hidden`は初期状態で非表示にする属性。

---

## 20. クロージングセクション

```html
<section class="closing-section">
```

ページ下部の演出と、曲一覧へ戻るボタンを表示する。

```html
<a href="#database">
  RETURN TO DATABASE
</a>
```

クリックすると曲データベースへ戻る。

### `aria-hidden="true"`

```html
<div class="closing-marquee" aria-hidden="true">
```

装飾用テキストを読み上げソフトから除外する。

---

## 21. フッター

```html
<footer class="site-footer">
```

サイト名・非公式サイト表記・稼働状況を表示する。

```html
<p>
  Stray Kids unofficial lyrics fan site.
</p>
```

非公式ファンサイトであることを示している。

---

## 22. ページ上部へ戻るボタン

```html
<button
  id="pageTop"
  class="page-top"
  aria-label="ページ上部へ戻る"
>
  ↑
</button>
```

一定量スクロールするとJavaScriptによって表示される。

押すとページ最上部まで滑らかにスクロールする。

---

## 23. JavaScriptの読み込み

```html
<script
  src="js/script.js?v=20260805-3"
></script>
```

トップページの機能を担当するJavaScript。

主な処理：

* ローディング画面
* ハンバーガーメニュー
* 登録曲数・アルバム数の表示
* 最新曲スライダー
* 曲検索
* フィルター
* 曲カード生成
* アルバムカード生成
* ランダム曲
* スクロールアニメーション
* ページトップボタン

`script`はbodyの最後に置くことで、HTMLを読み込んだあとにJavaScriptを実行できる。

---

# HTML・CSS・JavaScriptの関係

## class

```html
class="latest-card"
```

主にCSSがデザインを指定するために使う。

同じクラスを複数の要素へ付けられる。

## id

```html
id="latestCard"
```

主にJavaScriptが特定の要素を取得するために使う。

同じIDは1ページ内で1回だけ使用する。

## data属性

```html
data-filter="joysound"
```

HTML要素へ追加情報を持たせる。

JavaScriptでは次のように取得できる。

```js
button.dataset.filter
```

## aria属性

```html
aria-label="メニューを開く"
aria-expanded="false"
```

画面読み上げなどのアクセシビリティを向上させる。

---

# トップページへ曲を追加するとき

基本的には `index.html` を編集しない。

JavaScriptの `songs` 配列へ曲データを追加する。

```js
{
  title: "曲名",
  album: "アルバム名",
  type: "Original Song",
  date: "サイト投稿日",
  release: "リリース日",
  url: "song/曲名.html",
  image: "images/song/画像.jpg",
  karaoke: ["JOYSOUND", "DAM"],
  category: "latest",
  members: [
    "Bang Chan",
    "Lee Know"
  ]
}
```

このデータから以下が自動更新される。

* 曲カード
* 検索
* 絞り込み
* 最新曲
* 登録曲数
* ランダム曲

---

# アルバムを追加するとき

JavaScriptの `albums` 配列へ追加する。

```js
{
  title: "アルバム名",
  year: "2026",
  image: "images/albums/画像.jpg",
  url: "albums/アルバム名.html",
  available: true
}
```

### `available`

```text
true  → ページを開ける
false → COMING SOONとしてロック
```

未完成の場合：

```js
{
  title: "アルバム名",
  year: "2026",
  image: "images/albums/画像.jpg",
  url: "",
  available: false
}
```

---

# 編集時の注意点

1. ID名を変更したらJavaScript側も変更する
2. ファイル名の大文字・小文字を一致させる
3. GitHub Pagesでは空白や記号を含むファイル名に注意する
4. CSSやJSが反映されない場合はバージョン番号を変更する
5. `href`と`src`は現在のHTMLファイルから見た位置で指定する
6. HTMLタグの閉じ忘れに注意する
7. GitHubへ反映後、Pagesの更新に少し時間がかかる場合がある

このHTMLは、ページの「入れ物」を担当していて、曲やアルバムの内容は主にJavaScriptから自動生成される構造になっているよ。
