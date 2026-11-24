<script setup lang="ts">
// A small husky running on the spot: the loader for pictures that are still on their way.
defineProps<{ label?: string }>()
// A winter forest behind Archie, two layers that scroll at different speeds; each layer is drawn twice, 220 apart, to loop.
const W = 220
const pines = [
  { x: -38, h: 30 }, { x: -12, h: 40 }, { x: 14, h: 26 }, { x: 44, h: 44 }, { x: 70, h: 32 },
  { x: 98, h: 38 }, { x: 126, h: 28 }, { x: 150, h: 42 },
]
// a pine: three tiers on a short trunk, h = height, standing on y = 60
const pine = (x: number, h: number) => {
  const w = h * 0.42
  const y = 60 - h
  return `M${x} ${y} L${x - w * 0.55} ${y + h * 0.36} H${x - w * 0.3} L${x - w * 0.8} ${y + h * 0.66} H${x - w * 0.45}
    L${x - w} ${y + h * 0.92} H${x + w} L${x + w * 0.45} ${y + h * 0.66} H${x + w * 0.8} L${x + w * 0.3} ${y + h * 0.36} H${x + w * 0.55} Z`
}
// snow lying on the top and on each tier of a pine
const snow = (x: number, h: number) => {
  const w = h * 0.42
  const y = 60 - h
  const band = (t: number, half: number, out: number, drop: number) =>
    `M${x - w * half} ${y + h * t} H${x + w * half} L${x + w * out} ${y + h * (t + drop)} Q${x} ${y + h * (t + drop * 0.4)} ${x - w * out} ${y + h * (t + drop)} Z`
  return `M${x} ${y - 0.5} L${x - w * 0.24} ${y + h * 0.15} Q${x} ${y + h * 0.1} ${x + w * 0.24} ${y + h * 0.15} Z ` +
    band(0.36, 0.3, 0.44, 0.07) + ' ' + band(0.66, 0.45, 0.62, 0.07)
}
const forest = [0, W].flatMap((dx) => pines.map((p) => pine(p.x + dx, p.h)))
const forestSnow = [0, W].flatMap((dx) => pines.map((p) => snow(p.x + dx, p.h)))
const hills = [0, W].map((dx) => `M${-60 + dx} 60 Q${-20 + dx} 30 ${25 + dx} 48 T${110 + dx} 42 T${160 + dx} 60 Z`)
</script>

<template>
  <span class="runner" role="status" :aria-label="label">
    <svg viewBox="-50 -16 220 86" aria-hidden="true">
      <g class="hills"><path v-for="(d, k) in hills" :key="k" :d="d" /></g>
      <g class="forest">
        <path v-for="(d, k) in forest" :key="k" :d="d" />
        <path v-for="(d, k) in forestSnow" :key="'s' + k" class="pine-snow" :d="d" />
      </g>
      <rect class="snowfield" x="-60" y="58" width="240" height="14" />
      <g class="ground"><path d="M-50 64 H-28 M-16 64 H8 M20 64 H46 M58 64 H82 M94 64 H118 M130 64 H154 M166 64 H190" /></g>
      <g class="dog">
        <!-- Archie from the side: dark back and cap, white legs, chest and muzzle, brown eyes, tail curled over the back -->
        <rect class="leg far fl" x="74" y="38" width="6" height="20" rx="3" />
        <rect class="leg far bl" x="34" y="38" width="6" height="20" rx="3" />
        <g class="tail">
          <path class="coat" d="M31 28 C19 29 12 20 17 11 C21 4 32 7 31 15 C28 11 22 11 21 16 C20 21 25 24 32 24 Z" />
          <path class="snow" d="M30 26 C22 26 17 21 18 15 C19 20 24 23 31 23 Z" />
        </g>
        <ellipse class="coat" cx="54" cy="33" rx="28" ry="13" />
        <path class="snow" d="M28 37 C36 49 72 49 82 36 C82 44 76 47 54 47 C36 47 30 43 28 37 Z" />
        <ellipse class="snow" cx="77" cy="37" rx="7" ry="8" />
        <rect class="leg nl fr" x="70" y="38" width="7" height="21" rx="3.5" />
        <rect class="leg nl br" x="30" y="38" width="7" height="21" rx="3.5" />
        <g class="head">
          <path class="coat" d="M80 16 L83 2 L91 12 Z" /><path class="coat" d="M89 13 L96 1 L99 16 Z" />
          <path class="ear-in" d="M90 12 L95.5 4.5 L97 14 Z" />
          <circle class="coat" cx="90" cy="24" r="12" />
          <path class="snow" d="M84 26 C86 35 104 37 109 29 C107 24 99 21 94 21 C91 24 87 23 84 26 Z" />
          <circle class="eye" cx="94" cy="21" r="2" />
          <circle class="nose" cx="108" cy="28" r="2.5" />
          <path class="tongue" d="M101 31.5 C101 38 106 38 105.5 31 Z" />
        </g>
      </g>
    </svg>
  </span>
</template>

<style scoped>
.runner { display: grid; place-items: center; width: 100%; height: 100%; color: var(--ink); }
svg { width: min(180px, 86%); height: auto; overflow: hidden;
  /* the scene fades out at the sides instead of ending with a hard edge */
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent); }
.hills path { fill: var(--scene-far, #e6ecf1); }
.forest path { fill: var(--scene-pine, #7fa58c); }
.forest .pine-snow { fill: var(--scene-pine-snow, #ffffff); }
.snowfield { fill: var(--scene-snow, #f1f5f8); }
.hills { animation: run-far 9s linear infinite; }
.forest { animation: run-far 3.2s linear infinite; }
@keyframes run-far { from { transform: translateX(0); } to { transform: translateX(-220px); } }
.coat { fill: #23282e; } /* Archie is black */
/* a soft light outline around the whole dog where the background is dark (set by the page, or by the dark theme below) */
.dog { filter: var(--husky-outline, none); }
.snow { fill: var(--snow-strong); }
.far { fill: #c9d0d6; }
.nl { fill: var(--snow-strong); stroke: #c9d0d6; stroke-width: 1.2; } /* Archie's legs are white */
.ear-in { fill: #e8a4a6; }
.eye { fill: #b8742a; }
.tongue { fill: #e5848f; transform-box: fill-box; transform-origin: 50% 0; animation: pant 420ms ease-in-out infinite; }
.nose { fill: #14181c; }
.ground path { stroke: var(--line); stroke-width: 3; stroke-linecap: round; fill: none; }
/* on dark backgrounds Archie stays black and gets a thin light outline, so he does not vanish */
@media (prefers-color-scheme: dark) { .runner { --husky-outline: drop-shadow(0 0 1px rgba(255, 255, 255, 0.7)); --scene-far: #2b323a; --scene-pine: #3f5f4b; --scene-pine-snow: #c9d3da; --scene-snow: #262c33; } .far { fill: #6b7580; } .nl { stroke: #6b7580; } }
/* gallop: legs swing in pairs, the body bobs, the ground runs back */
.dog { animation: bob 420ms ease-in-out infinite; }
.leg { transform-box: fill-box; transform-origin: 50% 0; }
.fr, .bl { animation: swing 420ms ease-in-out infinite; }
.fl, .br { animation: swing 420ms ease-in-out -210ms infinite; }
.tail { transform-box: fill-box; transform-origin: 90% 95%; animation: wag 420ms ease-in-out infinite; }
.ground { animation: run 560ms linear infinite; }
@keyframes swing { 0%, 100% { transform: rotate(38deg); } 50% { transform: rotate(-38deg); } }
@keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
@keyframes pant { 0%, 100% { transform: none; } 50% { transform: scaleY(1.3); } }
@keyframes wag { 0%, 100% { transform: rotate(0); } 50% { transform: rotate(-14deg); } }
@keyframes run { from { transform: translateX(0); } to { transform: translateX(-36px); } }
@media (prefers-reduced-motion: reduce) { .dog, .leg, .tail, .tongue, .ground, .hills, .forest { animation: none; } }
</style>
