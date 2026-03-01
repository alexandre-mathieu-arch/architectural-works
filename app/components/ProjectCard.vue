<template>
  <NuxtLink :to="project.path">
    <UCard 
      class="h-full flex flex-col transition-all duration-300 group relative"
      :ui="{ body: { padding: 'p-0' }, header: { padding: 'p-0', base: 'relative overflow-hidden' } }"
    >
      <template #header>
        <div class="relative w-full aspect-square flex items-center justify-center p-0.5">
          <!-- Conteneur de l'image avec son ratio spécifique -->
          <div :class="['relative transition-all duration-300 group-hover:scale-[1.01]', project.ratio === '4/3' ? 'w-full aspect-[4/3]' : 'h-full aspect-[3/4]']">
            <!-- Image qui disparait au survol -->
            <NuxtImg
              v-if="displayImage"
              :src="displayImage"
              :alt="project.title"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
            <!-- Placeholder si pas d'image -->
            <div v-else class="absolute inset-0 w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
              <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-400" />
            </div>
            
            <!-- Infos affichées au survol (uniquement sur la zone de l'image) -->
            <div class="absolute inset-0 bg-[rgb(248,248,248)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-center justify-center text-center">
              <h3 class="text-sm font-bold text-[#121212] uppercase tracking-wider">{{ project.title }}</h3>
            </div>
          </div>
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';

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
    date?: string | Date;
    ratio?: string;
  };
}>();

const displayImage = computed(() => {
  if (props.project.images && props.project.images.length > 0) {
    return props.project.images[0];
  }
  return props.project.image;
});
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>
