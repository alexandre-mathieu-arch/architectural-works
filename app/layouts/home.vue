<template>
  <div class="h-screen relative">
    <Header @linkHover="handleLinkHover" />
    
    <div 
      v-if="hoveredTitle"
      class="w-[90vw] lg:w-[60vw] mx-auto px-0 absolute left-1/2 -translate-x-1/2 z-40"
      :style="{ top: `calc(var(--header-height) + 10px)` }"
    >
      <PageTitle :title="hoveredTitle" />
    </div>

    <main class="h-full">
      <slot />
    </main>

    <TheFooter class="absolute bottom-0 left-0 w-full pt-4 border-t border-black" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from '~/components/Header.vue';
import PageTitle from '~/components/PageTitle.vue';
import TheFooter from '~/components/TheFooter.vue';

const hoveredTitle = ref('');

const handleLinkHover = (title: string) => {
  hoveredTitle.value = title;
};
</script>

<style scoped>

</style>
