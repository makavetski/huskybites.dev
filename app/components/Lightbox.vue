<script setup lang="ts">
/**
 * Full-screen photo viewer: arrows / keys / swipe to move between photos, double click or double tap
 * to zoom in (then drag to look around), Esc / ✕ / click on the background to close.
 */
export interface LightboxPhoto { full: string; alt: string; caption?: string }

const props = defineProps<{
  photos: LightboxPhoto[]
  start: number
  labels: { close: string; prev: string; next: string; hint: string }
}>()
const emit = defineEmits<{ close: [] }>()

const i = ref(props.start)
const zoomed = ref(false)
const origin = ref('50% 50%')
const pan = reactive({ x: 0, y: 0 })
const photo = computed(() => props.photos[i.value])
const closeBtn = ref<HTMLButtonElement | null>(null)

function reset() {
  zoomed.value = false
  pan.x = 0
  pan.y = 0
}
function go(step: number) {
  i.value = (i.value + step + props.photos.length) % props.photos.length
  reset()
}
function toggleZoom(e: MouseEvent | PointerEvent) {
  if (zoomed.value) return reset()
  const r = (e.target as HTMLElement).getBoundingClientRect()
  origin.value = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`
  zoomed.value = true
}

// swipe when not zoomed, drag when zoomed, double tap on touch screens
let start: { x: number; y: number; px: number; py: number } | null = null
let lastTap = 0
function down(e: PointerEvent) {
  start = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }
  ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
}
function move(e: PointerEvent) {
  if (!start || !zoomed.value) return
  pan.x = start.px + (e.clientX - start.x)
  pan.y = start.py + (e.clientY - start.y)
}
function up(e: PointerEvent) {
  if (!start) return
  const dx = e.clientX - start.x
  const dy = e.clientY - start.y
  start = null
  if (!zoomed.value && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) return go(dx < 0 ? 1 : -1)
  if (e.pointerType !== 'mouse' && Math.abs(dx) < 10 && Math.abs(dy) < 10) {
    const now = Date.now()
    if (now - lastTap < 300) toggleZoom(e)
    lastTap = now
  }
}

function key(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowRight') go(1)
  else if (e.key === 'ArrowLeft') go(-1)
}
let overflow = ''
onMounted(() => {
  window.addEventListener('keydown', key)
  overflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  closeBtn.value?.focus()
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
        <div class="lb-frame" :class="{ zoomed }">
          <img
            :key="photo.full"
            :src="photo.full"
            :alt="photo.alt"
            draggable="false"
            :style="{ transformOrigin: origin, transform: zoomed ? `translate(${pan.x}px, ${pan.y}px) scale(2.4)` : 'none' }"
            @dblclick="toggleZoom"
            @pointerdown="down"
            @pointermove="move"
            @pointerup="up"
            @pointercancel="start = null"
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
.lb-frame { overflow: hidden; border-radius: 14px; max-width: 94vw; max-height: 82vh; touch-action: none; }
.lb-frame img { display: block; max-width: 94vw; max-height: 82vh; object-fit: contain; cursor: zoom-in; user-select: none;
  transition: transform 220ms ease; }
.lb-frame.zoomed img { cursor: grab; transition: none; }
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
