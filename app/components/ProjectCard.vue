<template>
  <NuxtLink 
    :to="project.path" 
    class="block w-full group"
    @mouseenter="setHoveredProject(project)"
    @mouseleave="setHoveredProject(null)"
    @click="addVisited(project.path)"
  >
    <div class="relative w-full aspect-square overflow-hidden">
      <!-- Image qui remplit toute la zone -->
      <NuxtImg
        v-if="displayImage"
        :src="displayImage"
        :alt="project.title"
        class="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        :class="[
          isVisited(project.path) 
            ? 'grayscale group-hover:grayscale-0' 
            : 'grayscale-0'
        ]"
        :style="{ viewTransitionName: 'image-' + project.path.replace(/\//g, '-') }"
      />
      <!-- Placeholder si pas d'image -->
      <div v-else class="absolute inset-0 w-full h-full bg-gray-100 flex items-center justify-center">
        <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-400" />
      </div>
      
      <!-- Infos affichées au survol -->
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
        <div class="absolute top-0 left-0 w-full border border-[#121212]/30 dark:border-white/20 px-2 h-[30px] flex items-center gap-3 bg-white dark:bg-[#121212] overflow-hidden">
          <h3 
            class="u-h3 normal-case dark:text-white whitespace-nowrap"
            :style="{ viewTransitionName: 'title-' + project.path.replace(/\//g, '-') }"
          >
            {{ project.title }}
          </h3>
          <p 
            class="text-[12px] font-light text-[#121212] dark:text-gray-300 tracking-[0.1em] whitespace-nowrap"
            :style="{ viewTransitionName: 'year-' + project.path.replace(/\//g, '-') }"
          >
            {{ projectYear }}
          </p>
          <p 
            class="text-[12px] font-light text-[#121212] dark:text-gray-400 tracking-[0.1em] whitespace-nowrap overflow-hidden text-ellipsis"
            :style="{ viewTransitionName: 'location-' + project.path.replace(/\//g, '-') }"
          >
            {{ formattedLocation }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVisitedProjects } from '~/composables/useVisitedProjects';

const { setHoveredProject } = useHoverProject();
const { addVisited, isVisited } = useVisitedProjects();

const props = defineProps<{
  project: {
    path: string;
    title: string;
    description: string;
    image?: string;
    images?: string[];
    tags?: string[];
    typologies?: string[];
    tailles?: string[];
    pays?: string[];
    lieu?: string;
    region?: string;
    date?: string | number | Date;
    ratio?: string;
  };
}>();

const displayImage = computed(() => {
  if (props.project.images && props.project.images.length > 0) {
    return props.project.images[0];
  }
  return props.project.image;
});

const formattedLocation = computed(() => {
  const parts = [];
  if (props.project.lieu) parts.push(props.project.lieu);
  if (props.project.region) parts.push(props.project.region);
  if (props.project.pays && props.project.pays.length > 0) {
    parts.push(props.project.pays.join(', '));
  }
  return parts.join(', ');
});

const projectYear = computed(() => {
  const d = props.project.date;
  if (!d) return '';
  
  if (typeof d === 'number' || (typeof d === 'string' && /^\d{4}$/.test(d))) {
    return d.toString();
  }
  
  const dateObj = new Date(d);
  if (isNaN(dateObj.getTime())) return d.toString();
  return dateObj.getFullYear().toString();
});
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>
