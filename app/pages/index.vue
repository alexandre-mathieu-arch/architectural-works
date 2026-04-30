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
      <!-- Placeholder while loading or if error -->
      <div v-else class="w-full h-full bg-gray-100 dark:bg-gray-800"></div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home',
  displayTitle: { main: 'Alexandre Mathieu', sub: "architecture & design" }
})

useHead({
  title: 'Alexandre Mathieu — architecture & design'
})

const { data: projects, error: projectsError } = await useAsyncData('home-projects', () => {
  return queryCollection('content')
    .where('path', 'LIKE', '/projects/%')
    .all()
})

// Use useState to ensure the same image is picked on SSR and Client
const heroImage = useState<string | null>('hero-image', () => {
  try {
    if (!projects.value || projects.value.length === 0) {
      return '/hero.jpg';
    }

    const forbiddenKeywords = [
      'plan', 'coupe', 'section', 'schema', 'detail', 'chantier', 
      'process', 'sketch', 'dessin', 'rdc', 'r+', 'r-', 'axono', 
      'facade', 'façade', 'zone.identifier', '_original'
    ]
    
    const allImages = projects.value.flatMap(project => {
      if (!project) return [];
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
      const selected = allImages[randomIndex];
      if (selected) {
        return selected.startsWith('/') ? selected : '/' + selected;
      }
    }
  } catch (e) {
    console.error('Error selecting hero image:', e);
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
