<template>
  <div class="h-screen relative">
    <Header @linkClick="handleLinkClick" @linkHover="handleLinkHover" class="fixed top-0 left-0 w-full z-50"/>
    
    <!-- PageTitle Overlay -->
    <div 
      v-if="displayedTitle"
      class="w-[90vw] lg:w-[60vw] mx-auto px-0 absolute left-1/2 -translate-x-1/2 z-40 bg-transparent"
      :style="{ top: `calc(var(--header-height) + 10px)` }"
    >
      <PageTitle :title="displayedTitle" />
    </div>

    <!-- Main Content (Hero) -->
    <main class="absolute inset-0 z-0">
      <slot />
    </main>

    <!-- Footer Overlay -->
    <TheFooter class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] lg:w-[60vw] px-0 pt-4 border-t border-black z-40 bg-transparent" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Header from '~/components/Header.vue';
import PageTitle from '~/components/PageTitle.vue';
import TheFooter from '~/components/TheFooter.vue';

const route = useRoute();
const hoveredTitle = ref('');
const clickedTitle = ref('');

// Initialize clickedTitle with the current page's meta title on component mount/route change
watch(() => route.meta.title, (newTitle) => {
  if (newTitle) {
    clickedTitle.value = newTitle as string;
  }
}, { immediate: true });

const handleLinkHover = (title: string) => {
  hoveredTitle.value = title;
};

const handleLinkClick = (title: string) => {
  clickedTitle.value = title;
  hoveredTitle.value = title; 
};

const displayedTitle = computed(() => hoveredTitle.value || clickedTitle.value);
</script>

<style scoped>

</style>
