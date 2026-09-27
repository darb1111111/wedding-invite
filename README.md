# Той чакыруусу (Wedding invitation)

Files:
- `index.html` — page structure and content (names, texts, addresses, schedule)
- `styles.css` — all visual styling (colors, fonts, spacing)
- `script.js` — envelope-open handler, scroll-in animation, and the countdown timer (edit `WEDDING_DATE` here to change the target date)
- `images/` — put your own photos here (see `images/README.txt`)

## What's new in this version

- **Белый фон у фото** — вместо простого исчезания в прозрачность, теперь
  края любой фотографии программно "закрашиваются" в белый цвет через
  `.photo-frame` (радиальный градиент поверх картинки), так что даже
  тёмный/пёстрый фон фотографии аккуратно сливается со страницей.
- **Мини-календарь с сердечком** — над обратным отсчётом теперь настоящая
  сетка календаря (Октябрь 2026), где день свадьбы отмечен сердечком —
  как в примере. Редактируется прямо в `index.html` (`.calendar` блок).
- **Фото под отсчётом** — ваша вторая фотография (цветы/стол) теперь
  стоит сразу под обратным отсчётом, с тем же эффектом белой рамки.
- **"Собирающаяся" анимация** — при прокрутке элементы каждой секции
  (иконки, надписи, даты) теперь проявляются по очереди — с лёгким
  размытием и сдвигом, — а не все разом. Логика в `script.js`
  (`stagger-child`), задержка между элементами настраивается там же.
- **Анимация линии в программе вечера** — "Кеченин программасы" теперь
  оформлена как таймлайн: пункты идут зигзагом слева-справа, а
  волнистая линия между ними "дорисовывается" при прокрутке до этого
  блока (эффект в `script.js`, ищите `timelinePath`).

## Ранние изменения (v1) — the base color is now pure white (`--white`), and the
  green accent has been replaced with a warm gold/taupe palette.
- **Elegant names** — the couple's names now use the script font "Great Vibes"
  (see `.names` and `.signature` in `styles.css`). Swap the `font-family` there
  for any other Google Font if you'd like a different style.
- **Envelope intro** — the page opens on a click-to-reveal envelope, matching
  the original template. It's the `#envelope` block at the top of
  `index.html`; edit the names/text inside it directly.
- **Photos** — two `<img>` placeholders are wired in (`images/hero.jpg` and
  `images/venue.jpg`). Drop your own photos into the `images/` folder with
  those exact names, or edit the `src` paths in `index.html`.
- **Smoother animations** — sections now fade and slide in gently as you
  scroll (one shared, slow transition, no bounce), handled by the
  `IntersectionObserver` in `script.js`.

## Фотографии — подробная инструкция

**Главное фото (над именами)** уже добавлено — файл `images/hero.jpg`.
Его края специально растворяются в белый фон (класс `photo-fade` в
`styles.css`) — это сделано через CSS-маску, а не через саму картинку,
поэтому эффект применится к любому фото, которое вы туда положите.

Чтобы заменить фото:
1. Возьмите новую фотографию.
2. Назовите файл `hero.jpg` (или `hero.png`, но тогда поменяйте
   расширение в `src` в `index.html`).
3. Положите его в папку `images/`, заменив старый файл.
4. Больше ничего делать не нужно — размытие краёв применится автоматически.

Если хотите такой же эффект растворения краёв на другой фотографии
(например, ещё одна фотография пары в другом разделе) — добавьте
`class="photo photo-fade"` к тегу `<img>` этой фотографии в `index.html`.
Если эффект не нужен — оставьте только `class="photo tall"` или
`class="photo wide"`, без `photo-fade`.

**Фото места проведения** (`images/venue.jpg`) пока отключено —
оно закомментировано в `index.html`, в разделе с адресом зала. Когда
фото будет готово:
1. Положите файл `venue.jpg` в папку `images/`.
2. Откройте `index.html`, найдите блок с комментарием
   `PHOTO (currently off): ... images/venue.jpg`.
3. Удалите весь этот комментарий целиком (строки с `<!--` и `-->`
   вокруг) и раскомментируйте строку с `<img class="photo wide" ...>`.

Рекомендуемые пропорции:
- Главное фото — вертикальное или квадратное (примерно 4:5).
- Фото зала — горизонтальное (примерно 4:3).

Любой формат `.jpg` или `.png` подойдёт — главное, чтобы имя файла
совпадало с тем, что указано в `src`, либо поправьте путь вручную.

## Editing

Open `index.html` in any text editor. Every editable spot is marked with a comment like:

```html
<!-- EDIT: names of the bride and groom -->
```

Just change the text right after the comment. Colors and fonts live in `styles.css` under `:root` at the top (`--ivory`, `--ink`, `--sage`, `--gold`).

To change the countdown target date, open `script.js` and edit this line:

```js
const WEDDING_DATE = new Date(2026, 9, 17, 16, 0);
// year, month (0-based!), day, hour, minute
```

## Preview locally

Just double-click `index.html` to open it in a browser — no build step needed.

## Deploying

This is a static site (plain HTML/CSS/JS), so any static host works:

- **Vercel / Netlify**: drag-and-drop this folder onto their dashboard, or connect it as a Git repo.
- **GitHub Pages**: push this folder to a repo and enable Pages in settings.
- **Any web hosting**: upload the three files via FTP to your server's public folder.

No server, database, or build tools required.
