<template>
  <div class="w-full h-screen">
    <ImageCarousel
      :images="images"
      v-model="currentImageIndex"
      :autoplay="10000"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ImageCarousel from '~/components/ImageCarousel.vue';

definePageMeta({
  layout: 'home',
  title: { main: 'Avel', sub: "Atelier d'architecture" }
})

const currentImageIndex = ref(0);
const images = [
  '/images/projects/avenue-de-la-marne/200.jpg',
  '/images/projects/cormier/cormier-ext.png',
  '/images/projects/portaledge/portaledge.png',
  '/images/projects/villa-atlas/villa-atlas.png',
  '/images/projects/cormier/cormier-facade.jpg',
];
</script>

<style scoped>
/* Any specific styles for the landing page */
</style>
