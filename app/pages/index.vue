<template>
  <div class="w-full h-screen">
    <NuxtLink to="/projects" class="w-full h-full block">
      <NuxtImg
        v-if="randomImage"
        :src="randomImage"
        class="w-full h-full object-cover"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'home',
  title: { main: 'Avel', sub: "Atelier d'architecture" }
})

const images = [
  '/images/projects/avenue-de-la-marne/200.jpg',
  '/images/projects/cormier/cormier-ext.png',
  '/images/projects/portaledge/portaledge.png',
  '/images/projects/villa-atlas/villa-atlas.png',
  '/images/projects/cormier/cormier-facade.jpg',
];

const randomImage = ref<string | null>(null);

onMounted(() => {
  const randomIndex = Math.floor(Math.random() * images.length);
  randomImage.value = images[randomIndex];
});
</script>

<style scoped>
/* Any specific styles for the landing page */
</style>
