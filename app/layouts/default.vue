<template>
  <div id="wrapper">
    <Header @linkClick="handleLinkClick" @linkHover="handleLinkHover" />
    <div :style="{ paddingTop: 'var(--header-height)' }">
      <div 
        class="main-container min-h-[120px]"
      >
        <PageTitle :title="displayedTitle" :show-filters="route.meta.showFilters === true" />
      </div>

      <main class="main-container">
        <slot />
      </main>
    </div>
    <TheFooter class="py-8 mt-8" />
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

watch(() => route.fullPath, () => {
  clickedTitle.value = '';
  hoveredTitle.value = '';
}, { immediate: true }); 

const handleLinkClick = (title: string) => {
  clickedTitle.value = title;
  hoveredTitle.value = title;
};

const handleLinkHover = (title: string) => {
  hoveredTitle.value = title;
};

const displayedTitle = computed(() => {
  // Priority: hover > click > route meta
  if (hoveredTitle.value) {
    return hoveredTitle.value;
  }
  if (clickedTitle.value) {
    return clickedTitle.value;
  }
  if (route.meta.dynamicTitle) {
    return route.meta.dynamicTitle;
  }
  if (route.meta.title) {
    return route.meta.title;
  }
  return '';
});
</script>

<style scoped>

</style>
