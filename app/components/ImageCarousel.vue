<template>
  <div class="carousel-container relative w-full h-full overflow-hidden">
    <Transition :name="transitionName">
      <img
        :key="currentIndex"
        :src="images[currentIndex]"
        class="w-full h-full object-cover absolute inset-0"
      />
    </Transition>

    <!-- Invisible Click Areas for Navigation -->
    <div class="absolute inset-0 flex">
      <div
        class="w-1/2 h-full z-10 cursor-left"
        @click="prev"
        title="Précédent"
      ></div>
      <div
        class="w-1/2 h-full z-10 cursor-right"
        @click="next"
        title="Suivant"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  images: string[]
  modelValue: number
  autoplay?: number
}>()

const emit = defineEmits(['update:modelValue'])

const transitionName = ref('slide-left');

const currentIndex = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const canGoPrev = computed(() => currentIndex.value > 0);
const canGoNext = computed(() => currentIndex.value < props.images.length - 1);

const next = () => {
  if (canGoNext.value) {
    transitionName.value = 'slide-left';
    currentIndex.value++;
  }
}

const prev = () => {
  if (canGoPrev.value) {
    transitionName.value = 'slide-right';
    currentIndex.value--;
  }
}

let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (props.autoplay) {
    intervalId = setInterval(next, props.autoplay)
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.4s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}

/* Custom cursors using inline SVGs */
.cursor-left {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='15 18 9 12 15 6'%3E%3C/polyline%3E%3C/svg%3E") 16 16, auto;
}

.cursor-right {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E") 16 16, auto;
}
</style>

