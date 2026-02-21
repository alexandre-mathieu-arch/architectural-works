<template>
  <NuxtLink :to="project.path">
    <UCard 
      class="h-full flex flex-col transition-all duration-300 group relative"
      :ui="{ body: { padding: 'p-0' }, header: { padding: 'p-0', base: 'relative overflow-hidden' } }"
    >
      <template #header>
        <div class="relative w-full aspect-[2/3]">
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
          
          <!-- Infos affichées au survol -->
          <div class="absolute inset-0 bg-[rgb(248,248,248)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-0 flex flex-col justify-start">
            <!-- Titre en haut à gauche sans marge -->
            <h3 class="text-[21px] font-bold text-black m-0 p-0 leading-none" style="font-family: var(--font-dm-sans);">{{ project.title }}</h3>
            
            <div class="flex flex-col items-start gap-2 w-full mt-2">
              <!-- Typologies -->
              <span v-for="t in project.typologies" :key="t" class="text-[10px] border border-black px-2 py-0.5 font-bold ml-0">
                {{ t }}
              </span>

              <!-- Année -->
              <span v-if="project.date" class="text-[10px] border border-black px-2 py-0.5 font-bold">
                {{ new Date(project.date).getFullYear() }}
              </span>

              <!-- Tailles -->
              <span v-for="s in project.tailles" :key="s" class="text-[10px] border border-black px-2 py-0.5 font-bold">
                {{ s }}
              </span>

              <!-- Pays -->
              <span v-for="c in project.pays" :key="c" class="text-[10px] border border-black px-2 py-0.5 font-bold">
                {{ c }}
              </span>
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
