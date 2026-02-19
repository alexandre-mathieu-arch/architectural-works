<template>
  <NuxtLink :to="project.path">
    <UCard 
      class="h-full flex flex-col hover:ring-2 hover:ring-primary-500 transition-all duration-300 group relative overflow-hidden"
      :ui="{ body: { padding: 'p-0' }, header: { padding: 'p-0', base: 'relative overflow-hidden' }, footer: { padding: 'p-4' } }"
    >
      <template #header>
        <div class="relative w-full aspect-square">
          <!-- Image -->
          <NuxtImg
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <!-- Placeholder si pas d'image -->
          <div v-else class="absolute inset-0 w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
            <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-400" />
          </div>
          
          <!-- Titre affiché au survol -->
          <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
            <h3 class="text-[21px] font-bold text-black uppercase" style="font-family: var(--font-dm-sans);">{{ project.title }}</h3>
          </div>
        </div>
      </template>

      <div class="flex-1 px-4 py-3">
        <p class="text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 text-sm">{{ project.description }}</p>
      </div>

      <template v-if="project.tags?.length" #footer>
        <div class="flex flex-wrap gap-2">
          <UBadge v-for="tag in project.tags" :key="tag" variant="subtle" size="xs" class="capitalize">
            {{ tag }}
          </UBadge>
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  project: {
    path: string;
    title: string;
    description: string;
    image?: string;
    tags?: string[];
  };
}>();
</script>
