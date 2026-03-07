<template>
  <div v-if="page" class="h-[calc(100vh-var(--header-height))] overflow-hidden relative">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 h-full">
      <!-- First column: Info / Description (Scrollable internally) -->
      <div class="col-span-1 h-full overflow-y-auto scrollbar-hide pt-[45px]" style="view-transition-name: project-description;">
        <div class="project-description pb-24">
          <p v-if="page.description" class="u-body mb-8">{{ page.description }}</p>
          <div class="content-renderer">
            <ContentRenderer :value="page" class="prose max-w-none" />
          </div>
          
          <!-- Static Info Section -->
          <div class="mt-8 border-t border-[#121212]/10 pt-4">
            <div class="u-h4 mb-4 uppercase tracking-widest">Détails</div>
            <div class="space-y-2">
              <div v-if="page.surface" class="flex gap-4 u-legend uppercase">
                <span class="w-20 opacity-50">Surface:</span>
                <span>{{ page.surface }}</span>
              </div>
              <div v-if="page.cout" class="flex gap-4 u-legend uppercase">
                <span class="w-20 opacity-50">Coût:</span>
                <span>{{ page.cout }}</span>
              </div>
              <div v-if="page.phase" class="flex gap-4 u-legend uppercase">
                <span class="w-20 opacity-50">Phase:</span>
                <span>{{ page.phase }}</span>
              </div>
              <div v-if="page.statut" class="flex gap-4 u-legend uppercase">
                <span class="w-20 opacity-50">Statut:</span>
                <span>{{ page.statut }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Carousel Section: Absolute positioned inside the relative grid container -->
      <div class="hidden md:block md:col-span-1 xl:col-span-3 h-full relative z-40">
        <div class="absolute inset-0 top-[45px] mb-24 bg-white">
          <ImageCarousel :images="images" v-model="currentImageIndex" :id="page.path" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageCarousel from '~/components/ImageCarousel.vue'
import { useProjectFilters } from '~/composables/useProjectFilters';

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

watchEffect(() => {
  if (page.value) {
    route.meta.dynamicTitle = page.value.title;
  }
});

const { setHoveredProject } = useHoverProject();
onMounted(() => {
  if (page.value) {
    setHoveredProject(page.value);
  }
});
onUnmounted(() => {
  setHoveredProject(null);
});

const currentImageIndex = ref(0)

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

<style scoped>
.project-description {
  text-align: left;
}
</style>
