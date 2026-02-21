<template>
  <div id="wrapper">
    <Header @linkClick="handleLinkClick" />
    
    <div 
      class="main-container"
    >
      <PageTitle :title="displayedTitle" :show-filters="route.meta.showFilters === true" />
    </div>

    <main class="main-container">
      <slot />
    </main>

    <TheFooter class="py-8 mt-8" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Header from '~/components/Header.vue';
import PageTitle from '~/components/PageTitle.vue';
import TheFooter from '~/components/TheFooter.vue';

const route = useRoute();
// This ref can hold a simple string or a title object
const clickedTitle = ref<string | object>(''); 

// This watcher now primarily resets the clicked/hovered title upon route changes.
watch(() => route.fullPath, () => {
  clickedTitle.value = '';
}, { immediate: true }); 

const handleLinkClick = (title: string) => {
  clickedTitle.value = title;
};

const displayedTitle = computed(() => {
  // Priority order for displaying a title:
  // 1. A title from a user click/hover (overrides everything).
  if (clickedTitle.value) {
    return clickedTitle.value;
  }
  // 2. A dynamic title set by a specific page's logic.
  if (route.meta.dynamicTitle) {
    return route.meta.dynamicTitle;
  }
  // 3. The static title defined in the page's `definePageMeta`.
  if (route.meta.title) {
    return route.meta.title;
  }
  // 4. Fallback to an empty string.
  return '';
});
</script>

<style scoped>

</style>
