<template>
  <div class="w-full h-screen">
    <NuxtLink to="/projects" replace class="w-full h-full block">
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
    // Filter images for the hero section automatically
    const forbiddenKeywords = ['plan', 'coupe', 'section', 'schema', 'detail', 'chantier', 'process', 'sketch', 'dessin', 'rdc', 'r+', 'r-', 'axono', 'facade', 'façade']
    
    const allImages = projects.value.flatMap(project => {
      // Priority 1: Use 'heroImages' if you really want to force something manually
      if (project.heroImages && Array.isArray(project.heroImages) && project.heroImages.length > 0) {
        return project.heroImages
      }

      const imgs = project.images || project.image || []
      const imageList = Array.isArray(imgs) ? imgs : [imgs]
      
      // Smart Filter: Remove technical files and images with forbidden keywords
      const cleanedImages = imageList.filter(img => {
        if (typeof img !== 'string' || img.length === 0) return false
        
        const name = img.toLowerCase()
        const isTechnical = forbiddenKeywords.some(keyword => name.includes(keyword))
        const isSystemFile = name.includes(':zone.identifier') || name.endsWith('_original')
        
        return !isTechnical && !isSystemFile
      })

      // If we have clean photos, we take them. Otherwise, we don't put anything for this project
      return cleanedImages
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
