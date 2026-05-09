<template>
  <div 
    id="wrapper" 
    :class="[
      !isRevealed ? 'h-screen overflow-hidden cursor-pointer' : '',
    ]"
    @click="!isRevealed ? reveal() : null"
  >
    <Header 
      v-if="!route.meta.hideHeader"
      :class="[isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none', 'transition-opacity duration-1000']"
      @linkClick="handleLinkClick" 
      @linkHover="handleLinkHover" 
    />
    
    <!-- Curtain Overlay (Top) -->
    <div 
      class="fixed inset-x-0 top-0 h-1/2 z-[60] glass-fluted transition-transform duration-[1200ms] ease-curtain pointer-events-none"
      :class="[
        isRevealed ? '-translate-y-full' : 'translate-y-0'
      ]"
    ></div>
    <!-- Curtain Overlay (Bottom) -->
    <div 
      class="fixed inset-x-0 bottom-0 h-1/2 z-[60] glass-fluted transition-transform duration-[1200ms] ease-curtain pointer-events-none"
      :class="[
        isRevealed ? 'translate-y-full' : 'translate-y-0'
      ]"
    ></div>

    <!-- UI Overlay (Title & Info) -->
    <div 
      class="fixed inset-0 z-[70] flex flex-col items-center justify-center pointer-events-none transition-all duration-[1200ms] ease-curtain"
      :class="isRevealed ? 'opacity-0 scale-105' : 'opacity-100 scale-100'"
    >
      <!-- Centralized three-line info -->
      <div 
        class="main-container w-full flex flex-col items-center group/text"
      >
        <div class="relative border border-[#121212]/10 dark:border-white/10 px-8 py-10 md:px-16 md:py-12 flex flex-col items-center space-y-2 transition-colors duration-1000 group-hover/text:border-[#121212]/30 dark:group-hover/text:border-white/30">
          <div class="u-h4 text-[#121212] dark:text-white doux:text-[#4A4443] nuit:text-[#CDD6F4] uppercase tracking-[0.3em] group-hover/text:opacity-100 transition-opacity">
            Alexandre MATHIEU
          </div>
          <div class="u-h4 text-[#121212] dark:text-white doux:text-[#4A4443] nuit:text-[#CDD6F4] uppercase tracking-[0.2em] text-[10px] md:text-[12px] group-hover/text:opacity-80 transition-opacity wave-text">
            <span v-for="(char, i) in 'architecture design artistic'" :key="i" :style="{ animationDelay: `${i * 0.15}s` }" :class="{ 'mr-[0.3em]': char === ' ' }">
              {{ char === ' ' ? '&nbsp;' : char }}
            </span>
          </div>
          <span class="u-h4 text-white animate-pulse uppercase tracking-[0.5em] pt-4 group-hover/text:text-primary-900 dark:group-hover/text:text-primary-400 transition-colors">works</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div 
      class="transition-all duration-1000"
      :class="[!isRevealed ? 'h-screen overflow-hidden' : 'min-h-screen']"
    >
      <main class="pb-12 main-container" :style="{ paddingTop: 'var(--header-height)' }">
        <PageTitle 
          v-if="!route.meta.hideLayoutTitle"
          :class="[isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none', 'transition-opacity duration-1000']"
          :title="pageTitle" 
          :show-filters="route.meta.showFilters === true" 
          :readonly-filters="route.meta.readonlyFilters === true"
        />
        <div :class="[isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none', 'transition-opacity duration-1000 delay-300']">
          <slot />
        </div>
      </main>
      <TheFooter :class="[isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none', 'transition-opacity duration-1000']" />
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
