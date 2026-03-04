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
          <h1 class="u-h1">
            {{ title }}
          </h1>
        </template>
      </div>
    </Transition>
    
    <div v-if="showFilters && (typeof title === 'string' ? title?.toUpperCase() === 'PROJETS' : title?.main?.toUpperCase() === 'PROJETS')" class="mt-2 relative">
      <!-- Accordion Buttons -->
      <div class="flex flex-wrap gap-x-12 gap-y-4 border-b border-[#121212]/30 pb-2 relative z-40 bg-[rgb(248,248,248)]">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          @click="toggleMenu(filter.id)"
          class="flex items-center justify-between gap-2 u-h4 transition-colors hover:text-gray-500"
          :class="[
            activeMenu === filter.id ? 'text-gray-400' : 'text-[#121212]',
            (filter.id === 'typology' && selectedTypology) ? '!text-[#8B5CF6]' : '',
            filter.width
          ]"
        >
          <span class="truncate">{{ filter.label }}</span>
          <svg 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            class="w-4 h-4 flex-shrink-0 transition-transform duration-200"
            :class="{ 'rotate-180': activeMenu === filter.id }"
          >
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- Reset Button -->
        <button 
          v-if="hasActiveFilters"
          @click="resetFilters"
          class="ml-auto flex items-center gap-1 u-h4 text-red-600 hover:text-red-800 transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
          Réinitialiser
        </button>
      </div>

      <!-- Accordion Panels (Absolute positioning to prevent layout shift) -->
      <div class="relative w-full">
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="activeMenu" :key="activeMenu" class="absolute top-0 left-0 w-full z-30 bg-[rgb(248,248,248)] py-2 border-b border-[#121212]/30">
            <div class="flex flex-wrap gap-2">
              <!-- Options for Typology -->
              <template v-if="activeMenu === 'typology'">
                <button 
                  @click="selectedTypology = null; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-[#121212] hover:text-white transition-colors rounded-sm"
                  :class="{ 'bg-[#121212] text-white': selectedTypology === null }"
                >
                  Toutes
                </button>
                <button 
                  v-for="opt in typologyOptions" 
                  :key="opt"
                  @click="selectedTypology = opt; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-[#121212] hover:text-white transition-colors rounded-sm"
                  :class="{ 'bg-[#121212] text-white': selectedTypology === opt }"
                >
                  {{ opt }}
                </button>
              </template>

              <!-- Options for Size -->
              <template v-if="activeMenu === 'size'">
                <button 
                  @click="selectedSize = null; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-[#121212] hover:text-white transition-colors rounded-sm"
                  :class="{ 'bg-[#121212] text-white': selectedSize === null }"
                >
                  Toutes
                </button>
                <button 
                  v-for="opt in sizeOptions" 
                  :key="opt"
                  @click="selectedSize = opt; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-[#121212] hover:text-white transition-colors rounded-sm"
                  :class="{ 'bg-[#121212] text-white': selectedSize === opt }"
                >
                  {{ opt }}
                </button>
              </template>

              <!-- Options for Year -->
              <template v-if="activeMenu === 'year'">
                <button 
                  @click="selectedYear = null; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-[#121212] hover:text-white transition-colors rounded-sm"
                  :class="{ 'bg-[#121212] text-white': selectedYear === null }"
                >
                  Toutes
                </button>
                <button 
                  v-for="opt in yearOptions" 
                  :key="opt"
                  @click="selectedYear = opt; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-[#121212] hover:text-white transition-colors rounded-sm"
                  :class="{ 'bg-[#121212] text-white': selectedYear === opt }"
                >
                  {{ opt }}
                </button>
              </template>

              <!-- Options for Pays -->
              <template v-if="activeMenu === 'country'">
                <button 
                  @click="selectedCountry = null; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-[#121212] hover:text-white transition-colors rounded-sm"
                  :class="{ 'bg-[#121212] text-white': selectedCountry === null }"
                >
                  Tous
                </button>
                <button 
                  v-for="opt in countryOptions" 
                  :key="opt"
                  @click="selectedCountry = opt; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-[#121212] hover:text-white transition-colors rounded-sm"
                  :class="{ 'bg-[#121212] text-white': selectedCountry === opt }"
                >
                  {{ opt }}
                </button>
              </template>

              <!-- Options for Nom (Project Titles) -->
              <template v-if="activeMenu === 'name'">
                <button 
                  @click="selectedProjectTitle = null; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-[#121212] hover:text-white transition-colors rounded-sm"
                  :class="{ 'bg-[#121212] text-white': selectedProjectTitle === null }"
                >
                  Tous
                </button>
                <button 
                  v-for="opt in projectTitleOptions" 
                  :key="opt"
                  @click="selectedProjectTitle = opt; activeMenu = null"
                  class="px-2 py-0.5 border border-[#121212]/50 text-[14px] font-medium hover:bg-[#121212] hover:text-white transition-colors rounded-sm"
                  :class="{ 'bg-[#121212] text-white': selectedProjectTitle === opt }"
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
  { id: 'typology', label: selectedTypology.value || 'Typologie', width: 'w-[140px]' },
  { id: 'size', label: selectedSize.value || 'Taille', width: 'w-[80px]' },
  { id: 'year', label: selectedYear.value || 'Année', width: 'w-[80px]' },
  { id: 'country', label: selectedCountry.value || 'Pays', width: 'w-[110px]' },
  { id: 'name', label: selectedProjectTitle.value || 'Nom', width: 'w-[200px]' }
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
