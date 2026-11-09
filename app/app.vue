<script setup lang="ts">
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&family=Unbounded:wght@600;700&display=swap',
    },
  ],
})
</script>

<template>
  <NuxtPage />
</template>

<style>
/* Husky palette: snow, charcoal coat, grey undercoat, ice-blue eyes. */
:root {
  --paper: #ffffff;
  --snow: #f3f6f8;
  --snow-strong: #ffffff;
  --ink: #2b3138;
  --coat: #2b3138;
  --fur: #8a949e;
  --muted: #5d6772;
  --line: #d9dfe4;
  --ice: #4fb3e8;
  --ice-deep: #1e73ae;
  --ice-glow: rgba(79, 179, 232, 0.22);
  --on-coat: #ffffff;
  --btn-bg: #2b3138;
  --btn-ink: #ffffff;
  --btn-hover: #1e73ae;
  --display: 'Unbounded', 'Segoe UI', system-ui, sans-serif;
  --text: 'Golos Text', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  :root {
    --paper: #232930;
    --snow: #1c2127;
    --snow-strong: #e9eef2;
    --ink: #eef2f5;
    --coat: #3b434c;
    --fur: #a3adb7;
    --muted: #a2acb6;
    --line: #333b44;
    --ice: #6cc4f0;
    --ice-deep: #8fd3f5;
    --ice-glow: rgba(108, 196, 240, 0.2);
    --on-coat: #eef2f5;
    --btn-bg: #6cc4f0;
    --btn-ink: #12171c;
    --btn-hover: #9bdaf7;
  }
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--snow); color: var(--ink); font-family: var(--text); font-size: 17px; line-height: 1.6;
  -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
</style>
