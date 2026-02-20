<template>
  <div class="h-screen relative overflow-hidden">
    <Header @linkClick="handleLinkClick" @linkHover="handleLinkHover" class="fixed top-0 left-0 w-full z-50"/>
    
    <!-- PageTitle Overlay -->
    <div 
      v-if="displayedTitle"
      class="w-full absolute left-0 z-40 bg-transparent"
      :style="{ top: `calc(var(--header-height) + 10px)` }"
    >
      <div class="w-[95%] lg:w-[60%] mx-auto px-0">
        <PageTitle :title="displayedTitle" />
      </div>
    </div>

    <!-- Main Content (Hero) -->
    <main class="absolute inset-0 z-0">
      <slot />
    </main>

    <!-- Footer Overlay -->
    <div class="absolute bottom-0 left-0 w-full z-40 bg-transparent">
      <TheFooter class="pt-4 border-t border-black" />
    </div>
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
