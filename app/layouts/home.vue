<template>
  <div id="wrapper" class="h-screen overflow-hidden" @click="isRevealed = true">
    <!-- Header removed for immersive Hero experience -->
    
    <!-- Curtain Overlay (Left) -->
    <div 
      class="fixed inset-y-0 left-0 w-1/2 z-10 glass-fluted transition-transform duration-1000 ease-in-out pointer-events-none border-r border-white/5 dark:border-white/5"
      :class="isRevealed ? '-translate-x-full' : 'translate-x-0'"
    ></div>
    <!-- Curtain Overlay (Right) -->
    <div 
      class="fixed inset-y-0 right-0 w-1/2 z-10 glass-fluted transition-transform duration-1000 ease-in-out pointer-events-none"
      :class="isRevealed ? 'translate-x-full' : 'translate-x-0'"
    ></div>

    <!-- UI Overlay (Title & Info) -->
    <div 
      v-if="displayedTitle"
      class="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700"
      :class="isRevealed ? 'opacity-0' : 'opacity-100'"
    >
      <!-- Top Info -->
      <div class="absolute top-12 w-full flex justify-center">
        <span class="u-h4 text-[#121212] dark:text-white opacity-60">Alexandre Mathieu — Architectural & Design works</span>
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
      class="fixed bottom-12 inset-x-0 z-40 flex justify-center pointer-events-none transition-opacity duration-700"
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
        class="u-sub-link px-8 py-3 border border-[#121212]/20 dark:border-white/20 hover:border-primary-900 dark:hover:border-primary-400 bg-white/10 dark:bg-black/10 backdrop-blur-sm transition-all"
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
import Header from '~/components/Header.vue';
import PageTitle from '~/components/PageTitle.vue';
import TheFooter from '~/components/TheFooter.vue';

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

<style scoped>
</style>
