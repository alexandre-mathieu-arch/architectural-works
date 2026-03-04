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
  <div v-if="page" class="flex h-screen bg-[rgb(248,248,248)] text-black">
    <!-- Sidebar Section -->
    <div class="w-3/12 h-screen flex flex-col pt-4 px-8 pb-8 overflow-y-auto">
      <!-- Back Button -->
      <div class="flex-shrink-0 mb-8">
        <button @click="goBack" class="back-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" class="w-4 h-4"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          [retour]
        </button>

        <!-- Numeric Navigation -->
        <div class="numeric-nav-sidebar mt-4" v-if="images.length > 1">
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
      </div>

      <!-- Scrollable Content -->
      <div class="flex-grow overflow-y-auto pr-4">
        <header class="project-info-header">
          <h2 
            class="u-h2 font-extrabold mb-2"
            :style="{ viewTransitionName: 'title-' + page.path.replace(/\//g, '-') }"
          >
            {{ page.title }}
          </h2>
          <div 
            class="project-location u-h2"
            :style="{ viewTransitionName: 'location-' + page.path.replace(/\//g, '-') }"
          >
            <span v-if="page.lieu">{{ page.lieu }}</span>
            <span v-if="page.lieu && page.pays">, </span>
            <span v-if="page.pays">{{ Array.isArray(page.pays) ? page.pays.join(', ') : page.pays }}</span>
          </div>
          <div 
            class="project-year" 
            v-if="page.date"
            :style="{ viewTransitionName: 'year-' + page.path.replace(/\//g, '-') }"
          >
            {{ new Date(page.date).getFullYear() }}
          </div>
        </header>

        <!-- Always visible description -->
        <div class="project-description mt-8">
          <p v-if="page.description">{{ page.description }}</p>
          <div class="content-renderer mt-4">
            <ContentRenderer :value="page" />
          </div>
        </div>

        <!-- Static Info Section directly below description -->
        <div class="mt-8">
          <div class="info-toggle mb-2">
            Infos.
          </div>
          <div class="info-content">
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
        </div>
      </div>
    </div>
    
    <!-- Carousel Section -->
    <div class="w-9/12 h-screen relative p-4">
      <ImageCarousel :images="images" v-model="currentImageIndex" :id="page.path" />
    </div>
  </div>
</template>

<style scoped>
.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #000000;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  transition: opacity 0.3s;
  padding: 0;
}

.project-title {
  font-size: 25px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
  color: #000000;
}

.project-location {
  font-size: 25px;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: #000000;
}

.project-year {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: #000000;
  margin-top: 4px;
}

.numeric-nav-sidebar {
  display: flex;
  gap: 1rem;
}

.nav-number {
  background: none;
  border: none;
  color: #000000;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  transition: opacity 0.3s;
  padding: 0;
}

.nav-number.active {
  font-weight: 700;
  opacity: 1;
}

.nav-number:not(.active) {
  opacity: 0.3;
}

.info-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #000000;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
}

.info-content {
  margin-top: 8px;
  padding: 0;
  background: white;
}

.info-row {
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 4px;
  font-size: 12px;
  color: #000000;
}
.info-row:last-child { margin-bottom: 0; }

.label { font-weight: normal; min-width: 60px; }
.value { font-weight: normal; }

.project-description {
  font-size: 16px;
  line-height: 1.1;
  color: #000000;
  text-align: left;
}

.project-description :deep(p) {
  margin-bottom: 1em;
  line-height: 1.1;
}

/* Custom scrollbar for sidebar */
.w-3\/12::-webkit-scrollbar {
  width: 2px;
}
.w-3\/12::-webkit-scrollbar-track {
  background: white;
}
.w-3\/12::-webkit-scrollbar-thumb {
  background: black;
}
</style>
