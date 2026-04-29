<template>
  <div 
    class="relative z-40"
    :class="[
      isProjectPage ? 'pb-[18px]' : 'pb-8',
      { 'sticky top-[var(--header-height)] bg-white dark:bg-[#121212] transition-colors duration-300 -mx-[var(--main-padding)] px-[var(--main-padding)]': (showFilters || $slots.triggers) && !noSticky }
    ]"
  >
    <!-- Project Title Slot: Permanent height to avoid folding effect -->
    <div class="h-[40px] relative flex items-center"> 
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in absolute top-0 left-0"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div 
          v-if="hoveredProjectTitle || (hideMainTitle && title)" 
          :key="hoveredProjectTitle || (typeof title === 'string' ? title : '')"
          class="text-[18px] sm:text-[20px] font-bold leading-none text-[#121212] dark:text-white whitespace-nowrap overflow-hidden text-ellipsis w-full md:w-[calc((100%-32px)/2)] xl:w-[calc((100%-96px)/4)] h-full flex items-center"
          :style="{ viewTransitionName: route.path.startsWith('/projects/') ? 'title-' + route.path.replace(/\//g, '-') : 'project-title-continuity' }"
        >
          {{ hoveredProjectTitle || (hideMainTitle ? (typeof title === 'string' ? title : '') : '') }}
        </div>
      </Transition>
    </div>
    
    <div v-if="showFilters || $slots.triggers" class="mt-0 relative" ref="filterContainer">
      <!-- Custom triggers slot -->
      <slot name="triggers">
        <!-- Grid aligned triggers -->
        <div 
          class="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 items-start"
          style="view-transition-name: page-triggers;"
        >
          <!-- Standard Filters (Grid) or Project Info (Detail) -->
          <template v-if="showFilters">
            <div 
              v-for="filter in filters" 
              :key="filter.id"
              class="relative"
            >
              <button 
                @click="!readonlyFilters ? toggleMenu(filter.id) : null"
                class="flex items-center justify-between gap-2 u-h4 transition-all duration-300 px-3 h-[30px] border border-[#121212]/30 dark:border-white/20 -mt-[1px] bg-transparent w-full group"
                :class="[
                  activeMenu === filter.id ? 'text-indigo-500 border-indigo-500 z-50' : 'text-[#121212] dark:text-white',
                  filter.active ? '!text-indigo-500 !border-indigo-500 z-50' : '',
                  readonlyFilters ? 'cursor-default pointer-events-none' : 'hover:border-indigo-500 hover:text-indigo-500 dark:hover:border-indigo-400 dark:hover:text-indigo-400'
                ]"
              >
                <div class="flex items-center gap-2 truncate">
                  <span class="opacity-40 font-light hidden sm:inline">{{ filter.category }}:</span>
                  <span class="truncate">{{ filter.selection }}</span>
                </div>
                
                <template v-if="!readonlyFilters">
                  <svg 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    class="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                    :class="{ 'rotate-180': activeMenu === filter.id }"
                  >
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </template>
              </button>

              <!-- Local Dropdown Menu (Horizontal Ribbon) -->
              <Transition
                mode="out-in"
                enter-active-class="transition duration-500 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-300 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div 
                  v-if="activeMenu === filter.id" 
                  class="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-[#121212] doux:bg-[#E5E1E0] border border-[#121212]/10 dark:border-white/10 p-2 shadow-xl min-w-max"
                  :class="{ 'right-0 left-auto': filter.id === 'country' && !isProjectPage }"
                >
                  <div class="flex flex-row gap-x-6 px-2">
                    <template v-if="activeMenu === 'typology'">
                      <button 
                        @click="selectedTypology = null; activeMenu = null" 
                        class="u-h4 h-[30px] flex items-center transition-all duration-300 bg-transparent whitespace-nowrap" 
                        :class="selectedTypology === null ? 'text-indigo-500 font-bold' : 'text-[#121212]/60 dark:text-white/60 hover:text-indigo-500 dark:hover:text-indigo-400'"
                      >
                        Toutes
                      </button>
                      <button 
                        v-for="opt in typologyOptions" 
                        :key="opt" 
                        @click="selectedTypology = opt; activeMenu = null" 
                        class="u-h4 h-[30px] flex items-center transition-all duration-300 bg-transparent whitespace-nowrap" 
                        :class="selectedTypology === opt ? 'text-indigo-500 font-bold' : 'text-[#121212]/60 dark:text-white/60 hover:text-indigo-500 dark:hover:text-indigo-400'"
                      >
                        {{ opt }}
                      </button>
                    </template>
                    <template v-if="activeMenu === 'year'">
                      <button 
                        @click="selectedYear = null; activeMenu = null" 
                        class="u-h4 h-[30px] flex items-center transition-all duration-300 bg-transparent whitespace-nowrap" 
                        :class="selectedYear === null ? 'text-indigo-500 font-bold' : 'text-[#121212]/60 dark:text-white/60 hover:text-indigo-500 dark:hover:text-indigo-400'"
                      >
                        Toutes
                      </button>
                      <button 
                        v-for="opt in yearOptions" 
                        :key="opt" 
                        @click="selectedYear = opt; activeMenu = null" 
                        class="u-h4 h-[30px] flex items-center transition-all duration-300 bg-transparent whitespace-nowrap" 
                        :class="selectedYear === opt ? 'text-indigo-500 font-bold' : 'text-[#121212]/60 dark:text-white/60 hover:text-indigo-500 dark:hover:text-indigo-400'"
                      >
                        {{ opt }}
                      </button>
                    </template>
                    <template v-if="activeMenu === 'country'">
                      <button 
                        @click="selectedCountry = null; activeMenu = null" 
                        class="u-h4 h-[30px] flex items-center transition-all duration-300 bg-transparent whitespace-nowrap" 
                        :class="selectedCountry === null ? 'text-indigo-500 font-bold' : 'text-[#121212]/60 dark:text-white/60 hover:text-indigo-500 dark:hover:text-indigo-400'"
                      >
                        Tous
                      </button>
                      <button 
                        v-for="opt in countryOptions" 
                        :key="opt" 
                        @click="selectedCountry = opt; activeMenu = null" 
                        class="u-h4 h-[30px] flex items-center transition-all duration-300 bg-transparent whitespace-nowrap" 
                        :class="selectedCountry === opt ? 'text-indigo-500 font-bold' : 'text-[#121212]/60 dark:text-white/60 hover:text-indigo-500 dark:hover:text-indigo-400'"
                      >
                        {{ opt }}
                      </button>
                    </template>
                  </div>
                </div>
              </Transition>
            </div>
          </template>

          <!-- Project Navigation Triggers (Specific to Detail Page) -->
          <template v-if="isProjectPage">
            <!-- Column 2: Sequence Counter -->
            <div class="h-[30px] flex items-center">
              <SequenceCounter
                v-if="totalImages > 0"
                :model-value="carouselCurrentImageIndex"
                :total="totalImages"
                @update:model-value="newIndex => setCurrentImageIndex(newIndex)"
              />
            </div>

            <!-- Column 3: Project Navigation -->
            <div class="h-[30px] flex items-center justify-end xl:justify-start gap-6 xl:col-start-3">
              <NuxtLink 
                to="/projects" 
                class="u-h4 font-medium transition-all hover:text-black dark:hover:text-white hover:font-extrabold text-[#121212] dark:text-white mr-4"
              >
                retour
              </NuxtLink>

              <NuxtLink 
                v-if="prevProject" 
                :to="prevProject.path" 
                class="u-h4 font-medium transition-all hover:text-black dark:hover:text-white hover:font-extrabold text-[#121212] dark:text-white"
                @click="setTransitionDirection('prev')"
              >
                &lt;
              </NuxtLink>
              <span v-else class="u-h4 font-medium text-gray-300 dark:text-gray-600 cursor-default">&lt;</span>

              <NuxtLink to="/projects" class="u-h4 font-medium transition-all hover:text-black dark:hover:text-white hover:font-extrabold text-[#121212] dark:text-white">
                projets
              </NuxtLink>
              
              <NuxtLink 
                v-if="nextProject" 
                :to="nextProject.path" 
                class="u-h4 font-medium transition-all hover:text-black dark:hover:text-white hover:font-extrabold text-[#121212] dark:text-white"
                @click="setTransitionDirection('next')"
              >
                &gt;
              </NuxtLink>
              <span v-else class="u-h4 font-medium text-gray-300 dark:text-gray-600 cursor-default">&gt;</span>
            </div>
          </template>

          <!-- Reset Buttons Column -->
          <div class="flex justify-end xl:col-start-4 gap-2">
            <button 
              v-if="hasActiveFilters"
              @click="resetFilters"
              class="flex-shrink-0 flex items-center justify-center w-[30px] h-[30px] border border-red-600/30 dark:border-red-400/30 text-red-600 dark:text-red-400 bg-transparent hover:bg-red-600 dark:hover:bg-red-500 hover:text-white transition-all duration-300 -mt-[1px]"
              title="Réinitialiser les filtres"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 101.06 1.06L10 11.06l3.72 3.72a.75.75 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, computed, onMounted, onUnmounted } from 'vue';
import { useProjectFilters } from '~/composables/useProjectFilters';
import { useHoverProject } from '~/composables/useHoverProject';
import { useVisitedProjects } from '~/composables/useVisitedProjects';
import { useCarouselState } from '~/composables/useCarouselState';
import SequenceCounter from '~/components/SequenceCounter.vue';

const { hoveredProject, hoveredProjectTitle } = useHoverProject();
const { clearVisited, visitedProjects } = useVisitedProjects();
const { currentImageIndex: carouselCurrentImageIndex, totalImages, setCurrentImageIndex } = useCarouselState();

const props = defineProps<{
  title: string | { main: string; sub?: string };
  showFilters?: boolean;
  readonlyFilters?: boolean;
  hideMainTitle?: boolean;
  noSticky?: boolean;
}>();

const route = useRoute();

const { data: allContent } = await useAsyncData('all-projects-nav', () =>
  queryCollection('content')
    .select('path', 'title', 'date')
    .where('path', 'LIKE', '/projects/%')
    .where('draft', '<>', true)
    .all()
);

const projects = computed(() => {
  if (!allContent.value) return [];
  return [...allContent.value].sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    return dateB - dateA;
  });
});

const currentProjectIndex = computed(() => {
  return projects.value.findIndex(p => p.path === route.path);
});

const prevProject = computed(() => {
  if (currentProjectIndex.value > 0) {
    return projects.value[currentProjectIndex.value - 1];
  }
  return null;
});

const nextProject = computed(() => {
  if (currentProjectIndex.value < projects.value.length - 1) {
    return projects.value[currentProjectIndex.value + 1];
  }
  return null;
});

const isProjectPage = computed(() => route.path.startsWith('/projects/') && route.path !== '/projects');

const setTransitionDirection = (direction: 'next' | 'prev') => {
  if (import.meta.client) {
    document.documentElement.classList.remove('transition-next', 'transition-prev');
    document.documentElement.classList.add(`transition-${direction}`);
  }
};

const filterContainer = ref<HTMLElement | null>(null);

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
  projectTitleOptions,
  resetFilters
} = useProjectFilters();

const activeMenu = ref<string | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (filterContainer.value && !filterContainer.value.contains(event.target as Node)) {
    activeMenu.value = null;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const filters = computed(() => {
  const hp = hoveredProject.value;

  // Extract year from hp.date if it exists
  let hpYear = null;
  if (hp?.date) {
    const d = hp.date;
    if (typeof d === 'number' || (typeof d === 'string' && /^\d{4}$/.test(d))) {
      hpYear = d.toString();
    } else {
      const dateObj = new Date(d);
      if (!isNaN(dateObj.getTime())) hpYear = dateObj.getFullYear().toString();
    }
  }

  // If readonly mode (Project Detail), we condense everything into one label for the first trigger
  if (props.readonlyFilters) {
    const parts = [];
    if (hp?.typologies?.[0]) parts.push(hp.typologies[0]);
    if (hpYear) parts.push(hpYear);
    if (hp?.pays?.[0]) parts.push(hp.pays[0]);
    
    return [
      { 
        id: 'info', 
        category: 'Info', 
        selection: parts.join(', ') || '...',
        active: false 
      }
    ];
  }

  return [
    { 
      id: 'typology', 
      category: 'Typologie',
      selection: (hp?.typologies && hp.typologies.length > 0) 
        ? hp.typologies[0] 
        : (selectedTypology.value || 'Toutes'),
      active: !!selectedTypology.value
    },
    { 
      id: 'year', 
      category: 'Année',
      selection: hpYear || (selectedYear.value || 'Toutes'),
      active: !!selectedYear.value
    },
    { 
      id: 'country', 
      category: 'Pays',
      selection: (hp?.pays && hp.pays.length > 0) 
        ? hp.pays[0] 
        : (selectedCountry.value || 'Tous'),
      active: !!selectedCountry.value
    }
  ];
});

const toggleMenu = (id: string) => {
  if (activeMenu.value === id) {
    activeMenu.value = null;
  } else {
    activeMenu.value = id;
  }
};

const hasActiveFilters = computed(() => {
  return selectedTypology.value || selectedSize.value || selectedYear.value || selectedCountry.value || selectedProjectTitle.value;
});
</script>

<style scoped>
@reference "../assets/css/main.css";
</style>
