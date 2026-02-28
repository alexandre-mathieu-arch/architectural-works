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
  <div v-if="page" class="flex h-screen bg-white text-black">
    <!-- Sidebar Section -->
    <div class="w-3/12 h-screen flex flex-col p-8 overflow-y-auto">
      <!-- Back Button -->
      <div class="flex-shrink-0 mb-8">
        <button @click="goBack" class="back-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" class="w-5 h-5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          [retour]
        </button>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-grow overflow-y-auto pr-4">
        <header class="project-info-header">
          <h1 class="project-title">{{ page.title }}</h1>
          <div class="project-location">
            <span v-if="page.lieu">{{ page.lieu }}&nbsp;</span>
            <span v-if="page.pays">{{ Array.isArray(page.pays) ? page.pays.join(' ') : page.pays }}</span>
          </div>
        </header>

        <!-- Numeric Navigation -->
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
    
    <!-- Carousel Section -->
    <div class="w-9/12 h-screen relative p-4">
      <ImageCarousel :images="images" v-model="currentImageIndex" />
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles are largely the same, but simplified as we removed the overlay */
.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: black;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.back-button:hover {
  opacity: 1;
}

.project-title {
  font-size: 22px; /* Adjusted for smaller column */
  text-transform: uppercase;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 8px;
  color: black; /* Explicitly set for clarity */
}

.project-location {
  font-size: 16px;
  opacity: 0.8;
  font-weight: 500;
  color: black; /* Explicitly set for clarity */
}

.numeric-nav-sidebar {
  display: flex;
  gap: 1rem;
}

.nav-number {
  background: none;
  border: none;
  color: black;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
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
  color: black;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
}

.info-content {
  margin-top: 16px;
  padding: 15px;
  border-left: 2px solid black; /* Changed border color */
  background: rgba(0, 0, 0, 0.05); /* Light background for content */
  backdrop-filter: blur(5px);
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
  color: black; /* Explicitly set for clarity */
}
.info-row:last-child { margin-bottom: 0; }

.label { opacity: 0.6; }
.value { font-weight: bold; }

.project-description {
  font-size: 15px;
  line-height: 1.6;
  color: black; /* Explicitly set for clarity */
}

/* Custom scrollbar for sidebar */
.w-3\/12::-webkit-scrollbar {
  width: 4px;
}
.w-3\/12::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1); /* Darker track for light background */
}
.w-3\/12::-webkit-scrollbar-thumb {
  background: black; /* Darker thumb for light background */
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
