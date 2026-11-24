<script setup lang="ts">
// A small husky running on the spot: the loader for pictures that are still on their way.
defineProps<{ label?: string }>()
</script>

<template>
  <span class="runner" role="status" :aria-label="label">
    <svg viewBox="0 0 120 70" aria-hidden="true">
      <g class="ground"><path d="M0 64 H22 M34 64 H58 M70 64 H96 M108 64 H132" /></g>
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
svg { width: min(96px, 48%); height: auto; overflow: visible; }
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
@media (prefers-color-scheme: dark) { .runner { --husky-outline: drop-shadow(0 0 1px rgba(255, 255, 255, 0.7)); } .far { fill: #6b7580; } .nl { stroke: #6b7580; } }
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
@media (prefers-reduced-motion: reduce) { .dog, .leg, .tail, .tongue, .ground { animation: none; } }
</style>
