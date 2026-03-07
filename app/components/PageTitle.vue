<template>
  <div class="pb-2 bg-transparent relative -mt-[10px]">
    <!-- Title Section -->
    <div>
      <h1 class="u-h1">
        {{ typeof title === 'object' && title !== null ? title.main : title }}
      </h1>
      <h2 v-if="typeof title === 'object' && title !== null && title.sub" class="u-h2">
        {{ title.sub }}
      </h2>

      <div class="min-h-[32px] flex items-end -mt-[5px]"> <!-- Spacer to prevent layout jump -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div v-if="hoveredProjectTitle" class="text-[20px] font-bold leading-none text-[#121212] whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {{ hoveredProjectTitle }}
          </div>
        </Transition>
      </div>
    </div>
    
    <div v-if="showFilters" class="mt-[5px] relative">
      <!-- Accordion Buttons Container aligned with the first column -->
      <div class="flex flex-nowrap md:overflow-visible relative z-40 w-full md:w-[calc((100%-4px)/2)] xl:w-[calc((100%-8px)/3)] overflow-x-auto scrollbar-hide">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          @click="!readonlyFilters ? toggleMenu(filter.id) : null"
          class="flex-shrink-0 flex-auto flex items-center justify-between gap-1 u-h4 transition-all duration-300 px-2 sm:px-3 h-[30px] border border-[#121212]/30 -ml-[1px] -mt-[1px]"
          :class="[
            activeMenu === filter.id ? 'text-indigo-500 border-indigo-500 z-50' : 'text-[#121212]',
            (filter.id === 'typology' && selectedTypology) ? '!text-indigo-500 !border-indigo-500 z-50' : '',
            readonlyFilters ? 'cursor-default pointer-events-none' : 'hover:border-indigo-500 hover:text-indigo-500'
          ]"
        >
          <span>{{ filter.label }}</span>
          <!-- Icon + / - (hidden if readonly) -->
          <template v-if="!readonlyFilters">
            <svg 
              v-if="activeMenu !== filter.id"
              viewBox="0 0 20 20" 
              fill="currentColor" 
              class="w-4 h-4 flex-shrink-0"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            <svg 
              v-else
              viewBox="0 0 20 20" 
              fill="currentColor" 
              class="w-4 h-4 flex-shrink-0"
            >
              <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
            </svg>
          </template>
        </button>

        <!-- Reset Button (X in a red frame) -->
        <button 
          v-if="hasActiveFilters"
          @click="resetFilters"
          class="ml-auto flex-shrink-0 flex items-center justify-center w-[30px] h-[30px] border border-red-600/30 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 -mt-[1px] -ml-[1px]"
          title="Réinitialiser les filtres"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>

      <!-- Accordion Panels (Absolute positioning to prevent layout shift) -->
      <div class="relative w-full md:w-[calc((100%-4px)/2)] xl:w-[calc((100%-8px)/3)]">
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="activeMenu" :key="activeMenu" class="absolute top-0 left-0 w-full z-30">
            <div class="flex flex-wrap">
              <!-- Options for Typology -->
              <template v-if="activeMenu === 'typology'">
                <button 
                  @click="selectedTypology = null; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-indigo-500 hover:text-white transition-colors duration-500 ease-in-out -ml-[1px] -mt-[1px]"
                  :class="{ 'bg-indigo-500 text-white border-indigo-500': selectedTypology === null }"
                >
                  Toutes
                </button>
                <button 
                  v-for="opt in typologyOptions" 
                  :key="opt"
                  @click="selectedTypology = opt; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-indigo-500 hover:text-white transition-colors duration-500 ease-in-out -ml-[1px] -mt-[1px]"
                  :class="{ 'bg-indigo-500 text-white border-indigo-500': selectedTypology === opt }"
                >
                  {{ opt }}
                </button>
              </template>

              <!-- Options for Size -->
              <template v-if="activeMenu === 'size'">
                <button 
                  @click="selectedSize = null; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-indigo-500 hover:text-white transition-colors duration-500 ease-in-out -ml-[1px] -mt-[1px]"
                  :class="{ 'bg-indigo-500 text-white border-indigo-500': selectedSize === null }"
                >
                  Toutes
                </button>
                <button 
                  v-for="opt in sizeOptions" 
                  :key="opt"
                  @click="selectedSize = opt; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-indigo-500 hover:text-white transition-colors duration-500 ease-in-out -ml-[1px] -mt-[1px]"
                  :class="{ 'bg-indigo-500 text-white border-indigo-500': selectedSize === opt }"
                >
                  {{ opt }}
                </button>
              </template>

              <!-- Options for Year -->
              <template v-if="activeMenu === 'year'">
                <button 
                  @click="selectedYear = null; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-indigo-500 hover:text-white transition-colors duration-500 ease-in-out -ml-[1px] -mt-[1px]"
                  :class="{ 'bg-indigo-500 text-white border-indigo-500': selectedYear === null }"
                >
                  Toutes
                </button>
                <button 
                  v-for="opt in yearOptions" 
                  :key="opt"
                  @click="selectedYear = opt; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-indigo-500 hover:text-white transition-colors duration-500 ease-in-out -ml-[1px] -mt-[1px]"
                  :class="{ 'bg-indigo-500 text-white border-indigo-500': selectedYear === opt }"
                >
                  {{ opt }}
                </button>
              </template>

              <!-- Options for Pays -->
              <template v-if="activeMenu === 'country'">
                <button 
                  @click="selectedCountry = null; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-indigo-500 hover:text-white transition-colors duration-500 ease-in-out -ml-[1px] -mt-[1px]"
                  :class="{ 'bg-indigo-500 text-white border-indigo-500': selectedCountry === null }"
                >
                  Tous
                </button>
                <button 
                  v-for="opt in countryOptions" 
                  :key="opt"
                  @click="selectedCountry = opt; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-indigo-500 hover:text-white transition-colors duration-500 ease-in-out -ml-[1px] -mt-[1px]"
                  :class="{ 'bg-indigo-500 text-white border-indigo-500': selectedCountry === opt }"
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
import { ref, defineProps, watch, computed } from 'vue';
import { useProjectFilters } from '~/composables/useProjectFilters';
import { useHoverProject } from '~/composables/useHoverProject';

const { hoveredProject, hoveredProjectTitle } = useHoverProject();

const props = defineProps<{
  title: string | { main: string; sub?: string };
  showFilters?: boolean;
  readonlyFilters?: boolean;
}>();

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

const titleKey = computed(() => {
  if (typeof props.title === 'object' && props.title !== null) {
    return props.title.main + (props.title.sub || '');
  }
  return props.title;
});

const activeMenu = ref<string | null>(null);

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

  return [
    { 
      id: 'typology', 
      label: (hp?.typologies && hp.typologies.length > 0) 
        ? hp.typologies.join(', ') 
        : (selectedTypology.value || 'Typologie') 
    },
    { 
      id: 'size', 
      label: (hp?.tailles && hp.tailles.length > 0) 
        ? hp.tailles.join(', ') 
        : (selectedSize.value || 'Taille') 
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

watch(() => props.title, (newTitle) => {
  console.log('PageTitle received title:', newTitle);
});
</script>
