<template>
  <div class="w-full h-screen relative overflow-hidden">
    <NuxtLink to="/projects" replace class="w-full h-full block">
      <NuxtImg
        v-if="heroImage"
        :src="heroImage"
        format="webp"
        width="1920"
        height="1080"
        class="w-full h-full object-cover transition-opacity duration-1000 opacity-100"
      />
      <!-- Placeholder while loading or if no image -->
      <div v-else class="w-full h-full bg-gray-50 dark:bg-[#121212] flex items-center justify-center">
        <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-300 animate-pulse" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

definePageMeta({
  layout: 'home',
  title: { main: 'Alexandre Mathieu', sub: "architecture & design" }
})

const { data: projects } = await useAsyncData('home-projects', () => {
  return queryCollection('content')
    .where('path', 'LIKE', '/projects/%')
    .all()
})

// Use useState to ensure the same image is picked on SSR and Client
const heroImage = useState<string | null>('hero-image', () => {
  if (!projects.value || projects.value.length === 0) {
    return '/hero.jpg';
  }

  const forbiddenKeywords = [
    'plan', 'coupe', 'section', 'schema', 'detail', 'chantier', 
    'process', 'sketch', 'dessin', 'rdc', 'r+', 'r-', 'axono', 
    'facade', 'façade', 'zone.identifier', '_original'
  ]
  
  const allImages = projects.value.flatMap(project => {
    // Schema defines images as optional array and image as optional string
    const imgs = project.images || project.image || []
    const imageList = Array.isArray(imgs) ? imgs : [imgs]
    
    return imageList.filter(img => {
      if (typeof img !== 'string' || img.length === 0) return false
      const lower = img.toLowerCase()
      return !forbiddenKeywords.some(kw => lower.includes(kw))
    })
  }).filter(img => typeof img === 'string' && img.length > 0)

  if (allImages.length > 0) {
    const randomIndex = Math.floor(Math.random() * allImages.length);
    const selected = allImages[randomIndex] as string;
    // Ensure path starts with / for Nuxt Image to resolve it correctly from the public folder
    return selected.startsWith('/') ? selected : '/' + selected;
  }
  
  return '/hero.jpg'; 
});
</script>

<style scoped>
/* Ensure the image fills the screen correctly */
img {
  image-rendering: -webkit-optimize-contrast;
}
</style>
