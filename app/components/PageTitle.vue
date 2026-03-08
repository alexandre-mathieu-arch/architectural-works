<template>
  <div 
    class="pb-10 relative z-30"
    :class="{ 'sticky top-[var(--header-height)] bg-[#FFFFFF] -mx-[var(--main-padding)] px-[var(--main-padding)]': showFilters || $slots.triggers }"
  >
    <!-- Project Title Slot: Permanent height to avoid folding effect -->
    <div class="h-[40px] relative"> 
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
          class="text-[20px] font-bold leading-none text-[#121212] whitespace-nowrap overflow-hidden text-ellipsis w-full md:w-[calc((100%-32px)/2)] xl:w-[calc((100%-96px)/4)] h-full flex items-center"
          style="view-transition-name: project-title-continuity;"
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
          v-if="showFilters"
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-start"
          style="view-transition-name: page-triggers;"
        >
          <button 
            v-for="filter in filters" 
            :key="filter.id"
            @click="!readonlyFilters ? toggleMenu(filter.id) : null"
            class="flex items-center justify-between gap-1 u-h4 transition-all duration-300 px-2 sm:px-3 h-[30px] border border-[#121212]/30 -mt-[1px] bg-[#FFFFFF] w-full"
            :class="[
              activeMenu === filter.id ? 'text-indigo-500 border-indigo-500 z-50' : 'text-[#121212]',
              ((filter.id === 'typology' && selectedTypology) || (filter.id === 'year' && selectedYear) || (filter.id === 'country' && selectedCountry)) ? '!text-indigo-500 !border-indigo-500 z-50' : '',
              readonlyFilters ? 'cursor-default pointer-events-none' : 'hover:border-indigo-500 hover:text-indigo-500'
            ]"
          >
            <span class="truncate pr-4">{{ filter.label }}</span>
            <!-- Icon + / - (hidden if readonly) -->
            <template v-if="!readonlyFilters">
              <svg 
                v-if="activeMenu !== filter.id"
                viewBox="0 0 20 20" 
                fill="currentColor" 
                class="w-4 h-4 flex-shrink-0 pointer-events-none"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              <svg 
                v-else
                viewBox="0 0 20 20" 
                fill="currentColor" 
                class="w-4 h-4 flex-shrink-0 pointer-events-none"
              >
                <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
              </svg>
            </template>
          </button>

          <!-- Reset Buttons Column -->
          <div class="flex justify-end xl:col-start-4 gap-2">
            <!-- Reveal Colors Button (Magic Wand) -->
            <button 
              v-if="visitedProjects.size > 0 && !readonlyFilters"
              @click="clearVisited"
              class="flex items-center gap-2 px-3 h-[30px] border border-indigo-500/30 text-indigo-500 bg-[#FFFFFF] hover:bg-indigo-500 hover:text-white transition-all duration-300 -mt-[1px] u-h4"
              title="Révéler les couleurs d'origine"
            >
              <UIcon name="i-heroicons-sparkles" class="w-4 h-4" />
              <span class="hidden lg:inline">Révéler</span>
            </button>

            <!-- Reset Filters Button -->
            <button 
              v-if="hasActiveFilters"
              @click="resetFilters"
              class="flex-shrink-0 flex items-center justify-center w-[30px] h-[30px] border border-red-600/30 text-red-600 bg-[#FFFFFF] hover:bg-red-600 hover:text-white transition-all duration-300 -mt-[1px]"
              title="Réinitialiser les filtres"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 101.06 1.06L10 11.06l3.72 3.72a.75.75 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>
      </slot>

      <!-- Accordion Panels (Minimalist Ribbon Version) -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 absolute left-0 right-0 top-full mt-2">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-x-4"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 -translate-x-4"
        >
          <div 
            v-if="activeMenu" 
            :key="activeMenu"
            class="w-full z-30"
            :class="{
              'xl:col-start-1': activeMenu === 'typology',
              'xl:col-start-2': activeMenu === 'year',
              'xl:col-start-3': activeMenu === 'country'
            }"
          >
            <div class="flex flex-wrap gap-x-6 gap-y-2 py-2">
              <!-- Options for Typology -->
              <template v-if="activeMenu === 'typology'">
                <button 
                  @click="selectedTypology = null; activeMenu = null"
                  class="u-h4 transition-colors duration-300"
                  :class="selectedTypology === null ? 'text-indigo-500 font-bold' : 'text-[#121212]/60 hover:text-indigo-500'"
                >
                  Toutes
                </button>
                <button 
                  v-for="opt in typologyOptions" 
                  :key="opt"
                  @click="selectedTypology = opt; activeMenu = null"
                  class="u-h4 transition-colors duration-300 text-left"
                  :class="selectedTypology === opt ? 'text-indigo-500 font-bold' : 'text-[#121212]/60 hover:text-indigo-500'"
                >
                  {{ opt }}
                </button>
              </template>

              <!-- Options for Year -->
              <template v-if="activeMenu === 'year'">
                <button 
                  @click="selectedYear = null; activeMenu = null"
                  class="u-h4 transition-colors duration-300"
                  :class="selectedYear === null ? 'text-indigo-500 font-bold' : 'text-[#121212]/60 hover:text-indigo-500'"
                >
                  Toutes
                </button>
                <button 
                  v-for="opt in yearOptions" 
                  :key="opt"
                  @click="selectedYear = opt; activeMenu = null"
                  class="u-h4 transition-colors duration-300 text-left"
                  :class="selectedYear === opt ? 'text-indigo-500 font-bold' : 'text-[#121212]/60 hover:text-indigo-500'"
                >
                  {{ opt }}
                </button>
              </template>

              <!-- Options for Pays -->
              <template v-if="activeMenu === 'country'">
                <button 
                  @click="selectedCountry = null; activeMenu = null"
                  class="u-h4 transition-colors duration-300"
                  :class="selectedCountry === null ? 'text-indigo-500 font-bold' : 'text-[#121212]/60 hover:text-indigo-500'"
                >
                  Tous
                </button>
                <button 
                  v-for="opt in countryOptions" 
                  :key="opt"
                  @click="selectedCountry = opt; activeMenu = null"
                  class="u-h4 transition-colors duration-300 text-left"
                  :class="selectedCountry === opt ? 'text-indigo-500 font-bold' : 'text-[#121212]/60 hover:text-indigo-500'"
                >
                  {{ opt }}
                </button>
              </template>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, computed, onMounted, onUnmounted } from 'vue';
import { useProjectFilters } from '~/composables/useProjectFilters';
import { useHoverProject } from '~/composables/useHoverProject';
import { useVisitedProjects } from '~/composables/useVisitedProjects';

const { hoveredProject, hoveredProjectTitle } = useHoverProject();
const { clearVisited, visitedProjects } = useVisitedProjects();

const props = defineProps<{
  title: string | { main: string; sub?: string };
  showFilters?: boolean;
  readonlyFilters?: boolean;
  hideMainTitle?: boolean;
}>();

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
      { id: 'info', label: parts.join(', ') || 'Information' }
    ];
  }

  return [
    { 
      id: 'typology', 
      label: (hp?.typologies && hp.typologies.length > 0) 
        ? hp.typologies.join(', ') 
        : (selectedTypology.value || 'Typologie') 
    },
    { 
      id: 'year', 
      label: hpYear || (selectedYear.value || 'Année') 
    },
    { 
      id: 'country', 
      label: (hp?.pays && hp.pays.length > 0) 
        ? hp.pays.join(', ') 
        : (selectedCountry.value || 'Pays') 
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
