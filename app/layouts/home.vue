<template>
  <div id="wrapper" class="h-screen overflow-hidden">
    <Header 
      v-if="isRevealed" 
      class="transition-opacity duration-1000"
      @linkClick="handleLinkClick" 
      @linkHover="handleLinkHover" 
    />
    
    <!-- Curtain Overlay (Top) -->
    <div 
      class="fixed inset-x-0 top-0 h-1/2 z-[60] glass-fluted transition-transform duration-[1200ms] ease-curtain border-b border-white/10 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      :class="isRevealed ? '-translate-y-full' : 'translate-y-0 cursor-pointer'"
      @click="isRevealed = true"
    ></div>
    <!-- Curtain Overlay (Bottom) -->
    <div 
      class="fixed inset-x-0 bottom-0 h-1/2 z-[60] glass-fluted transition-transform duration-[1200ms] ease-curtain border-t border-white/10 dark:border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
      :class="isRevealed ? 'translate-y-full' : 'translate-y-0 cursor-pointer'"
      @click="isRevealed = true"
    ></div>

    <!-- UI Overlay (Title & Info) -->
    <div 
      class="fixed inset-0 z-[70] flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700"
      :class="isRevealed ? 'opacity-0' : 'opacity-100'"
    >
      <!-- Centralized three-line info -->
      <div class="main-container w-full pointer-events-auto flex flex-col items-center space-y-2">
        <span class="u-h4 text-[#121212] dark:text-white opacity-60 animate-pulse uppercase tracking-[0.3em]">alexandre mathieu</span>
        <span class="u-h4 text-[#121212] dark:text-white opacity-40 animate-pulse uppercase tracking-[0.2em] text-[10px] md:text-[12px]">architectural + design + artistic</span>
        <span class="u-h4 text-[#121212]/30 dark:text-white/30 animate-pulse uppercase tracking-[0.5em] pt-4">works</span>
      </div>
    </div>

    <!-- Reveal Actions (Exit button when revealed) - REMOVED -->

    <!-- Navigation to Projects (Visible when revealed) - REMOVED -->

    <!-- Main Content (Hero) -->
    <main class="absolute inset-0 z-0">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const isRevealed = ref(false);
const route = useRoute();
const hoveredTitle = ref<string | object>('');
const clickedTitle = ref<string | object>('');

// Reset titles on route change
watch(() => route.fullPath, () => {
  clickedTitle.value = '';
  hoveredTitle.value = '';
}, { immediate: true });

const handleLinkHover = (title: string) => {
  hoveredTitle.value = title;
};

const handleLinkClick = (title: string) => {
  clickedTitle.value = title;
  hoveredTitle.value = title; 
};

const displayedTitle = computed(() => {
  // Priority: hover, then click, then static meta
  if (hoveredTitle.value) {
    return hoveredTitle.value;
  }
  if (clickedTitle.value) {
    return clickedTitle.value;
  }
  if (route.meta.displayTitle) {
    return route.meta.displayTitle;
  }
  return '';
});
</script>
