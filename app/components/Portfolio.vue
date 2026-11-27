<script setup lang="ts">
import { contacts, en, ru, type Lang } from '~/data/profile'

const props = defineProps<{ lang: Lang }>()
const t = computed(() => (props.lang === 'ru' ? ru : en))
const year = new Date().getFullYear()
// "Show the loaders": ?loaders in the address or the footer button; the button works without a reload.
const showLoaders = useLoaders()
onMounted(() => { if (new URLSearchParams(location.search).has('loaders')) showLoaders.value = true })
function toggleLoaders() {
  showLoaders.value = !showLoaders.value
  const url = new URL(location.href)
  if (showLoaders.value) url.searchParams.set('loaders', '')
  else url.searchParams.delete('loaders')
  history.replaceState(null, '', url.toString().replace('loaders=', 'loaders'))
}
const other = computed(() => (props.lang === 'ru' ? '/en/' : '/'))
const site = 'https://huskybites.dev'
// The English page is en/index.html, and GitHub Pages answers /en with a redirect to /en/:
// search engines get the final address everywhere (canonical, hreflang, og:url, links, sitemap).
const pageUrl = computed(() => site + (props.lang === 'ru' ? '/' : '/en/'))

// Photo: public/photo.webp (a square crop of photo.jpg); if it is missing, the initials are shown.
const photoOk = ref(true)
// Header logo: Archie in glasses (public/logo-archie.png, cut from the sticker picture).
// Footer: footer-archie.webp (Gemini sticker, cut out). footer-me.webp is a spare sticker, not used now.
// public/archie-1.jpg, archie-2.jpg in the "Archie" section. A missing file is simply not shown.
const stickerOk = ref(true)
const archieOk = reactive<Record<string, boolean>>({})

// Photo viewer: which list is open and from which photo.
const viewer = ref<{ photos: { full: string; alt: string; caption?: string }[]; start: number } | null>(null)
function openPhotos(photos: { full: string; alt: string; caption?: string }[], start: number) {
  viewer.value = { photos, start }
}
const initials = computed(() => t.value.name.split(' ').map((w) => w[0]).join(''))

useHead(() => ({
  htmlAttrs: { lang: t.value.lang },
  title: t.value.title,
  meta: [
    { name: 'description', content: t.value.description },
    { property: 'og:type', content: 'profile' },
    { property: 'og:title', content: t.value.title },
    { property: 'og:description', content: t.value.description },
    { property: 'og:url', content: pageUrl.value },
    // link preview picture (Telegram, LinkedIn…): photo with the husky ears, in the page's language
    { property: 'og:image', content: `${site}/${props.lang === 'ru' ? 'og-ru' : 'og'}.png` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: t.value.title },
    { property: 'og:locale', content: props.lang === 'ru' ? 'ru_RU' : 'en_US' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'theme-color', content: '#2B3138' },
  ],
  link: [
    { rel: 'canonical', href: pageUrl.value },
    { rel: 'alternate', hreflang: 'ru', href: `${site}/` },
    { rel: 'alternate', hreflang: 'en', href: `${site}/en/` },
    { rel: 'alternate', hreflang: 'x-default', href: `${site}/` },
  ],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: t.value.name,
      // both spellings, so a search for either name finds the page
      alternateName: [ru.name, en.name, 'Mikhail Makovetsky'].filter((n) => n !== t.value.name),
      jobTitle: 'Full Stack Developer',
      url: pageUrl.value,
      image: `${site}/photo.webp`,
      description: t.value.description,
      email: `mailto:${contacts.email}`,
      address: { '@type': 'PostalAddress', addressLocality: 'Minsk', addressCountry: 'BY' },
      sameAs: [contacts.linkedin, contacts.github, contacts.telegram],
      knowsAbout: ['PHP', 'Laravel', 'Vue.js', 'Nuxt', 'TypeScript', 'MySQL', 'Redis'],
    }),
  }],
}))

// Count CV downloads in the private statistics (as a view of /cv.pdf).
const statsUrl = useRuntimeConfig().public.statsUrl as string
function cvClick() {
  try {
    navigator.sendBeacon?.(`${statsUrl}/hit`, JSON.stringify({ path: t.value.cta.cvFile, ref: '', src: `site-${props.lang}` }))
  } catch { /* statistics are optional */ }
}
</script>

<template>
  <div class="site">
    <header class="top">
      <a class="brand" :href="lang === 'ru' ? '/' : '/en/'" aria-label="HuskyBites">
        <img v-if="stickerOk" class="brand-sticker" src="/logo-archie.png" alt="" width="44" height="44" @error="stickerOk = false">
        <svg v-else class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M5 19 L9 2 L18 11 Z" class="ear"/>
          <path d="M35 19 L31 2 L22 11 Z" class="ear"/>
          <path d="M8.5 15 L10 6 L15 11 Z" class="ear-in"/>
          <path d="M31.5 15 L30 6 L25 11 Z" class="ear-in"/>
          <circle cx="20" cy="22" r="15" class="head"/>
          <path d="M6.5 25 C7.5 18 12.5 15 16.5 16 L20 21.5 L23.5 16 C27.5 15 32.5 18 33.5 25 C32.5 33 26.5 37 20 37 C13.5 37 7.5 33 6.5 25 Z" class="mask"/>
          <rect x="19.3" y="8" width="1.4" height="14" rx="0.7" class="mask"/>
          <circle cx="14.3" cy="23.6" r="2.1" class="eye"/>
          <circle cx="25.7" cy="23.6" r="2.1" class="eye"/>
          <ellipse cx="20" cy="29.6" rx="2.6" ry="1.9" class="nose"/>
          <path d="M18.2 32.4 C18.2 36.4 21.8 36.4 21.8 32.4 Z" class="tongue"/>
        </svg>
        <span>HuskyBites</span>
      </a>
      <nav class="nav" aria-label="Sections">
        <a href="#experience">{{ t.nav.experience }}</a>
        <a href="#skills">{{ t.nav.skills }}</a>
        <a href="#contacts">{{ t.nav.contacts }}</a>
        <NuxtLink :to="other" class="lang" :hreflang="lang === 'ru' ? 'en' : 'ru'">{{ t.nav.switchTo }}</NuxtLink>
      </nav>
    </header>

    <main>
      <section class="hero">
        <div class="hero-text">
          <h1>{{ t.name }}</h1>
          <p class="role">{{ t.role }}</p>
          <p class="lead">{{ t.lead }}</p>
          <div class="actions">
            <a class="btn primary" :href="contacts.telegram" target="_blank" rel="noopener">{{ t.cta.telegram }}</a>
            <a class="btn" :href="t.cta.cvFile" target="_blank" rel="noopener" @click="cvClick">
              {{ t.cta.cv }} <small>{{ t.cta.cvNote }}</small>
            </a>
          </div>
          <p class="status"><span class="dot" aria-hidden="true" />{{ t.status }}</p>
        </div>

        <div class="portrait" aria-hidden="false">
          <svg class="ears" viewBox="0 0 280 140" aria-hidden="true">
            <g class="ear-l"><path d="M18 140 L52 0 L132 92 Z" class="ear" /><path d="M42 118 L58 36 L108 92 Z" class="ear-in" /></g>
            <g class="ear-r"><path d="M262 140 L228 0 L148 92 Z" class="ear" /><path d="M238 118 L222 36 L172 92 Z" class="ear-in" /></g>
          </svg>
          <div class="photo">
            <LoadImg v-if="photoOk" src="/photo.webp" :alt="t.photoAlt" width="440" height="440" @error="photoOk = false">
              <!-- while the photo loads, the circle under the ears is a husky face that blinks -->
              <template #loader>
                <svg class="face" viewBox="5 4 30 34" aria-hidden="true">
                  <path d="M6.5 25 C7.5 18 12.5 15 16.5 16 L20 21.5 L23.5 16 C27.5 15 32.5 18 33.5 25 C32.5 33 26.5 37 20 37 C13.5 37 7.5 33 6.5 25 Z" class="face-mask" />
                  <rect x="19.3" y="6" width="1.4" height="16" rx="0.7" class="face-mask" />
                  <circle cx="14.3" cy="23.6" r="2.1" class="face-eye" /><circle cx="25.7" cy="23.6" r="2.1" class="face-eye" />
                  <ellipse cx="20" cy="29.6" rx="2.6" ry="1.9" class="face-nose" />
                  <path d="M18.2 32.4 C18.2 36.4 21.8 36.4 21.8 32.4 Z" class="face-tongue" />
                </svg>
              </template>
            </LoadImg>
            <span v-else class="initials">{{ initials }}</span>
          </div>
        </div>
      </section>

      <section id="experience" class="block">
        <h2>{{ t.experienceTitle }}</h2>
        <ol class="timeline">
          <li v-for="job in t.jobs" :key="job.period" class="job">
            <p class="period">{{ job.period }}</p>
            <div class="job-body">
              <h3>{{ job.company }}<span class="job-role">, {{ job.role }}</span></h3>
              <p class="product">{{ job.product }}</p>
              <ul>
                <li v-for="p in job.points" :key="p">{{ p }}</li>
              </ul>
              <p class="tech">{{ job.tech }}</p>
            </div>
          </li>
        </ol>
      </section>

      <section id="skills" class="block">
        <h2>{{ t.skillsTitle }}</h2>
        <dl class="skills">
          <template v-for="s in t.skills" :key="s.group">
            <dt>{{ s.group }}</dt>
            <dd>{{ s.items }}</dd>
          </template>
        </dl>
        <p class="note">{{ t.languages }}</p>

        <h2 class="sub">{{ t.educationTitle }}</h2>
        <p class="edu"><span class="period">{{ t.education.period }}</span><span>{{ t.education.text }}</span></p>
      </section>

      <section id="contacts" class="block contacts">
        <div class="contacts-text">
          <h2>{{ t.contactsTitle }}</h2>
          <p class="note">{{ t.contactsLead }}</p>
          <a class="email" :href="`mailto:${contacts.email}`">{{ contacts.email }}</a>
          <ul class="links">
            <li><a :href="contacts.telegram" target="_blank" rel="noopener">Telegram</a></li>
            <li><a :href="contacts.linkedin" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a :href="contacts.github" target="_blank" rel="noopener">GitHub</a></li>
            <li><a :href="t.cta.cvFile" target="_blank" rel="noopener" @click="cvClick">CV (PDF)</a></li>
          </ul>
        </div>
        <!-- the text in the frame is real text: it follows the language of the page -->
        <figure class="hello">
          <LoadImg :src="t.contactsSticker.src" :alt="t.contactsSticker.alt" lazy width="1100" height="779" />
          <figcaption class="hello-frame" aria-hidden="true">{{ t.contactsSticker.frame }}</figcaption>
        </figure>
      </section>
      <section v-if="t.archie.photos.some((p) => archieOk[p.src] !== false)" class="block archie">
        <div class="archie-head">
          <div>
            <h2>{{ t.archie.title }}</h2>
            <p class="archie-text">{{ t.archie.text }}</p>
          </div>
          <figure class="review">
            <LoadImg :src="t.archie.review.src" :alt="t.archie.review.alt" lazy width="1100" height="834" />
          </figure>
        </div>
        <div class="archie-photos">
          <template v-for="p in t.archie.photos" :key="p.src">
            <button v-if="archieOk[p.src] !== false" class="tile" type="button" :aria-label="`${t.lightbox.open}: ${p.alt}`"
              @click="openPhotos(t.archie.photos.filter((x) => archieOk[x.src] !== false), t.archie.photos.filter((x) => archieOk[x.src] !== false).indexOf(p))">
              <LoadImg :src="p.src" :alt="p.alt" lazy width="480" height="480" @error="archieOk[p.src] = false" />
            </button>
          </template>
        </div>

        <h3 class="life-title">{{ t.life.title }}</h3>
        <div class="life">
          <figure v-for="(p, n) in t.life.photos" :key="p.src">
            <button class="tile" type="button" :aria-label="`${t.lightbox.open}: ${p.alt}`" @click="openPhotos(t.life.photos, n)">
              <LoadImg :src="p.src" :alt="p.alt" lazy width="480" height="480" />
            </button>
            <figcaption>{{ p.caption }}</figcaption>
          </figure>
        </div>
      </section>
    </main>

    <Lightbox v-if="viewer" :photos="viewer.photos" :start="viewer.start" :labels="t.lightbox" @close="viewer = null" />

    <footer class="footer">
      <img class="footer-sticker" src="/footer-archie.webp" alt="" width="406" height="360" loading="lazy" decoding="async" />
      <div class="footer-text">
        <strong>{{ t.footer }}</strong>
        <span>{{ t.footerNote }}</span>
        <button type="button" class="loaders-btn" :aria-pressed="showLoaders" @click="toggleLoaders">
          {{ showLoaders ? t.loadersButton.hide : t.loadersButton.show }}
        </button>
      </div>
      <span class="footer-copy">© {{ year }} {{ t.name }}</span>
    </footer>
  </div>
</template>

<style scoped>
.site { max-width: 1040px; margin: 0 auto; padding: 0 24px; }

/* ---------- header ---------- */
.top { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 0; }
.brand { display: inline-flex; align-items: center; gap: 10px; color: var(--ink); text-decoration: none;
  font-family: var(--display); font-weight: 600; font-size: 15px; }
.brand-mark { width: 30px; height: 30px; }
.brand-sticker { width: 40px; height: 40px; border-radius: 50%; display: block; box-shadow: 0 0 0 2px var(--ice); }
.brand-mark .ear, .brand-mark .head { fill: var(--coat); }
.brand-mark .ear-in { fill: #e8a4a6; }
.brand-mark .nose { fill: #2a2226; }
.brand-mark .tongue { fill: #e5848f; }
.brand-mark .mask { fill: var(--snow-strong); }
.brand-mark .eye { fill: #b8742a; } /* Archie has brown eyes */
.nav { display: flex; align-items: center; gap: 22px; font-size: 15px; }
.nav a { color: var(--muted); text-decoration: none; }
.nav a:hover { color: var(--ink); }
.nav .lang { color: var(--ink); font-weight: 600; border: 1.5px solid var(--line); border-radius: 8px; padding: 3px 10px; }

/* ---------- hero ---------- */
.hero { display: grid; grid-template-columns: 1fr 300px; gap: 56px; align-items: center; padding: 56px 0 72px; }
h1 { font-family: var(--display); font-weight: 700; font-size: clamp(38px, 6.4vw, 68px); line-height: 1.02;
  letter-spacing: -0.02em; margin: 0; color: var(--ink); }
.role { font-size: clamp(18px, 2.2vw, 21px); font-weight: 600; color: var(--ink); margin: 18px 0 0; }
.lead { font-size: 18px; line-height: 1.6; color: var(--muted); max-width: 60ch; margin: 14px 0 0; }
.actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.btn { display: inline-flex; align-items: baseline; gap: 8px; padding: 12px 20px; border-radius: 12px; font-weight: 600;
  text-decoration: none; color: var(--ink); border: 1.5px solid var(--line); background: var(--paper); }
.btn small { font-weight: 400; color: var(--muted); font-size: 13px; }
.btn:hover { border-color: var(--ice); }
.btn.primary { background: var(--btn-bg); border-color: var(--btn-bg); color: var(--btn-ink); }
.btn.primary:hover { background: var(--btn-hover); border-color: var(--btn-hover); }
.status { display: flex; align-items: center; gap: 10px; margin: 22px 0 0; color: var(--muted); font-size: 15px; }
.dot { width: 9px; height: 9px; border-radius: 50%; background: var(--ice); box-shadow: 0 0 0 4px var(--ice-glow); }

/* the husky: ears over the photo, they prick up once on load */
.portrait { position: relative; width: 300px; padding-top: 74px; justify-self: end; }
.ears { position: absolute; top: 0; left: 10px; width: 280px; height: 140px; overflow: visible; }
.ears .ear { fill: var(--coat); }
.ears .ear-in { fill: #e8a4a6; } /* pink inside, like Archie's */
/* ears prick up on load, then twitch now and then like a real dog's; left and right on different rhythms */
.ear-l { transform-origin: 75px 120px;
  animation: prick-l 700ms cubic-bezier(.2, .9, .3, 1.2) 250ms both, twitch-l 3.7s ease-in-out 1.6s infinite; }
.ear-r { transform-origin: 205px 120px;
  animation: prick-r 700ms cubic-bezier(.2, .9, .3, 1.2) 250ms both, twitch-r 5.3s ease-in-out 2.9s infinite; }
@keyframes twitch-l {
  0%, 80%, 100% { transform: none; }
  84% { transform: rotate(-14deg); }
  88% { transform: rotate(4deg); }
  92% { transform: rotate(-7deg); }
}
@keyframes twitch-r {
  0%, 70%, 100% { transform: none; }
  74% { transform: rotate(12deg); }
  78% { transform: rotate(-3deg); }
  86% { transform: rotate(9deg); }
  90% { transform: none; }
}
@keyframes prick-l { from { transform: rotate(-28deg) translateY(14px); } to { transform: none; } }
@keyframes prick-r { from { transform: rotate(28deg) translateY(14px); } to { transform: none; } }
.photo { position: relative; width: 300px; height: 300px; border-radius: 50%; overflow: hidden; background: var(--coat);
  border: 6px solid var(--ice); display: grid; place-items: center; }
.photo .li { width: 100%; height: 100%; }
.photo :deep(img) { width: 100%; height: 100%; object-fit: cover; display: block; }
.face { width: 66%; height: auto; margin-top: 4%; }
.face-mask { fill: var(--snow-strong); }
.face-eye { fill: #b8742a; transform-box: fill-box; transform-origin: center; animation: blink 3.2s ease-in-out infinite; }
.face-nose { fill: #2a2226; }
.face-tongue { fill: #e5848f; transform-box: fill-box; transform-origin: 50% 0; animation: pant 900ms ease-in-out infinite; }
@keyframes pant { 0%, 100% { transform: none; } 50% { transform: scaleY(1.25); } }
@keyframes blink { 0%, 90%, 100% { transform: none; } 94% { transform: scaleY(0.1); } }
.initials { font-family: var(--display); font-weight: 700; font-size: 84px; color: var(--on-coat); letter-spacing: -0.03em; }

/* ---------- sections ---------- */
.block { padding: 56px 0; border-top: 1.5px solid var(--line); }
h2 { font-family: var(--display); font-weight: 600; font-size: 28px; letter-spacing: -0.01em; margin: 0 0 28px; color: var(--ink); }
h2.sub { margin-top: 48px; }

.timeline { list-style: none; margin: 0; padding: 0; }
.job { display: grid; grid-template-columns: 190px 1fr; gap: 32px; padding: 0 0 40px; }
.job:last-child { padding-bottom: 0; }
.period { margin: 3px 0 0; color: var(--muted); font-size: 15px; font-variant-numeric: tabular-nums; }
.job-body { border-left: 2px solid var(--line); padding-left: 28px; position: relative; }
.job-body::before { content: ''; position: absolute; left: -7px; top: 8px; width: 12px; height: 12px; border-radius: 50%;
  background: var(--paper); border: 2px solid var(--ice); }
h3 { font-size: 20px; margin: 0; color: var(--ink); }
.job-role { font-weight: 500; color: var(--muted); }
.product { margin: 6px 0 12px; color: var(--ink); font-weight: 500; }
.job ul { margin: 0; padding-left: 18px; color: var(--ink); max-width: 72ch; }
.job li + li { margin-top: 6px; }
.tech { margin: 14px 0 0; color: var(--muted); font-size: 14px; }

.skills { display: grid; grid-template-columns: 190px 1fr; gap: 14px 32px; margin: 0; }
.skills dt { color: var(--muted); }
.skills dd { margin: 0; color: var(--ink); max-width: 72ch; }
.note { color: var(--muted); margin: 22px 0 0; }
/* same columns as the experience and skills: the text wraps in its own column, not under the years */
.edu { margin: 0; color: var(--ink); display: grid; grid-template-columns: 190px 1fr; gap: 32px; }

.contacts { display: grid; grid-template-columns: 1fr minmax(280px, 460px); gap: 32px; align-items: center; }
.contacts .note { margin: -12px 0 18px; }
.hello { position: relative; margin: 0; container-type: inline-size; }
.hello :deep(img) { width: 100%; height: auto; display: block; }
html.js .hello:has(.li:not(.ready)) .hello-frame { opacity: 0; } /* the text appears together with the picture */ /* a die-cut sticker: transparent around the white outline */
/* the white board inside the wooden frame, measured on the picture: x 345–718, y 349–692 of 1100 × 779 */
.hello-frame { position: absolute; left: 31.4%; top: 44.8%; width: 33.9%; height: 44%; display: grid; place-items: center;
  padding: 0 2.5cqw; text-align: center; text-wrap: balance; font-family: var(--display); font-weight: 700;
  font-size: 3.8cqw; /* Unbounded is wide: the longest word ("проектам") must fit, or it sticks out to the right */
  line-height: 1.2; color: #2b3138; letter-spacing: -0.01em; }
@media (max-width: 820px) { .contacts { grid-template-columns: 1fr; } }
.email { font-weight: 600; font-size: clamp(18px, 2.2vw, 24px); color: var(--ink); white-space: nowrap;
  text-decoration: none; border-bottom: 3px solid var(--ice); }
.email:hover { color: var(--ice-deep); }
.links { display: flex; flex-wrap: wrap; gap: 12px 28px; list-style: none; padding: 0; margin: 28px 0 0; }
.links a { color: var(--ice-deep); font-weight: 600; text-decoration: none; }
.links a:hover { text-decoration: underline; }

/* footer: Archie sticker, note, copyright */
.footer { display: flex; align-items: center; gap: 18px; margin-top: 24px; padding: 28px 0 32px; border-top: 1.5px solid var(--line);
  color: var(--muted); font-size: 14px; }
.footer-sticker { display: block; width: auto; height: 76px; flex: none; } /* die-cut sticker, transparent background */
.footer-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.footer-text strong { color: var(--ink); font-weight: 600; font-size: 15px; }
.loaders-btn { align-self: flex-start; margin-top: 6px; padding: 0; border: 0; background: none; font: inherit; font-size: 14px;
  color: var(--ice-deep); cursor: pointer; text-decoration: underline; text-decoration-thickness: 1.5px; text-underline-offset: 3px; }
.loaders-btn:hover { color: var(--ink); }
.loaders-btn:focus-visible { outline: 3px solid var(--ice); outline-offset: 3px; border-radius: 4px; }
@media (max-width: 560px) {
  .footer { flex-wrap: wrap; gap: 12px 14px; }
  .footer-sticker { height: 58px; }
  .footer-copy { width: 100%; font-size: 13px; }
}

.archie-head { display: grid; grid-template-columns: minmax(260px, 440px) 1fr; gap: 40px; align-items: center; margin-bottom: 56px; }
.archie-head .review { order: -1; } /* picture on the left: the contacts above have theirs on the right */
.archie-text { color: var(--muted); max-width: 46ch; margin: -12px 0 0; }
.review { margin: 0; }
.review :deep(img) { width: 100%; height: auto; display: block; } /* die-cut sticker with a transparent background */
.review figcaption { margin-top: 8px; color: var(--muted); font-size: 14px; text-align: center; }
@media (max-width: 820px) { .archie-head { grid-template-columns: 1fr; gap: 18px; } .archie-head .review { order: 0; } }
.archie-photos { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.archie-photos :deep(img), .life :deep(img) { width: 100%; height: auto; aspect-ratio: 1; object-fit: cover; border-radius: 18px; display: block;
  border: 4px solid var(--paper); box-shadow: 0 0 0 1.5px var(--line); }
.life-title { margin: 40px 0 16px; font-family: var(--display); font-weight: 600; font-size: 20px; }
.life { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.tile { display: block; width: 100%; padding: 0; border: 0; background: none; cursor: zoom-in; border-radius: 18px; }
.tile :deep(img) { transition: transform 200ms ease, opacity 350ms ease; }
.tile .li { border-radius: 18px; background: var(--paper); } /* the running husky shows on this while the photo loads */
.tile:hover :deep(img) { transform: scale(1.02); }
.tile:focus-visible { outline: 3px solid var(--ice); outline-offset: 3px; }
.life figure { margin: 0; }
.life figcaption { margin-top: 8px; color: var(--muted); font-size: 14px; }
@media (max-width: 820px) {
  .archie-photos, .life { grid-template-columns: repeat(2, 1fr); gap: 10px; }
}

a:focus-visible { outline: 3px solid var(--ice); outline-offset: 3px; border-radius: 6px; }

/* ---------- small screens ---------- */
@media (max-width: 820px) {
  .hero { grid-template-columns: 1fr; gap: 8px; padding-top: 24px; }
  .portrait { order: -1; justify-self: start; width: 200px; padding-top: 50px; }
  .ears { left: 7px; width: 186px; height: 93px; }
  .photo { width: 200px; height: 200px; border-width: 5px; }
  .initials { font-size: 56px; }
  .job, .skills { grid-template-columns: 1fr; gap: 6px; }
  .skills dd { margin-bottom: 10px; }
  .job-body { padding-left: 20px; }
  .edu { grid-template-columns: 1fr; gap: 4px; }
  .nav { gap: 14px; }
  .nav a:not(.lang) { display: none; }
}
@media (prefers-reduced-motion: reduce) { .ear-l, .ear-r, .face-eye, .face-tongue { animation: none; } }
</style>
