<template>
  <div class="pb-2 bg-transparent">
    <h1 class="text-4xl md:text-6xl lg:text-[86px] font-bold uppercase leading-none" style="font-family: var(--font-dm-sans);">
      {{ title }}
    </h1>
    
    <div v-if="showFilters && title?.toUpperCase() === 'PROJETS'" class="mt-4">
      <!-- Accordion Buttons -->
      <div class="flex flex-wrap gap-x-8 gap-y-4 border-b border-black pb-2">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          @click="toggleMenu(filter.id)"
          class="flex items-center gap-2 font-bold text-[14px] uppercase transition-colors hover:text-gray-500 text-black"
          style="font-family: var(--font-dm-sans);"
          :class="{ 'text-gray-400': activeMenu === filter.id }"
        >
          <span>{{ filter.label }}</span>
          <svg 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            class="w-4 h-4 transition-transform duration-200"
            :class="{ 'rotate-180': activeMenu === filter.id }"
          >
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- Reset Button -->
        <button 
          v-if="hasActiveFilters"
          @click="resetFilters"
          class="ml-auto flex items-center gap-1 font-bold text-[14px] uppercase text-red-600 hover:text-red-800 transition-colors"
          style="font-family: var(--font-dm-sans);"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
          Réinitialiser
        </button>
      </div>

      <!-- Accordion Panels -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="activeMenu" class="py-4 border-b border-black">
          <div class="flex flex-wrap gap-4">
            <!-- Options for Typology -->
            <template v-if="activeMenu === 'typology'">
              <button 
                @click="selectedTypology = null; activeMenu = null"
                class="px-4 py-1 border border-black text-[13px] uppercase font-medium hover:bg-black hover:text-white transition-colors"
                :class="{ 'bg-black text-white': selectedTypology === null }"
              >
                Toutes
              </button>
              <button 
                v-for="opt in typologyOptions" 
                :key="opt"
                @click="selectedTypology = opt; activeMenu = null"
                class="px-4 py-1 border border-black text-[13px] uppercase font-medium hover:bg-black hover:text-white transition-colors"
                :class="{ 'bg-black text-white': selectedTypology === opt }"
              >
                {{ opt }}
              </button>
            </template>

            <!-- Options for Size -->
            <template v-if="activeMenu === 'size'">
              <button 
                @click="selectedSize = null; activeMenu = null"
                class="px-4 py-1 border border-black text-[13px] uppercase font-medium hover:bg-black hover:text-white transition-colors"
                :class="{ 'bg-black text-white': selectedSize === null }"
              >
                Toutes
              </button>
              <button 
                v-for="opt in sizeOptions" 
                :key="opt"
                @click="selectedSize = opt; activeMenu = null"
                class="px-4 py-1 border border-black text-[13px] uppercase font-medium hover:bg-black hover:text-white transition-colors"
                :class="{ 'bg-black text-white': selectedSize === opt }"
              >
                {{ opt }}
              </button>
            </template>

            <!-- Options for Year -->
            <template v-if="activeMenu === 'year'">
              <button 
                @click="selectedYear = null; activeMenu = null"
                class="px-4 py-1 border border-black text-[13px] uppercase font-medium hover:bg-black hover:text-white transition-colors"
                :class="{ 'bg-black text-white': selectedYear === null }"
              >
                Toutes
              </button>
              <button 
                v-for="opt in yearOptions" 
                :key="opt"
                @click="selectedYear = opt; activeMenu = null"
                class="px-4 py-1 border border-black text-[13px] uppercase font-medium hover:bg-black hover:text-white transition-colors"
                :class="{ 'bg-black text-white': selectedYear === opt }"
              >
                {{ opt }}
              </button>
            </template>

            <!-- Options for Pays -->
            <template v-if="activeMenu === 'country'">
              <button 
                @click="selectedCountry = null; activeMenu = null"
                class="px-4 py-1 border border-black text-[13px] uppercase font-medium hover:bg-black hover:text-white transition-colors"
                :class="{ 'bg-black text-white': selectedCountry === null }"
              >
                Tous
              </button>
              <button 
                v-for="opt in countryOptions" 
                :key="opt"
                @click="selectedCountry = opt; activeMenu = null"
                class="px-4 py-1 border border-black text-[13px] uppercase font-medium hover:bg-black hover:text-white transition-colors"
                :class="{ 'bg-black text-white': selectedCountry === opt }"
              >
                {{ opt }}
              </button>
            </template>

            <!-- Options for Nom (Project Titles) -->
            <template v-if="activeMenu === 'name'">
              <button 
                @click="selectedProjectTitle = null; activeMenu = null"
                class="px-4 py-1 border border-black text-[13px] uppercase font-medium hover:bg-black hover:text-white transition-colors"
                :class="{ 'bg-black text-white': selectedProjectTitle === null }"
              >
                Tous
              </button>
              <button 
                v-for="opt in projectTitleOptions" 
                :key="opt"
                @click="selectedProjectTitle = opt; activeMenu = null"
                class="px-4 py-1 border border-black text-[13px] uppercase font-medium hover:bg-black hover:text-white transition-colors"
                :class="{ 'bg-black text-white': selectedProjectTitle === opt }"
              >
                {{ opt }}
              </button>
            </template>
          </div>
        </div>
      </Transition>

      <!-- Active Filter Pills -->
      <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-2">
        <span v-if="selectedTypology" class="text-[11px] uppercase bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1 text-black">
          Typologie: {{ selectedTypology }}
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 cursor-pointer" @click="selectedTypology = null">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </span>
        <span v-if="selectedSize" class="text-[11px] uppercase bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1 text-black">
          Taille: {{ selectedSize }}
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 cursor-pointer" @click="selectedSize = null">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </span>
        <span v-if="selectedYear" class="text-[11px] uppercase bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1 text-black">
          Année: {{ selectedYear }}
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 cursor-pointer" @click="selectedYear = null">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </span>
        <span v-if="selectedCountry" class="text-[11px] uppercase bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1 text-black">
          Pays: {{ selectedCountry }}
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 cursor-pointer" @click="selectedCountry = null">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </span>
        <span v-if="selectedProjectTitle" class="text-[11px] uppercase bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1 text-black">
          Projet: {{ selectedProjectTitle }}
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 cursor-pointer" @click="selectedProjectTitle = null">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, computed } from 'vue';
import { useProjectFilters } from '~/composables/useProjectFilters';

const props = defineProps<{
  title: string;
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

const activeMenu = ref<string | null>(null);

const filters = computed(() => [
  { id: 'typology', label: selectedTypology.value || 'Typologie' },
  { id: 'size', label: selectedSize.value || 'Taille' },
  { id: 'year', label: selectedYear.value || 'Année' },
  { id: 'country', label: selectedCountry.value || 'Pays' },
  { id: 'name', label: selectedProjectTitle.value || 'Nom' }
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
