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
  title: { main: 'Soñj', sub: "architecture & design" }
})

const { data: projects } = await useAsyncData('home-projects', () => {
  return queryCollection('content')
    .where('path', 'LIKE', '/projects/%')
    .all()
})

const randomImage = ref<string | null>(null);

onMounted(() => {
  if (projects.value) {
    // Collect all images from all projects
    const allImages = projects.value.flatMap(project => {
      const imgs = project.images || project.image || []
      return Array.isArray(imgs) ? imgs : [imgs]
    }).filter(img => typeof img === 'string' && img.length > 0)

    if (allImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * allImages.length);
      randomImage.value = allImages[randomIndex];
    }
  }
});
</script>

<style scoped>
/* Any specific styles for the landing page */
</style>
