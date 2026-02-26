<template>
  <div class="pt-24 pb-12">

    <div v-if="filteredProjects?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
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
  selectedProjectTitle,
  sortBy,
  typologyOptions,
  sizeOptions,
  yearOptions,
  countryOptions,
  projectTitleOptions
} = useProjectFilters();

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/projects/%')
    .all()
);

// Populate filter options from project data
watchEffect(() => {
  if (projects.value) {
    console.log('Extracting filters from', projects.value.length, 'projects');
    const typologies = new Set<string>();
    const sizes = new Set<string>();
    const years = new Set<string>();
    const countries = new Set<string>();
    const titles = new Set<string>();

    projects.value.forEach(p => {
      if (p.title) titles.add(p.title);
      if (Array.isArray(p.typologies)) {
        p.typologies.forEach(t => { if (t) typologies.add(t) });
      }
      if (Array.isArray(p.tailles)) {
        p.tailles.forEach(s => { if (s) sizes.add(s) });
      }
      if (Array.isArray(p.pays)) {
        p.pays.forEach(c => { if (c) countries.add(c) });
      }
      if (p.date) {
        try {
          const year = new Date(p.date).getFullYear().toString();
          if (year !== 'NaN') years.add(year);
        } catch (e) {
          console.error('Invalid date for project:', p.title);
        }
      }
    });

    typologyOptions.value = Array.from(typologies).sort();
    sizeOptions.value = Array.from(sizes).sort();
    yearOptions.value = Array.from(years).sort((a, b) => b.localeCompare(a));
    countryOptions.value = Array.from(countries).sort();
    projectTitleOptions.value = Array.from(titles).sort();
  }
});

const filteredProjects = computed(() => {
  if (!projects.value) return [];
  
  let result = projects.value.filter(p => {
    const matchTypology = !selectedTypology.value || (p.typologies && p.typologies.includes(selectedTypology.value));
    const matchSize = !selectedSize.value || (p.tailles && p.tailles.includes(selectedSize.value));
    const matchCountry = !selectedCountry.value || (p.pays && p.pays.includes(selectedCountry.value));
    const matchYear = !selectedYear.value || (p.date && new Date(p.date).getFullYear().toString() === selectedYear.value);
    const matchTitle = !selectedProjectTitle.value || p.title === selectedProjectTitle.value;
    
    return matchTypology && matchSize && matchCountry && matchYear && matchTitle;
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
