<template>
  <div class="pt-8 pb-12">

    <div v-if="filteredProjects?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard v-for="project in filteredProjects" :key="project.path" :project="project" />
    </div>
    <div v-else class="text-center py-20">
      <p class="text-gray-500">Aucun projet ne correspond à votre sélection.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectCard from '~/components/ProjectCard.vue';
import { useProjectFilters } from '~/composables/useProjectFilters';

definePageMeta({
  layout: 'default',
  title: 'Projets', // Title for the PageTitle component
  showFilters: true
});

const { 
  selectedTypology, 
  selectedSize, 
  selectedYear, 
  selectedCountry, 
  sortBy,
  typologyOptions,
  sizeOptions,
  yearOptions,
  countryOptions
} = useProjectFilters();

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/projects/%')
    .all()
);

// Populate filter options from project data
if (projects.value) {
  const typologies = new Set<string>();
  const sizes = new Set<string>();
  const years = new Set<string>();
  const countries = new Set<string>();

  projects.value.forEach(p => {
    if (p.typologies) p.typologies.forEach(t => typologies.add(t));
    if (p.tailles) p.tailles.forEach(s => sizes.add(s));
    if (p.pays) p.pays.forEach(c => countries.add(c));
    if (p.date) {
      const year = new Date(p.date).getFullYear().toString();
      years.add(year);
    }
  });

  typologyOptions.value = Array.from(typologies).sort();
  sizeOptions.value = Array.from(sizes).sort();
  yearOptions.value = Array.from(years).sort((a, b) => b.localeCompare(a)); // Descending years
  countryOptions.value = Array.from(countries).sort();
}

const filteredProjects = computed(() => {
  if (!projects.value) return [];
  
  let result = projects.value.filter(p => {
    const matchTypology = !selectedTypology.value || (p.typologies && p.typologies.includes(selectedTypology.value));
    const matchSize = !selectedSize.value || (p.tailles && p.tailles.includes(selectedSize.value));
    const matchCountry = !selectedCountry.value || (p.pays && p.pays.includes(selectedCountry.value));
    const matchYear = !selectedYear.value || (p.date && new Date(p.date).getFullYear().toString() === selectedYear.value);
    
    return matchTypology && matchSize && matchCountry && matchYear;
  });

  // Simple sorting by date (latest first) or title
  if (sortBy.value === 'Date') {
      result.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
  } else if (sortBy.value === 'Nom') {
      result.sort((a, b) => a.title.localeCompare(b.title));
  }

  return result;
});
</script>
