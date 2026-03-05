<template>
  <div class="pb-2 bg-transparent relative">
    <Transition name="title-fade" mode="out-in">
      <div :key="titleKey">
        <template v-if="typeof title === 'object' && title !== null">
          <h1 class="u-h1">
            {{ title.main }}
          </h1>
          <h2 v-if="title.sub" class="u-h2">
            {{ title.sub }}
          </h2>
        </template>
        <template v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 relative">
            <div class="col-start-1 flex justify-between items-baseline">
              <h1 class="u-h1">
                {{ title }}
              </h1>
              
              <!-- Hovered project title: baseline-aligned and right-aligned in the 1st column -->
              <span v-if="hoveredProjectTitle" class="u-h2 text-[#121212] transition-opacity duration-300">
                {{ hoveredProjectTitle }}
              </span>
            </div>
          </div>
        </template>
      </div>
    </Transition>
    
    <div v-if="showFilters && (typeof title === 'string' ? title?.toUpperCase() === 'PROJETS' : title?.main?.toUpperCase() === 'PROJETS')" class="mt-[10px] relative">
      <!-- Accordion Buttons Container aligned with the first column -->
      <div class="flex flex-nowrap md:overflow-visible relative z-40 w-full md:w-[calc((100%-4px)/2)] xl:w-[calc((100%-8px)/3)] overflow-x-auto scrollbar-hide">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          @click="toggleMenu(filter.id)"
          class="flex-shrink-0 flex-auto flex items-center justify-between gap-1 u-h4 transition-all duration-300 px-2 sm:px-3 h-[30px] border border-[#121212]/30 hover:border-indigo-500 hover:text-indigo-500 -ml-[1px] -mt-[1px]"
          :class="[
            activeMenu === filter.id ? 'text-indigo-500 border-indigo-500 z-50' : 'text-[#121212]',
            (filter.id === 'typology' && selectedTypology) ? '!text-indigo-500 !border-indigo-500 z-50' : '',
          ]"
        >
          <span>{{ filter.label }}</span>
          <!-- Icon + / - -->
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

const { hoveredProjectTitle } = useHoverProject();

const props = defineProps<{
  title: string | { main: string; sub?: string };
  showFilters?: boolean;
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

const filters = computed(() => [
  { id: 'typology', label: selectedTypology.value || 'Typologie' },
  { id: 'size', label: selectedSize.value || 'Taille' },
  { id: 'year', label: selectedYear.value || 'Année' },
  { id: 'country', label: selectedCountry.value || 'Pays' }
]);

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
