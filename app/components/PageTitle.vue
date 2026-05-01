<template>
  <div 
    class="relative z-40 transition-colors duration-700"
    :class="[
      isProjectPage ? 'pb-1' : 'pb-2',
      { 'glass-fluted -mx-[var(--main-padding)] px-[var(--main-padding)]': showFilters || $slots.triggers },
      { 'sticky top-[var(--header-height)]': (showFilters || $slots.triggers) && !noSticky }
    ]"
  >
    <!-- Project Title Slot: Permanent height to avoid folding effect -->
    <div class="h-[30px] relative flex items-center"> 
      <Transition
        enter-active-class="transition duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in absolute top-0 left-0"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div 
          v-if="hoveredProjectTitle || (!hideMainTitle && title) || (hideMainTitle && title)" 
          :key="hoveredProjectTitle || (typeof title === 'string' ? title : title.main)"
          class="text-[18px] sm:text-[20px] font-bold leading-none text-[#121212] dark:text-white doux:text-[#4A4443] nuit:text-[#CDD6F4] whitespace-nowrap overflow-hidden text-ellipsis w-full md:w-[calc((100%-32px)/2)] xl:w-[calc((100%-96px)/4)] h-full flex items-center"
          :style="{ viewTransitionName: route.path.startsWith('/projects/') ? 'title-' + route.path.replace(/\//g, '-') : 'project-title-continuity' }"
        >
          <template v-if="hoveredProjectTitle">
            {{ hoveredProjectTitle }}
          </template>
          <template v-else-if="!hideMainTitle && title">
            {{ typeof title === 'string' ? title : title.main }}
          </template>
          <template v-else-if="hideMainTitle && title">
            {{ typeof title === 'string' ? title : '' }}
          </template>
        </div>
      </Transition>
    </div>
    
    <div v-if="showFilters || $slots.triggers" class="mt-0 relative" ref="filterContainer">
      <!-- Custom triggers slot -->
      <slot name="triggers">
        <!-- Grid aligned triggers -->
        <div 
          class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4 md:gap-8 items-start"
          style="view-transition-name: page-triggers;"
        >
          <!-- Standard Filters (Grid) or Project Info (Detail) -->
          <template v-if="showFilters">
            <div 
              v-for="filter in filters" 
              :key="filter.id"
              class="relative col-span-1"
            >
              <button 
                @click="!readonlyFilters ? toggleMenu(filter.id) : null"
                class="flex items-center justify-between gap-1 md:gap-2 u-h4 transition-all duration-700 px-1 md:px-3 h-[30px] -mt-[1px] w-full group"
                :class="[
                  readonlyFilters 
                    ? 'bg-transparent border border-primary-900 text-primary-900 dark:border-primary-400 dark:text-primary-400 cursor-default pointer-events-none' 
                    : 'bg-white/50 dark:bg-white/5 border border-[#121212]/30 dark:border-white/20',
                  activeMenu === filter.id ? 'text-primary-900 border-primary-900 dark:text-primary-400 dark:border-primary-400 z-50' : (!readonlyFilters ? 'text-[#121212] dark:text-white doux:text-[#4A4443] nuit:text-[#CDD6F4]' : ''),
                  filter.active ? '!text-primary-900 !border-primary-900 dark:!text-primary-400 dark:!border-primary-400 z-50' : '',
                  !readonlyFilters ? 'hover:border-primary-900 hover:text-primary-900 dark:hover:border-primary-400 dark:hover:text-primary-400' : ''
                ]"
              >
                <div class="flex items-center gap-2 truncate">
                  <span class="truncate">{{ filter.selection }}</span>
                </div>
                
                <template v-if="!readonlyFilters">
                  <svg 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    class="w-4 h-4 flex-shrink-0 transition-transform duration-700"
                    :class="{ 'rotate-180': activeMenu === filter.id }"
                  >
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </template>
              </button>

              <!-- Local Dropdown Menu (Horizontal Ribbon) -->
              <Transition
                mode="out-in"
                enter-active-class="transition duration-500 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-700 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div 
                  v-if="activeMenu === filter.id" 
                  class="absolute left-0 top-full mt-2 z-50 glass-fluted bg-white/70 dark:bg-[#121212]/70 border border-[#121212]/10 dark:border-white/10 p-2 shadow-xl min-w-max"
                  :class="{ 'right-0 left-auto': filter.id === 'country' && !isProjectPage }"
                >
                  <div class="flex flex-row gap-x-6 px-2">
                    <template v-if="activeMenu === 'typology'">
                      <button 
                        @click="selectedTypology = null; activeMenu = null" 
                        class="u-h4 h-[30px] flex items-center transition-all duration-700 bg-transparent whitespace-nowrap" 
                        :class="selectedTypology === null ? 'text-primary-900 dark:text-primary-400 font-bold' : 'text-[#121212]/60 dark:text-white/60 doux:text-[#4A4443]/60 nuit:text-[#CDD6F4]/60 hover:text-primary-900 dark:hover:text-primary-400'"
                      >
                        Toutes
                      </button>
                      <button 
                        v-for="opt in typologyOptions" 
                        :key="opt" 
                        @click="selectedTypology = opt; activeMenu = null" 
                        class="u-h4 h-[30px] flex items-center transition-all duration-700 bg-transparent whitespace-nowrap" 
                        :class="selectedTypology === opt ? 'text-primary-900 dark:text-primary-400 font-bold' : 'text-[#121212]/60 dark:text-white/60 doux:text-[#4A4443]/60 nuit:text-[#CDD6F4]/60 hover:text-primary-900 dark:hover:text-primary-400'"
                      >
                        {{ opt }}
                      </button>
                    </template>
                    <template v-if="activeMenu === 'year'">
                      <button 
                        @click="selectedYear = null; activeMenu = null" 
                        class="u-h4 h-[30px] flex items-center transition-all duration-700 bg-transparent whitespace-nowrap" 
                        :class="selectedYear === null ? 'text-primary-900 dark:text-primary-400 font-bold' : 'text-[#121212]/60 dark:text-white/60 doux:text-[#4A4443]/60 nuit:text-[#CDD6F4]/60 hover:text-primary-900 dark:hover:text-primary-400'"
                      >
                        Toutes
                      </button>
                      <button 
                        v-for="opt in yearOptions" 
                        :key="opt" 
                        @click="selectedYear = opt; activeMenu = null" 
                        class="u-h4 h-[30px] flex items-center transition-all duration-700 bg-transparent whitespace-nowrap" 
                        :class="selectedYear === opt ? 'text-primary-900 dark:text-primary-400 font-bold' : 'text-[#121212]/60 dark:text-white/60 doux:text-[#4A4443]/60 nuit:text-[#CDD6F4]/60 hover:text-primary-900 dark:hover:text-primary-400'"
                      >
                        {{ opt }}
                      </button>
                    </template>
                    <template v-if="activeMenu === 'country'">
                      <button 
                        @click="selectedCountry = null; activeMenu = null" 
                        class="u-h4 h-[30px] flex items-center transition-all duration-700 bg-transparent whitespace-nowrap" 
                        :class="selectedCountry === null ? 'text-primary-900 dark:text-primary-400 font-bold' : 'text-[#121212]/60 dark:text-white/60 doux:text-[#4A4443]/60 nuit:text-[#CDD6F4]/60 hover:text-primary-900 dark:hover:text-primary-400'"
                      >
                        Tous
                      </button>
                      <button 
                        v-for="opt in countryOptions" 
                        :key="opt" 
                        @click="selectedCountry = opt; activeMenu = null" 
                        class="u-h4 h-[30px] flex items-center transition-all duration-700 bg-transparent whitespace-nowrap" 
                        :class="selectedCountry === opt ? 'text-primary-900 dark:text-primary-400 font-bold' : 'text-[#121212]/60 dark:text-white/60 doux:text-[#4A4443]/60 nuit:text-[#CDD6F4]/60 hover:text-primary-900 dark:hover:text-primary-400'"
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
            <!-- Column 2: Sequence Navigation (Arrows + Counters) -->
            <div class="h-[30px] flex items-center col-span-full md:col-span-1">
              <SequenceCounter
                v-if="totalImages > 0"
                :model-value="carouselCurrentImageIndex"
                :total="totalImages"
                :prev-project="prevProject"
                :next-project="nextProject"
                @update:model-value="newIndex => setCurrentImageIndex(newIndex)"
                @nav="direction => setTransitionDirection(direction)"
              />
            </div>
          </template>

          <!-- Reset Buttons Column -->
          <div class="flex justify-end md:col-start-3 xl:col-start-4 gap-2">
            <button 
              v-if="hasActiveFilters"
              @click="resetFilters"
              class="flex items-center gap-2 u-h4 px-3 h-[30px] border border-primary-900/30 dark:border-primary-400/30 text-primary-900 dark:text-primary-400 bg-white/50 dark:bg-white/5 hover:bg-primary-900 hover:text-white dark:hover:bg-primary-400 dark:hover:text-[#121212] transition-all duration-700 -mt-[1px] whitespace-nowrap group/reset"
              title="Réinitialiser les filtres"
            >
              <span class="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium">Tout effacer</span>
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 opacity-50 group-hover/reset:opacity-100 transition-opacity">
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
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
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
    const p = projects.value[currentProjectIndex.value - 1];
    return p;
  }
  return null;
});

const nextProject = computed(() => {
  if (currentProjectIndex.value < projects.value.length - 1) {
    const p = projects.value[currentProjectIndex.value + 1];
    return p;
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
        selection: parts.join(', ') || 'Détails',
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
        : (selectedTypology.value || 'Typologie'),
      active: !!selectedTypology.value
    },
    { 
      id: 'year', 
      category: 'Année',
      selection: hpYear || (selectedYear.value || 'Année'),
      active: !!selectedYear.value
    },
    { 
      id: 'country', 
      category: 'Pays',
      selection: (hp?.pays && hp.pays.length > 0) 
        ? hp.pays[0] 
        : (selectedCountry.value || 'Pays'),
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
