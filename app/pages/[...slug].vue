<script setup lang="ts">
import ImageCarousel from '~/components/ImageCarousel.vue'

definePageMeta({
  layout: false, // Remove global layout for immersive experience
})

const route = useRoute()
const router = useRouter()

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

const currentImageIndex = ref(0)
const showInfoDropdown = ref(false)

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

const goBack = () => {
  router.back()
}
</script>

<template>
  <div v-if="page" class="immersive-project-page">
    <!-- Main Immersive Background (Carousel) -->
    <div class="background-carousel">
      <ImageCarousel :images="images" v-model="currentImageIndex" />
    </div>

    <!-- UI Overlay -->
    <div class="ui-overlay">
      <!-- Top Bar: Back Button -->
      <div class="top-bar">
        <button @click="goBack" class="back-button pointer-events-auto">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          [retour]
        </button>
      </div>

      <!-- Left Sidebar: Project Info -->
      <div class="sidebar pointer-events-auto">
        <header class="project-info-header">
          <h1 class="project-title">{{ page.title }}</h1>
          <div class="project-location">
            <span v-if="page.lieu">{{ page.lieu }}&nbsp;</span>
            <span v-if="page.pays">{{ Array.isArray(page.pays) ? page.pays.join(' ') : page.pays }}</span>
          </div>
        </header>

        <!-- Numeric Navigation (Moved here) -->
        <div class="numeric-nav-sidebar mt-8" v-if="images.length > 1">
          <button 
            v-for="(img, index) in images" 
            :key="index"
            @click="currentImageIndex = index"
            class="nav-number"
            :class="{ active: currentImageIndex === index }"
          >
            {{ index + 1 }}
          </button>
        </div>

        <!-- Dropdown Details -->
        <div class="project-details-dropdown mt-4">
          <button @click="showInfoDropdown = !showInfoDropdown" class="info-toggle">
            [infos.]
            <svg 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              class="w-4 h-4 transition-transform duration-200"
              :class="{ 'rotate-180': showInfoDropdown }"
            >
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>

          <Transition name="expand">
            <div v-if="showInfoDropdown" class="info-content">
              <div v-if="page.surface" class="info-row">
                <span class="label">Surface:</span>
                <span class="value">{{ page.surface }}</span>
              </div>
              <div v-if="page.cout" class="info-row">
                <span class="label">Coût:</span>
                <span class="value">{{ page.cout }}</span>
              </div>
              <div v-if="page.phase" class="info-row">
                <span class="label">Phase:</span>
                <span class="value">{{ page.phase }}</span>
              </div>
              <div v-if="page.statut" class="info-row">
                <span class="label">Statut:</span>
                <span class="value">{{ page.statut }}</span>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Always visible description -->
        <div class="project-description mt-8">
          <p v-if="page.description">{{ page.description }}</p>
          <div class="content-renderer mt-4">
            <ContentRenderer :value="page" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.immersive-project-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
  color: white;
  cursor: auto !important;
}

/* Ensure UI elements use standard cursor */
.pointer-events-auto {
  cursor: auto !important;
}

.background-carousel {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.ui-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 100%);
  padding: 40px;
}

.top-bar {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 40px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer !important;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.back-button:hover {
  opacity: 1;
}

.sidebar {
  max-width: 400px;
}

.project-title {
  font-size: 48px;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 8px;
}

.project-location {
  font-size: 18px;
  opacity: 0.8;
  font-weight: 500;
}

.numeric-nav-sidebar {
  display: flex;
  gap: 1rem;
}

.nav-number {
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer !important;
  opacity: 0.5;
  transition: opacity 0.3s;
  padding: 0;
}

.nav-number.active {
  opacity: 1;
  text-decoration: underline;
}

.info-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer !important;
  padding: 0;
}

.info-content {
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 15px;
  border-left: 2px solid white;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
}

.info-row:last-child { margin-bottom: 0; }

.label { opacity: 0.6; }
.value { font-weight: bold; }

.project-description {
  font-size: 15px;
  line-height: 1.6;
  max-height: 40vh;
  overflow-y: auto;
  padding-right: 10px;
  scrollbar-width: thin;
  scrollbar-color: white transparent;
}

/* Custom scrollbar for description */
.project-description::-webkit-scrollbar {
  width: 2px;
}
.project-description::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.1);
}
.project-description::-webkit-scrollbar-thumb {
  background: white;
}

/* Transitions */
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
  overflow: hidden;
}
.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
