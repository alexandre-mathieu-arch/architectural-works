<template>
  <div class="pb-4 bg-transparent">
    <h1 class="text-4xl md:text-6xl lg:text-[86px] font-bold uppercase leading-none" style="font-family: var(--font-dm-sans);">
      {{ title }}
    </h1>
    <div v-if="showFilters && title?.toUpperCase() === 'PROJETS'" class="flex flex-wrap gap-4 mt-4">
      <UDropdown :items="[['Typologie 1', 'Typologie 2']]">
        <UButton class="font-bold text-[12px] uppercase" style="font-family: var(--font-dm-sans);" color="gray" variant="ghost" label="Typologie" trailing-icon="i-heroicons-chevron-down-20-solid" />
      </UDropdown>
      <UDropdown :items="[['Taille 1', 'Taille 2']]">
        <UButton class="font-bold text-[12px] uppercase" style="font-family: var(--font-dm-sans);" color="gray" variant="ghost" label="Taille" trailing-icon="i-heroicons-chevron-down-20-solid" />
      </UDropdown>
      <UDropdown :items="[['Année 1', 'Année 2']]">
        <UButton class="font-bold text-[12px] uppercase" style="font-family: var(--font-dm-sans);" color="gray" variant="ghost" label="Année" trailing-icon="i-heroicons-chevron-down-20-solid" />
      </UDropdown>
      <UDropdown :items="[['Nom 1', 'Nom 2']]">
        <UButton class="font-bold text-[12px] uppercase" style="font-family: var(--font-dm-sans);" color="gray" variant="ghost" label="Nom" trailing-icon="i-heroicons-chevron-down-20-solid" />
      </UDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, watch } from 'vue';

const props = defineProps<{
  title: string;
  showFilters?: boolean;
}>();

watch(() => props.title, (newTitle) => {
  console.log('PageTitle received title:', newTitle);
});
</script>
