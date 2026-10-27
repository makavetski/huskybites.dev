<script setup lang="ts">
// TODO: fill in your real links before publishing.
const contacts = [
  { label: 'GitHub', href: 'https://github.com/makavetski' },
  { label: 'Telegram', href: '' }, // e.g. https://t.me/your_username
  { label: 'LinkedIn', href: '' }, // e.g. https://www.linkedin.com/in/your-profile
  { label: 'Email', href: '' }, // e.g. mailto:you@example.com
].filter((c) => c.href)

const stack = ['PHP', 'Laravel', 'Vue.js', 'Nuxt', 'MySQL', 'REST API']
</script>

<template>
  <main class="page">
    <section class="hero">
      <div class="husky" aria-hidden="true">🐺</div>
      <h1>Mikhail Makavetski</h1>
      <p class="role">Full Stack Developer · PHP/Laravel · Vue/Nuxt</p>
      <p class="lead">
        5+ years of commercial experience building web applications end to end.
        Open to new opportunities.
      </p>

      <ul class="stack">
        <li v-for="item in stack" :key="item">{{ item }}</li>
      </ul>

      <nav class="contacts">
        <a
          v-for="c in contacts"
          :key="c.label"
          :href="c.href"
          target="_blank"
          rel="noopener"
        >{{ c.label }}</a>
      </nav>
    </section>

    <footer class="footer">huskybites.dev — site under construction, the husky is supervising.</footer>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 16px;
}

.husky {
  font-size: 56px;
  line-height: 1;
}

h1 {
  font-size: clamp(32px, 6vw, 48px);
  line-height: 1.1;
  margin: 16px 0 8px;
}

.role {
  color: var(--accent);
  font-weight: 600;
  margin: 0;
}

.lead {
  color: var(--muted);
  font-size: 18px;
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  list-style: none;
}

.stack li {
  background: var(--card);
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 14px;
}

.contacts {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
}

.contacts a {
  color: var(--accent);
  font-weight: 600;
  text-decoration: none;
}

.contacts a:hover {
  text-decoration: underline;
}

.footer {
  margin-top: 64px;
  color: var(--muted);
  font-size: 14px;
}
</style>
