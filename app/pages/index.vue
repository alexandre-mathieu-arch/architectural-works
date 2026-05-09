<template>
  <div>
    <!-- Hero Section -->
    <div class="-mt-[var(--header-height)]">
      <HeroSection :scroll-progress="scrollProgress" />
    </div>

    <!-- Project Grid (from architecture.vue) -->
    <div class="pt-0 pb-0 min-h-screen">
      <div 
        v-if="filteredProjects?.length" 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 items-center mt-3"
        style="view-transition-name: projects-grid;"
      >
        <template v-for="(project, index) in filteredProjects" :key="project.path">
          <template v-if="index % 6 === 5">
            <button 
              @click="scrollToContact"
              class="hidden xl:block aspect-square border border-[#121212]/30 relative group transition-colors duration-700 hover:border-[#121212] text-left"
            >
              <div class="absolute top-0 left-0 w-full px-2 h-[30px] flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span class="u-h3 dark:text-white doux:text-[#4A4443]">Démarrer un projet ?</span>
              </div>
            </button>
            <ProjectCard :project="project" />
            <button 
              @click="scrollToContact"
              class="hidden xl:block aspect-square border border-[#121212]/30 relative group transition-colors duration-700 hover:border-[#121212] text-left"
            >
              <div class="absolute top-0 left-0 w-full px-2 h-[30px] flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span class="u-h3 dark:text-white doux:text-[#4A4443]">Démarrer un projet ?</span>
              </div>
            </button>
          </template>
          <ProjectCard 
            v-else 
            :project="project" 
          />
        </template>
      </div>
      <div v-else class="text-center py-10">
        <p class="text-gray-500">Aucun projet ne correspond à votre sélection.</p>
      </div>

      <!-- Contact Section -->
      <div id="contact" class="mt-32 pb-24 border-t border-[#121212]/10 pt-16 scroll-mt-20">
        <div class="mb-10">
          <p class="u-h2 max-w-2xl leading-tight font-light !tracking-[0.15em]">
            Définir un programme, donner forme à une vision, bâtir un futur, engageons le dialogue.
          </p>
        </div>
        <div class="flex flex-col gap-y-6">
          <a href="mailto:alexandre.mat+w@protonmail.com" class="u-h3 font-normal tracking-[0.2em] hover:text-gray-500 transition-colors w-fit">
            alexandre.mat+w@protonmail.com
          </a>
          <a href="tel:+33658215300" class="u-h3 font-normal tracking-[0.2em] hover:text-gray-500 transition-colors w-fit">
            +33 6 58 21 53 00
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, onUnmounted } from 'vue';
import ProjectCard from '~/components/ProjectCard.vue';
import HeroSection from '~/components/HeroSection.vue';
import { useProjectFilters } from '~/composables/useProjectFilters';

definePageMeta({
  layout: 'default',
  displayTitle: 'Architecture',
  showFilters: true,
  transparentHeader: true
})

useHead({
  title: 'Alexandre Mathieu — architecture & design'
})

const scrollProgress = ref(0);

const handleScroll = () => {
  if (import.meta.client) {
    scrollProgress.value = Math.min(1, window.scrollY / window.innerHeight);
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
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

const { data: projects } = await useAsyncData('home-projects', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/projects/%')
    .where('typologies', 'NOT LIKE', '%Design%')
    .all()
);

const scrollToContact = () => {
  const el = document.getElementById('contact');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

watchEffect(() => {
  if (projects.value) {
    const typologies = new Set<string>();
    const years = new Set<string>();
    const countries = new Set<string>();
    projects.value.forEach(p => {
      if (Array.isArray(p.typologies)) p.typologies.forEach(t => t && typologies.add(t));
      if (Array.isArray(p.pays)) p.pays.forEach(c => c && countries.add(c));
      if (p.date) {
        const year = new Date(p.date).getFullYear().toString();
        if (year !== 'NaN') years.add(year);
      }
    });
    typologyOptions.value = Array.from(typologies).sort();
    yearOptions.value = Array.from(years).sort((a, b) => b.localeCompare(a));
    countryOptions.value = Array.from(countries).sort();
  }
});

const filteredProjects = computed(() => {
  if (!projects.value) return [];
  let result = projects.value.filter(p => {
    const matchTypology = !selectedTypology.value || (p.typologies && p.typologies.includes(selectedTypology.value));
    const matchCountry = !selectedCountry.value || (p.pays && p.pays.includes(selectedCountry.value));
    const matchYear = !selectedYear.value || (p.date && new Date(p.date).getFullYear().toString() === selectedYear.value);
    return matchTypology && matchCountry && matchYear;
  });
  result.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
  return result;
});
</script>
