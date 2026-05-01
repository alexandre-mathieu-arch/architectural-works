<template>
  <div v-if="project" class="w-full relative bg-white dark:bg-[#121212]">
    <div class="main-container" :class="isHero ? 'pt-32 pb-24' : 'pt-0 pb-12'">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <!-- Carousel Section -->
        <div class="col-span-1 md:col-span-1 xl:col-span-3 z-0 order-1 md:order-2" :class="isHero ? '' : '-mx-[var(--main-padding)] md:mx-0'">
          <div 
            class="relative w-full aspect-[4/3] md:aspect-[16/9] bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
          >
            <ImageCarousel :images="images" :model-value="currentImageIndex" @update:model-value="setCurrentImageIndex" :id="project.path" />
          </div>
        </div>

        <!-- Info / Description -->
        <div class="col-span-1 pt-0 z-0 order-2 md:order-1" :style="!isHero ? 'view-transition-name: project-description;' : ''">
          <div class="project-description flex flex-col pr-4" :class="!isHero ? 'min-h-0 md:min-h-[calc(100vh-var(--header-height)-120px)]' : ''">
            <div class="flex-grow pb-4 md:pb-6">
              <h2 v-if="project.date" class="u-h2 mb-2 opacity-50">{{ project.date }}</h2>
              <h1 class="u-h1 mb-6">{{ project.title }}</h1>
              <p v-if="project.description" class="u-body mb-4">{{ project.description }}</p>
              <div class="content-renderer">
                <ContentRenderer :value="project" class="prose max-w-none" />
              </div>
            </div>

            <!-- Metadata -->
            <div class="mt-8 border-t border-[#121212]/10 dark:border-white/10 pt-4">
               <div class="space-y-1">
                <div v-if="project.surface" class="flex gap-4 u-legend">
                  <span class="w-20 opacity-50">Surface:</span>
                  <span>{{ project.surface }}</span>
                </div>
                <div v-if="project.lieu" class="flex gap-4 u-legend">
                  <span class="w-20 opacity-50">Lieu:</span>
                  <span>{{ project.lieu }}</span>
                </div>
                <div v-if="project.statut" class="flex gap-4 u-legend">
                  <span class="w-20 opacity-50">Statut:</span>
                  <span>{{ project.statut }}</span>
                </div>
                <!-- Additional fields -->
                <div v-if="project.cout" class="flex gap-4 u-legend">
                  <span class="w-20 opacity-50 text-nowrap">Coût:</span>
                  <span>{{ project.cout }}</span>
                </div>
                <div v-if="project.phase" class="flex gap-4 u-legend">
                  <span class="w-20 opacity-50 text-nowrap">Phase:</span>
                  <span>{{ project.phase }}</span>
                </div>
                <div v-if="project.materiaux" class="flex gap-4 u-legend">
                  <span class="w-20 opacity-50 text-nowrap">Matériaux:</span>
                  <span>{{ Array.isArray(project.materiaux) ? project.materiaux.join(', ') : project.materiaux }}</span>
                </div>
                <div v-if="project.collaboration" class="flex gap-4 u-legend">
                  <span class="w-20 opacity-50 text-nowrap">Collaboration:</span>
                  <span>{{ project.collaboration }}</span>
                </div>
                <div v-if="project.logiciels" class="flex gap-4 u-legend">
                  <span class="w-20 opacity-50 text-nowrap">Logiciels:</span>
                  <span>{{ Array.isArray(project.logiciels) ? project.logiciels.join(', ') : project.logiciels }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Vertical Details Section (New) -->
      <div v-if="detailImages.length > 0" class="col-span-1 md:col-span-2 xl:col-span-4 mt-12">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <!-- We place details under the carousel (columns 2-4 on XL) -->
          <div class="col-span-1 md:col-span-1 xl:col-span-3 xl:col-start-2">
            <div v-for="detail in detailImages" :key="detail" class="mb-12">
              <NuxtImg 
                :src="detail" 
                format="webp" 
                width="1600"
                class="w-full h-auto border border-[#121212]/10 dark:border-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, watchEffect, onMounted } from 'vue';
import { useCarouselState } from '~/composables/useCarouselState';
import { useHoverProject } from '~/composables/useHoverProject';

const props = defineProps<{
  project: any;
  isHero?: boolean;
}>();

const { currentImageIndex, setCurrentImageIndex, setTotalImages } = useCarouselState();
const { setHoveredProject } = useHoverProject();

watchEffect(() => {
  if (props.project) {
    setHoveredProject(props.project);
  }
});

onMounted(() => {
  if (props.project) {
    setHoveredProject(props.project);
  }
});

const images = computed(() => {
  if (!props.project) return [];
  const imgs = props.project.images || props.project.image || [];
  const imageList = Array.isArray(imgs) ? imgs : [imgs];
  return imageList
    .filter(p => typeof p === 'string' && p.length > 0)
    .map(p => p.startsWith('/') ? p : '/' + p);
});

const detailImages = computed(() => {
  if (!props.project || !props.project.details) return [];
  const details = Array.isArray(props.project.details) ? props.project.details : [props.project.details];
  return details
    .filter(p => typeof p === 'string' && p.length > 0)
    .map(p => p.startsWith('/') ? p : '/' + p);
});

watch(images, (newImages) => {
  setTotalImages(newImages.length);
}, { immediate: true });
</script>

<style scoped>
.project-description {
  text-align: left;
}
</style>
