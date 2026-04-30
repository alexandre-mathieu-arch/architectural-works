<template>
  <div v-if="page" class="relative">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 pt-0">
      <!-- Carousel Section: Natural flow - shown first on mobile -->
      <div class="col-span-1 md:col-span-1 xl:col-span-3 z-10 order-1 md:order-2 -mx-[var(--main-padding)] md:mx-0">
        <div class="relative w-full aspect-[4/3] md:aspect-[16/9] glass-fluted bg-white/50 dark:bg-[#121212]/50 transition-colors duration-300">
          <ImageCarousel :images="images" :model-value="currentImageIndex" @update:model-value="setCurrentImageIndex" :id="page.path" />
        </div>
      </div>

      <!-- First column: Info / Description -->
      <div 
        class="col-span-1 pt-0 z-10 order-2 md:order-1" 
        style="view-transition-name: project-description;"
      >
        <div class="project-description min-h-0 md:min-h-[calc(100vh-var(--header-height)-120px)] flex flex-col pr-4">
          <div class="flex-grow pb-4 md:pb-6">
            <p v-if="page.description" class="u-body mb-4">{{ page.description }}</p>
            <div class="content-renderer">
              <ContentRenderer :value="page" class="prose max-w-none" />
            </div>
          </div>
          
          <!-- Static Info Section -->
          <div class="mt-8 border-t border-[#121212]/10 pt-4 pb-4">
            <div class="space-y-1">
              <div v-if="page.surface" class="flex gap-4 u-legend">
                <span class="w-20">Surface:</span>
                <span>{{ page.surface }}</span>
              </div>
              <div v-if="page.cout" class="flex gap-4 u-legend">
                <span class="w-20">Coût:</span>
                <span>{{ page.cout }}</span>
              </div>
              <div v-if="page.phase" class="flex gap-4 u-legend">
                <span class="w-20">Phase:</span>
                <span>{{ page.phase }}</span>
              </div>
              <div v-if="page.statut" class="flex gap-4 u-legend">
                <span class="w-20">Statut:</span>
                <span>{{ page.statut }}</span>
              </div>
              <div v-if="page.materiaux" class="flex gap-4 u-legend">
                <span class="w-20 text-nowrap">Matériaux:</span>
                <span>{{ Array.isArray(page.materiaux) ? page.materiaux.join(', ') : page.materiaux }}</span>
              </div>
              <div v-if="page.collaboration" class="flex gap-4 u-legend">
                <span class="w-20 text-nowrap">Collaboration:</span>
                <span>{{ page.collaboration }}</span>
              </div>
              <div v-if="page.logiciels" class="flex gap-4 u-legend">
                <span class="w-20 text-nowrap">Logiciels:</span>
                <span>{{ Array.isArray(page.logiciels) ? page.logiciels.join(', ') : page.logiciels }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageCarousel from '~/components/ImageCarousel.vue'
import { useProjectFilters } from '~/composables/useProjectFilters';
import { useCarouselState } from '~/composables/useCarouselState';

definePageMeta({
  layout: 'default',
  showFilters: true,
  readonlyFilters: true
})

const route = useRoute()
const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { setHoveredProject } = useHoverProject();
watchEffect(() => {
  if (page.value) {
    route.meta.dynamicTitle = page.value.title;
    setHoveredProject(page.value as any);
  }
});

onMounted(() => {
  if (page.value) {
    setHoveredProject(page.value as any);
  }
});

const { currentImageIndex, setCurrentImageIndex, setTotalImages } = useCarouselState();

const images = computed(() => {
  let imagePaths: string[] = [];
  if (page.value) {
    if (Array.isArray(page.value.images) && page.value.images.length > 0) {
      imagePaths = page.value.images;
    } else if (page.value.image) {
      imagePaths = Array.isArray(page.value.image) ? page.value.image : [page.value.image];
    }
  }
  // Normalize paths: ensure leading slash
  return imagePaths.map(p => p.startsWith('/') ? p : '/' + p);
})

// Sync images length with global state
watch(images, (newImages) => {
  setTotalImages(newImages.length);
}, { immediate: true });
</script>

<style scoped>
.project-description {
  text-align: left;
}
</style>
