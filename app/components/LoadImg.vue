<script setup lang="ts">
// An image that fades in once it has fully loaded; until then a loader (slot "loader", a running husky by default).
// The loader is there from the very first paint: html.js (set by a tiny script in <head>, see nuxt.config) hides
// the image until it is ready. Without JS the image simply shows as it loads.
const props = defineProps<{ src: string; alt: string; width?: number | string; height?: number | string; lazy?: boolean; label?: string }>()
const emit = defineEmits<{ error: []; load: [] }>()
const img = ref<HTMLImageElement | null>(null)
const ready = ref(false)
// The "show the loaders" mode (?loaders or the footer button) keeps the loader on screen.
const hold = useLoaders()
function done() {
  if (hold.value) return
  ready.value = true
  emit('load')
}
// The image may have loaded (or failed) before the page came alive, when no listener was there yet.
function check() {
  ready.value = false
  nextTick(() => {
    const el = img.value
    if (!el?.complete) return
    if (el.naturalWidth) done()
    else emit('error')
  })
}
onMounted(check)
watch(() => props.src, check)
watch(hold, (on) => (on ? (ready.value = false) : check()))
</script>

<template>
  <span class="li" :class="{ ready }">
    <img ref="img" :src="src" :alt="alt" :width="width" :height="height" :loading="lazy ? 'lazy' : undefined" decoding="async"
      @load="done" @error="emit('error')">
    <span v-if="!ready" class="li-loader"><slot name="loader"><HuskyRunner :label="label" /></slot></span>
  </span>
</template>

<style scoped>
.li { position: relative; display: block; }
.li img { transition: opacity 350ms ease; }
.li-loader { position: absolute; inset: 0; display: grid; place-items: center; pointer-events: none; }
@media (prefers-reduced-motion: reduce) { .li img { transition: none; } }
</style>

<style>
/* global on purpose: depends on the class the head script puts on <html> */
html.js .li:not(.ready) > img { opacity: 0; }
html:not(.js) .li-loader { display: none; }
</style>
