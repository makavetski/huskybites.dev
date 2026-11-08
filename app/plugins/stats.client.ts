/**
 * Anonymous page-view counter: on every page view the browser sends {path, ref, src} to the bot
 * (POST /hit on the Cloudflare Worker). No cookies, no IP stored. Statistics: the private dashboard.
 * The bot's address is runtimeConfig.public.statsUrl in nuxt.config.ts.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const base = useRuntimeConfig().public.statsUrl as string
  if (!base || typeof navigator.sendBeacon !== 'function') return

  let first = true
  const send = (path: string, query: Record<string, unknown>) => {
    const src = query.utm_source ?? query.src ?? null
    const body = JSON.stringify({ path, ref: first ? document.referrer : '', src: typeof src === 'string' ? src : null })
    first = false
    navigator.sendBeacon(`${base}/hit`, body) // text/plain: no CORS preflight
  }

  const router = useRouter()
  nuxtApp.hook('app:mounted', () => send(router.currentRoute.value.path, router.currentRoute.value.query))
  router.afterEach((to, from) => {
    if (!first && to.path !== from.path) send(to.path, to.query)
  })
})
