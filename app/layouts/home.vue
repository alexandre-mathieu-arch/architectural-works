<template>
  <div id="wrapper" class="h-screen overflow-hidden">
    <!-- Header removed for immersive Hero experience -->
    
    <!-- PageTitle Overlay -->
    <div 
      v-if="displayedTitle"
      class="w-full absolute top-0 left-0 z-40 bg-transparent pointer-events-none"
    >
      <div class="main-container pt-[var(--header-height)] pointer-events-auto">
        <NuxtLink to="/projects" class="block">
          <PageTitle :title="displayedTitle" />
        </NuxtLink>
      </div>
    </div>

    <!-- Main Content (Hero) -->
    <main class="absolute inset-0 z-0">
      <slot />
    </main>

    <!-- Footer Overlay -->
    <div class="absolute bottom-0 left-0 w-full z-40 bg-transparent">
      <TheFooter class="pt-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Header from '~/components/Header.vue';
import PageTitle from '~/components/PageTitle.vue';
import TheFooter from '~/components/TheFooter.vue';

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
  if (route.meta.title) {
    return route.meta.title;
  }
  return '';
});
</script>

<style scoped>

</style>
