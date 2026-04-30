<template>
  <div class="pt-0 pb-0">

    <div v-if="filteredProjects?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 items-center mt-3">
      <template v-for="(project, index) in filteredProjects" :key="project.path">
        <!-- Cycle de 6 : 4 pleins, 1 normal, 1 vide, 1 normal, 1 vide -->
        
        <!-- Cas spécial pour le 6ème projet (index 5, 11, 17...) -->
        <template v-if="index % 6 === 5">
          <!-- Colonne 2 : Vide avec bordure cliquable -->
          <button 
            @click="scrollToContact"
            class="hidden xl:block aspect-square border border-[#121212]/30 relative group transition-colors duration-300 hover:border-[#121212] text-left"
          >
            <div class="absolute top-0 left-0 w-full px-2 h-[30px] flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="u-h3 dark:text-white doux:text-[#4A4443]">Démarrer un projet ?</span>
            </div>
          </button>
          
          <!-- Colonne 3 : Le projet -->
          <ProjectCard :project="project" />
          
          <!-- Colonne 4 : Vide avec bordure cliquable -->
          <button 
            @click="scrollToContact"
            class="hidden xl:block aspect-square border border-[#121212]/30 relative group transition-colors duration-300 hover:border-[#121212] text-left"
          >
            <div class="absolute top-0 left-0 w-full px-2 h-[30px] flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="u-h3 dark:text-white doux:text-[#4A4443]">Démarrer un projet ?</span>
            </div>
          </button>
        </template>

        <!-- Projets normaux (1, 2, 3, 4 et 5 du cycle) -->
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
        <a
          href="mailto:alexandre.mat+w@protonmail.com"
          class="u-h3 font-normal tracking-[0.2em] hover:text-gray-500 transition-colors w-fit"
        >
          alexandre.mat+w@protonmail.com
        </a>

        <a
          href="tel:+33658215300"
          class="u-h3 font-normal tracking-[0.2em] hover:text-gray-500 transition-colors w-fit"
        >
          +33 6 58 21 53 00
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
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

const route = useRoute();
const router = useRouter();

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/projects/%')
    .all()
);

const scrollToContact = () => {
  const el = document.getElementById('contact');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  if (route.query.scroll === 'contact') {
    // Small delay to ensure transitions and images are settling
    setTimeout(() => {
      scrollToContact();
      // Clean up the URL
      router.replace({ query: { ...route.query, scroll: undefined } });
    }, 500);
  }
});

// Populate filter options from project data
watchEffect(() => {
  if (projects.value) {
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

  // Always sort: Default to Date (latest first)
  if (sortBy.value === 'Nom') {
      result.sort((a, b) => a.title.localeCompare(b.title));
  } else {
      // Default and 'Date' sorting
      result.sort((a, b) => {
        const dateA = new Date(a.date || 0).getTime();
        const dateB = new Date(b.date || 0).getTime();
        return dateB - dateA;
      });
  }

  return result;
});
</script>
