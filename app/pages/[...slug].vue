<script setup lang="ts">
import ImageCarousel from '~/components/ImageCarousel.vue'

const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// Handle both single image and multiple images
const images = computed(() => {
  if (page.value) {
    if (Array.isArray(page.value.images)) {
      return page.value.images
    }
    if (page.value.image) {
      return [page.value.image]
    }
  }
  return []
})
</script>

<template>
  <div v-if="page">
    <div class="project-page">
      <header class="project-header">
        <h1>{{ page.title }}</h1>
        <p v-if="page.description">{{ page.description }}</p>
      </header>

      <div class="project-gallery">
        <ImageCarousel :images="images" />
      </div>

      <div class="project-meta">
        <div><strong>Date:</strong> {{ new Date(page.date).toLocaleDateString() }}</div>
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
.project-page {
  max-width: 960px;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #fff;
}

.project-header {
  text-align: center;
  margin-bottom: 3rem;
}

.project-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.project-header p {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.project-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  padding: 2rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
}

.project-meta div {
  text-align: center;
}

.project-meta strong {
  display: block;
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.project-gallery {
    margin-bottom: 2rem;
}

.project-content {
  margin-top: 3rem;
  line-height: 1.7;
  color: #333;
}
</style>
