<template>
  <div class="relative min-h-screen">
    <Header @linkClick="handleLinkClick" />
    
    <div 
      class="max-w-[1200px] mx-auto px-5"
    >
      <PageTitle :title="displayedTitle" :show-filters="route.meta.showFilters === true" />
    </div>

    <main class="max-w-[1200px] mx-auto px-5">
      <slot />
    </main>

    <TheFooter class="py-8 mt-8 border-t border-black" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Header from '~/components/Header.vue';
import PageTitle from '~/components/PageTitle.vue';
import TheFooter from '~/components/TheFooter.vue';

const route = useRoute();
const clickedTitle = ref(''); 

// Initialize clickedTitle with the current page's meta title on component mount/route change
watch(() => route.meta.title, (newTitle) => {
  if (newTitle) {
    clickedTitle.value = newTitle as string;
  }
}, { immediate: true }); 

const handleLinkClick = (title: string) => {
  clickedTitle.value = title;
};

const displayedTitle = computed(() => {
  // Priority: 
  // 1. Manually clicked link title
  // 2. Dynamic title set in route meta by the page (for [...slug].vue)
  // 3. Static title set in definePageMeta
  return clickedTitle.value || (route.meta.dynamicTitle as string) || (route.meta.title as string) || '';
});
</script>

<style scoped>

</style>
