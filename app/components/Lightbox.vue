<script setup lang="ts">
/**
 * Full-screen photo viewer: arrows / keys / swipe to move between photos; double tap (or double click),
 * pinch with two fingers or the mouse wheel to zoom, then drag to look around; Esc / ✕ / click on the background to close.
 */
export interface LightboxPhoto { full: string; alt: string; caption?: string }

const props = defineProps<{
  photos: LightboxPhoto[]
  start: number
  labels: { close: string; prev: string; next: string; hint: string }
}>()
const emit = defineEmits<{ close: [] }>()

const i = ref(props.start)
const photo = computed(() => props.photos[i.value])
const closeBtn = ref<HTMLButtonElement | null>(null)
const frame = ref<HTMLElement | null>(null)

// ---- zoom: the photo is moved by translate(tx, ty) scale(s) around its centre ----
const MAX = 4
const DOUBLE = 2.5
const view = reactive({ s: 1, tx: 0, ty: 0 })
const zoomed = computed(() => view.s > 1.01)
const animate = ref(true) // smooth for taps and buttons, instant while fingers move
const transform = computed(() => `translate(${view.tx}px, ${view.ty}px) scale(${view.s})`)

function reset() {
  animate.value = true
  view.s = 1
  view.tx = 0
  view.ty = 0
}
function go(step: number) {
  i.value = (i.value + step + props.photos.length) % props.photos.length
  reset()
}
/** Keep the photo covering its frame: no empty space can be dragged in. */
function clamp() {
  const r = frame.value?.getBoundingClientRect()
  if (!r) return
  const mx = ((view.s - 1) * r.width) / 2
  const my = ((view.s - 1) * r.height) / 2
  view.tx = Math.min(mx, Math.max(-mx, view.tx))
  view.ty = Math.min(my, Math.max(-my, view.ty))
}
/** Scale to s around the screen point (x, y), starting from the state `from`. */
function zoomAt(s: number, x: number, y: number, from = { s: view.s, tx: view.tx, ty: view.ty }, ax = x, ay = y) {
  const r = frame.value!.getBoundingClientRect()
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2
  // the photo point under (ax, ay) in the `from` state stays under (x, y)
  const px = (ax - cx - from.tx) / from.s
  const py = (ay - cy - from.ty) / from.s
  view.s = Math.min(MAX, Math.max(1, s))
  view.tx = x - cx - view.s * px
  view.ty = y - cy - view.s * py
  if (view.s === 1) { view.tx = 0; view.ty = 0 }
  clamp()
}
function toggleAt(x: number, y: number) {
  animate.value = true
  if (zoomed.value) reset()
  else zoomAt(DOUBLE, x, y)
}

// ---- gestures: one finger swipes (or drags when zoomed), two fingers pinch, a double tap zooms ----
const pts = new Map<number, { x: number; y: number }>()
let one: { x: number; y: number; tx: number; ty: number; t: number; moved: boolean } | null = null
let pinch: { d: number; mx: number; my: number; from: { s: number; tx: number; ty: number } } | null = null
let lastTap = { t: 0, x: 0, y: 0 }
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y)

function down(e: PointerEvent) {
  ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
  animate.value = false
  if (pts.size === 1) {
    one = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty, t: Date.now(), moved: false }
  } else if (pts.size === 2) {
    const [a, b] = [...pts.values()]
    pinch = { d: dist(a, b), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, from: { s: view.s, tx: view.tx, ty: view.ty } }
    one = null // a pinch is never a tap or a swipe
  }
}
function move(e: PointerEvent) {
  if (!pts.has(e.pointerId)) return
  pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
  if (pinch && pts.size >= 2) {
    const [a, b] = [...pts.values()]
    zoomAt(pinch.from.s * (dist(a, b) / pinch.d), (a.x + b.x) / 2, (a.y + b.y) / 2, pinch.from, pinch.mx, pinch.my)
    return
  }
  if (!one) return
  const dx = e.clientX - one.x
  const dy = e.clientY - one.y
  if (Math.abs(dx) > 8 || Math.abs(dy) > 8) one.moved = true
  if (zoomed.value) {
    view.tx = one.tx + dx
    view.ty = one.ty + dy
    clamp()
  }
}
function up(e: PointerEvent) {
  if (!pts.has(e.pointerId)) return
  pts.delete(e.pointerId)
  if (pinch) {
    if (pts.size < 2) {
      pinch = null
      if (view.s < 1.05) reset()
      // the finger still down continues as a drag, not as a tap
      const rest = [...pts.values()][0]
      one = rest ? { x: rest.x, y: rest.y, tx: view.tx, ty: view.ty, t: 0, moved: true } : null
    }
    return
  }
  const g = one
  one = null
  if (!g || e.type === 'pointercancel') return
  const dx = e.clientX - g.x
  const dy = e.clientY - g.y
  if (!zoomed.value && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) return go(dx < 0 ? 1 : -1)
  if (g.moved || Date.now() - g.t > 350) return
  // a tap: the second one within 300 ms near the first zooms in or out
  const now = Date.now()
  if (now - lastTap.t < 300 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 40) {
    lastTap = { t: 0, x: 0, y: 0 }
    toggleAt(e.clientX, e.clientY)
  } else {
    lastTap = { t: now, x: e.clientX, y: e.clientY }
  }
}
/** Mouse wheel / trackpad: zoom at the cursor. */
function wheel(e: WheelEvent) {
  e.preventDefault()
  animate.value = false
  zoomAt(view.s * Math.exp(-e.deltaY * 0.0025), e.clientX, e.clientY)
}

function key(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowRight') go(1)
  else if (e.key === 'ArrowLeft') go(-1)
}
// The big photo fades in when it has loaded; until then a husky runs in its place.
const loaded = ref(false)
const imgEl = ref<HTMLImageElement | null>(null)
const hold = useLoaders() // the "show the loaders" mode, see composables/useLoaders
function checkLoaded() {
  loaded.value = false
  if (hold.value) return
  nextTick(() => { if (imgEl.value?.complete && imgEl.value.naturalWidth) loaded.value = true })
}
watch(() => photo.value.full, checkLoaded)
let overflow = ''
onMounted(() => {
  window.addEventListener('keydown', key)
  overflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  closeBtn.value?.focus()
  checkLoaded()
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', key)
  document.body.style.overflow = overflow
})
</script>

<template>
  <Teleport to="body">
    <div class="lb" role="dialog" aria-modal="true" :aria-label="photo.alt" @click.self="emit('close')">
      <button ref="closeBtn" class="lb-btn lb-close" :aria-label="labels.close" @click="emit('close')">✕</button>
      <button v-if="photos.length > 1" class="lb-btn lb-prev" :aria-label="labels.prev" @click="go(-1)">‹</button>
      <button v-if="photos.length > 1" class="lb-btn lb-next" :aria-label="labels.next" @click="go(1)">›</button>

      <figure class="lb-figure" @click.self="emit('close')">
        <div ref="frame" class="lb-frame" :class="{ zoomed, animate }"
          @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up" @wheel="wheel">
          <HuskyRunner v-if="!loaded" class="lb-loading" />
          <img
            ref="imgEl"
            :key="photo.full"
            :class="{ hidden: !loaded }"
            @load="loaded = !hold"
            :src="photo.full"
            :alt="photo.alt"
            draggable="false"
            :style="{ transform }"
          >
        </div>
        <figcaption>
          <span v-if="photo.caption">{{ photo.caption }}</span>
          <span class="lb-meta">{{ i + 1 }} / {{ photos.length }} · {{ labels.hint }}</span>
        </figcaption>
      </figure>
    </div>
  </Teleport>
</template>

<style scoped>
.lb { position: fixed; inset: 0; z-index: 100; background: rgba(20, 24, 29, 0.94); display: grid; place-items: center;
  animation: lb-in 160ms ease-out; }
@keyframes lb-in { from { opacity: 0; } }
.lb-figure { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 12px; max-width: 94vw; }
.lb-frame { position: relative; overflow: hidden; border-radius: 14px; max-width: 94vw; max-height: 82vh;
  min-width: min(260px, 80vw); min-height: 160px; display: grid; place-items: center;
  touch-action: none; /* the page does not scroll or zoom under the viewer: pinch and swipes are ours */ }
.lb-frame img { display: block; max-width: 94vw; max-height: 82vh; object-fit: contain; cursor: zoom-in; user-select: none;
  -webkit-user-select: none; -webkit-touch-callout: none; transition: opacity 300ms ease; }
.lb-frame.animate img { transition: transform 220ms ease, opacity 300ms ease; }
.lb-frame.zoomed img { cursor: grab; }
.lb-frame img.hidden { opacity: 0; }
/* the loader on the dark overlay: black Archie with a light outline */
.lb-loading { position: absolute; inset: 0; --husky-outline: drop-shadow(0 0 1px rgba(255, 255, 255, 0.7)); --snow-strong: #ffffff; --line: rgba(255, 255, 255, 0.22); }
figcaption { color: #e9eef2; font-size: 15px; text-align: center; display: flex; flex-direction: column; gap: 2px; }
.lb-meta { color: #9aa5b0; font-size: 13px; }
.lb-btn { position: absolute; width: 48px; height: 48px; border-radius: 50%; border: 0; background: rgba(255, 255, 255, 0.12);
  color: #fff; font-size: 26px; line-height: 1; cursor: pointer; display: grid; place-items: center; }
.lb-btn:hover { background: rgba(255, 255, 255, 0.22); }
.lb-btn:focus-visible { outline: 3px solid #6cc4f0; outline-offset: 2px; }
.lb-close { top: 16px; right: 16px; font-size: 20px; }
.lb-prev { left: 16px; top: 50%; transform: translateY(-50%); }
.lb-next { right: 16px; top: 50%; transform: translateY(-50%); }
@media (max-width: 640px) {
  .lb-prev, .lb-next { top: auto; bottom: 18px; transform: none; }
}
@media (prefers-reduced-motion: reduce) { .lb { animation: none; } .lb-frame img { transition: none; } }
</style>
