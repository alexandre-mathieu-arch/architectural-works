<template>
  <div class="carousel-container relative w-full h-full overflow-hidden">
    <Transition mode="out-in" name="fade">
      <img 
        :key="currentIndex" 
        :src="images[currentIndex]" 
        class="w-full h-full object-cover"
      />
    </Transition>

    <!-- Invisible Click Areas for Navigation -->
    <div class="absolute inset-0 flex">
      <div 
        class="w-1/2 h-full cursor-left z-10" 
        @click="prev"
        title="Précédent"
      ></div>
      <div 
        class="w-1/2 h-full cursor-right z-10" 
        @click="next"
        title="Suivant"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
  modelValue: number
}>()

const emit = defineEmits(['update:modelValue'])

const currentIndex = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Custom cursors using inline SVGs */
.cursor-left {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 12H5M12 19l-7-7 7-7'/%3E%3C/svg%3E") 16 16, w-resize;
}

.cursor-right {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14M12 5l7 7-7 7'/%3E%3C/svg%3E") 16 16, e-resize;
}
</style>
