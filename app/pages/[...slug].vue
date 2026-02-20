<script setup lang="ts">
import ImageCarousel from '~/components/ImageCarousel.vue'

definePageMeta({
  layout: 'default'
})

const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// Update route meta with project title so it's picked up by PageTitle in layout
watchEffect(() => {
  if (page.value) {
    route.meta.dynamicTitle = page.value.title;
  }
});

// Handle both single image and multiple images
const images = computed(() => {
  if (page.value) {
    if (Array.isArray(page.value.images) && page.value.images.length > 0) {
      return page.value.images
    }
    if (page.value.image) {
      return Array.isArray(page.value.image) ? page.value.image : [page.value.image]
    }
  }
  return []
})
</script>

<template>
  <div v-if="page" class="project-container">
    <div class="project-page">
      <div class="project-gallery" v-if="images.length > 0">
        <ImageCarousel :images="images" />
      </div>

      <div class="project-meta">
        <div v-if="page.date"><strong>Date:</strong> {{ new Date(page.date).toLocaleDateString() }}</div>
        <div v-if="page.tags && page.tags.length"><strong>Tags:</strong> <span>{{ page.tags.join(', ') }}</span></div>
        <div v-if="page.typologies && page.typologies.length"><strong>Typologie:</strong> <span>{{ page.typologies.join(', ') }}</span></div>
        <div v-if="page.tailles && page.tailles.length"><strong>Taille:</strong> <span>{{ page.tailles.join(', ') }}</span></div>
        <div v-if="page.pays"><strong>Pays:</strong> <span>{{ page.pays }}</span></div>
      </div>

      <div class="project-content">
        <ContentRenderer :value="page" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-container {
  padding: 2rem 0;
}

.project-page {
  width: 100%;
  background-color: #fff;
}

.project-header {
  text-align: left;
  margin-bottom: 2rem;
}

.project-header h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.project-header p {
  font-size: 1.1rem;
  color: #666;
}

.project-meta {
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  margin: 2rem 0;
  padding: 1.5rem 0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  flex-wrap: wrap;
}

.project-meta div {
  text-align: left;
}

.project-meta strong {
  display: block;
  color: #000;
  font-size: 0.75rem;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.project-gallery {
    margin-bottom: 2rem;
}

.project-content {
  margin-top: 2rem;
  line-height: 1.6;
}
</style>
