<template>
  <div 
    id="wrapper" 
    :class="[
      !isRevealed ? 'h-screen overflow-hidden cursor-pointer' : '',
    ]"
    @click="!isRevealed ? reveal() : null"
  >
    <Header 
      :class="[isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none', 'transition-opacity duration-1000']"
      @linkClick="handleLinkClick" 
      @linkHover="handleLinkHover" 
    />
    
    <!-- Curtain Overlay (Top) -->
    <div 
      class="fixed inset-x-0 top-0 h-1/2 z-[60] glass-fluted transition-transform duration-[1200ms] ease-curtain border-b border-white/10 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] pointer-events-none"
      :class="isRevealed ? '-translate-y-full' : 'translate-y-0'"
    ></div>
    <!-- Curtain Overlay (Bottom) -->
    <div 
      class="fixed inset-x-0 bottom-0 h-1/2 z-[60] glass-fluted transition-transform duration-[1200ms] ease-curtain border-t border-white/10 dark:border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] pointer-events-none"
      :class="isRevealed ? 'translate-y-full' : 'translate-y-0'"
    ></div>

    <!-- UI Overlay (Title & Info) -->
    <div 
      class="fixed inset-0 z-[70] flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700"
      :class="isRevealed ? 'opacity-0' : 'opacity-100'"
    >
      <!-- Centralized three-line info -->
      <div 
        v-if="!isRevealed"
        class="main-container w-full flex flex-col items-center space-y-2 group/text"
      >
        <span class="u-h4 text-[#121212] dark:text-white doux:text-[#4A4443] nuit:text-[#CDD6F4] opacity-60 animate-pulse uppercase tracking-[0.3em] group-hover/text:opacity-100 transition-opacity">alexandre mathieu</span>
        <span class="u-h4 text-[#121212] dark:text-white doux:text-[#4A4443] nuit:text-[#CDD6F4] opacity-40 animate-pulse uppercase tracking-[0.2em] text-[10px] md:text-[12px] group-hover/text:opacity-80 transition-opacity">architectural + design + artistic</span>
        <span class="u-h4 text-[#121212]/30 dark:text-white/30 doux:text-[#4A4443]/30 nuit:text-[#CDD6F4]/30 animate-pulse uppercase tracking-[0.5em] pt-4 group-hover/text:text-primary-900 dark:group-hover/text:text-primary-400 transition-colors">works</span>
      </div>
    </div>

    <!-- Content -->
    <div 
      :style="{ paddingTop: isRevealed ? 'var(--header-height)' : '0' }" 
      :class="['transition-all duration-1000', !isRevealed ? 'h-screen overflow-hidden' : '']"
    >
      <main :class="['pb-12', isRevealed ? 'main-container' : '']">
        <PageTitle 
          v-if="isRevealed && !route.meta.hideLayoutTitle"
          :title="pageTitle" 
          :show-filters="route.meta.showFilters === true" 
          :readonly-filters="route.meta.readonlyFilters === true"
        />
        <slot />
      </main>
      <TheFooter v-if="isRevealed" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRevealedState } from '~/composables/useRevealedState';

const { isRevealed, reveal } = useRevealedState();
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

const pageTitle = computed(() => {
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
