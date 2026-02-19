<template>
  <div>
    <Header @linkHover="handleLinkHover" />
    
    <div 
      v-if="currentRoute.path === '/' && hoveredTitle"
      class="w-[90vw] lg:w-[60vw] mx-auto px-0 absolute left-1/2 -translate-x-1/2 z-40"
      :style="{ top: `calc(var(--header-height) + 10px)` }"
    >
      <PageTitle :title="hoveredTitle" />
    </div>

    <main class="w-[90vw] lg:w-[60vw] mx-auto px-0">
      <slot />
    </main>

    <TheFooter class="py-8 mt-16 border-t border-black" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Header from '~/components/Header.vue';
import PageTitle from '~/components/PageTitle.vue';
import TheFooter from '~/components/TheFooter.vue';

const route = useRoute();
const currentRoute = computed(() => route); // Make route reactive for comparison

const hoveredTitle = ref('');

const handleLinkHover = (title: string) => {
  hoveredTitle.value = title;
};
</script>

<style scoped>

</style>
