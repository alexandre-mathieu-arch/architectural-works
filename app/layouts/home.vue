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
      v-if="displayedTitle"
      class="fixed inset-0 z-[55] flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700"
      :class="isRevealed ? 'opacity-0' : 'opacity-100'"
    >
      <!-- Top Info -->
      <div class="absolute top-12 w-full flex justify-center">
        <span class="u-h4 text-[#121212] dark:text-white opacity-60">alexandre mathieu | architectural & design works |</span>
      </div>

      <!-- Main Title -->
      <div class="main-container w-full pointer-events-auto">
        <NuxtLink to="/about" replace class="block">
          <PageTitle :title="displayedTitle" />
        </NuxtLink>
      </div>
    </div>

    <!-- Background Click Hint (visible only when not revealed) -->
    <div 
      class="fixed bottom-12 inset-x-0 z-[55] flex justify-center pointer-events-none transition-opacity duration-700"
      :class="isRevealed ? 'opacity-0' : 'opacity-100'"
    >
      <span class="u-h4 text-[#121212]/40 dark:text-white/40 animate-pulse uppercase tracking-[0.3em]">Découvrir</span>
    </div>

    <!-- Reveal Actions (Exit button when revealed) -->
    <div 
      class="fixed top-8 right-8 z-50 transition-opacity duration-700 pointer-events-auto"
      :class="isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    >
      <button 
        @click.stop="isRevealed = false"
        class="u-h4 uppercase tracking-widest text-[#121212] dark:text-white hover:text-primary-900 dark:hover:text-primary-400 transition-colors"
      >
        [retour]
      </button>
    </div>

    <!-- Navigation to Projects (Visible when revealed) -->
    <div 
      class="fixed bottom-12 inset-x-0 z-50 flex justify-center transition-all duration-700 delay-300"
      :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'"
    >
      <NuxtLink 
        to="/projects" 
        class="u-sub-link px-8 py-3 border border-[#121212]/20 dark:border-white/20 hover:border-primary-900 dark:hover:text-primary-400 bg-white/10 dark:bg-black/10 backdrop-blur-sm transition-all"
      >
        Entrer
      </NuxtLink>
    </div>

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
