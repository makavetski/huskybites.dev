# huskybites.dev

Сайт-портфолио Mikhail Makavetski на Nuxt (статическая генерация), деплой на GitHub Pages.

## Локальный запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # статическая сборка в .output/public
```

## Что где лежит

| Файл | Зачем |
|---|---|
| `app/pages/indexclaude.vue` | главная страница (заглушка портфолио) |
| `public/car/index.html` | вход по QR-коду с машины: передаёт в бот (`/go/car`), бот считает скан и перенаправляет |
| `app/plugins/stats.client.ts` | анонимный счётчик просмотров (без cookies), адрес бота в `nuxt.config.ts` |
| `public/CNAME` | домен `huskybites.dev` для GitHub Pages |
| `.github/workflows/deploy.yml` | автодеплой при push в `main` |

## Как сменить, куда ведёт QR-код

В Telegram, в чате с ботом: `/qr car https://…` (например, на резюме `https://huskybites.dev/cv.pdf`).
`/qr` показывает, куда ведёт QR и сколько было сканов; `/qr notify` включает или выключает сообщения о сканах.
Сайт перевыкладывать не нужно.

## Статистика

Просмотры сайта и сканы QR: приватная страница бота `/dashboard` → вкладка «Сайт».
Ссылку с меткой источника можно давать так: `https://huskybites.dev/?src=cv` (резюме), `?src=linkedin` и т.п.
