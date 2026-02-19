<template>
  <div>
    <Header @linkClick="handleLinkClick" />
    
    <div 
      class="w-[90vw] lg:w-[60vw] mx-auto px-0"
    >
      <PageTitle :title="displayedTitle" />
    </div>

    <main class="w-[90vw] lg:w-[60vw] mx-auto px-0">
      <slot />
    </main>

    <TheFooter class="py-8 mt-16 border-t border-black" />
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
    console.log('WATCH route.meta.title:', clickedTitle.value);
  }
}, { immediate: true }); // immediate: true ensures it runs on initial load

const handleLinkClick = (title: string) => {
  clickedTitle.value = title;
  console.log('handleLinkClick:', clickedTitle.value);
};

const displayedTitle = computed(() => {
  const title = clickedTitle.value || (route.meta.title as string) || '';
  console.log('displayedTitle computed:', title);
  return title;
});
</script>

<style scoped>

</style>
