<template>
  <NuxtLink 
    :to="project.path" 
    class="block w-full"
    @mouseenter="setHoveredProject(project.title)"
    @mouseleave="setHoveredProject(null)"
  >
    <div class="relative w-full aspect-square overflow-hidden group">
      <!-- Image qui remplit toute la zone -->
      <NuxtImg
        v-if="displayImage"
        :src="displayImage"
        :alt="project.title"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        :style="{ viewTransitionName: 'image-' + project.path.replace(/\//g, '-') }"
      />
      <!-- Placeholder si pas d'image -->
      <div v-else class="absolute inset-0 w-full h-full bg-gray-100 flex items-center justify-center">
        <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-400" />
      </div>
      
      <!-- Infos affichées au survol -->
      <div class="absolute inset-0 bg-[#F4F4F0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-10 flex flex-col justify-center items-start text-left z-10">
        <h3 
          class="u-h3 mb-2 normal-case"
          :style="{ viewTransitionName: 'title-' + project.path.replace(/\//g, '-') }"
        >
          {{ project.title }}
        </h3>
        <p 
          class="text-[12px] font-light text-[#121212] tracking-[0.1em] mb-0.5"
          :style="{ viewTransitionName: 'year-' + project.path.replace(/\//g, '-') }"
        >
          {{ projectYear }}
        </p>
        <p 
          class="text-[12px] font-light text-[#121212] tracking-[0.1em]"
          :style="{ viewTransitionName: 'location-' + project.path.replace(/\//g, '-') }"
        >
          {{ formattedLocation }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { setHoveredProject } = useHoverProject();

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
