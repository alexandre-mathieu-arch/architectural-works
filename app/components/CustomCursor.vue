<template>
  <div
    v-if="mounted && !isHidden"
    ref="cursor"
    class="fixed z-[9999] rounded-full bg-black pointer-events-none transition-transform duration-75 ease-out"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
      transform: `translate(-50%, -50%) scale(${scale})`
    }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isHidden = computed(() => route.meta.hideCustomCursor === true);

const x = ref(0);
const y = ref(0);
const size = ref(20); // Initial size of the cursor
const scale = ref(1); // Initial scale
const mounted = ref(false);

const updateCursorPosition = (e: MouseEvent) => {
  x.value = e.clientX;
  y.value = e.clientY;
};

onMounted(() => {
  mounted.value = true;
  window.addEventListener('mousemove', updateCursorPosition);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCursorPosition);
});
</script>