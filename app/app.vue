<template>
  <NuxtPage />
</template>

<style>
:root {
  --bg: #f6f7fb;
  --text: #14182b;
  --muted: #5b6178;
  --accent: #3d6bff;
  --card: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f1220;
    --text: #e8eaf3;
    --muted: #9aa0b8;
    --accent: #7c9bff;
    --card: #181c2e;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}
</style>
