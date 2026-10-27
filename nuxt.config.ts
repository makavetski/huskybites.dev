// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Static site: `npm run generate` -> .output/public (deployed to GitHub Pages)
  ssr: true,

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Mikhail Makavetski — Full Stack Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Full Stack Developer: PHP/Laravel and Vue.js/Nuxt. 5+ years of commercial experience.',
        },
      ],
      link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    },
  },
})
