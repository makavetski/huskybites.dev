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
| `app/pages/index.vue` | главная страница (заглушка портфолио) |
| `public/car/index.html` | вход по QR-коду с машины, редирект на `TARGET_URL` |
| `public/CNAME` | домен `huskybites.dev` для GitHub Pages |
| `.github/workflows/deploy.yml` | автодеплой при push в `main` |

## Как сменить, куда ведёт QR-код

Открой `public/car/index.html`, поменяй `TARGET_URL` и сделай push.
Пустое значение — редирект на главную страницу сайта.
