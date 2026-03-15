<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#121212] transition-colors duration-300">
    <div class="main-container h-[var(--header-height)] flex items-center gap-[20px] px-[var(--main-padding)] relative">
      <!-- Logo -->
      <NuxtLink 
        to="/agence" 
        class="text-[#121212] dark:text-white whitespace-nowrap u-h4 font-light tracking-[0.5em] logo-link"
        @click="handleLinkClick('Studio Soñj')"
        @mouseenter="emit('linkHover', 'Studio Soñj')"
        @mouseleave="emit('linkHover', '')"
      >
        Alexandre MATHIEU
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center ml-10 flex-grow">
        <div class="flex items-center gap-[50px]">
          <NuxtLink 
            v-for="link in links" 
            :key="link.to" 
            :to="link.to"
            class="u-h4 font-medium transition-all hover:text-black dark:hover:text-gray-300 hover:font-extrabold text-[#121212] dark:text-white"
            @click="handleLinkClick(link.label)"
            @mouseenter="emit('linkHover', link.label)"
            @mouseleave="emit('linkHover', '')"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </nav>

      <!-- Large Space -->
      <div class="flex-grow"></div>

      <!-- Desktop Search Bar, Theme Toggle & Lang Toggle -->
      <div class="hidden md:flex items-center gap-[40px]">
        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme" 
          class="p-1 text-[#121212] dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors flex items-center justify-center"
          :title="colorMode.value === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'"
        >
          <UIcon v-if="colorMode.value === 'dark'" name="i-heroicons-sun" class="w-5 h-5" />
          <UIcon v-else name="i-heroicons-moon" class="w-5 h-5" />
        </button>

        <!-- Search Bar -->
        <div class="flex items-center relative">
          <div 
            class="flex items-center transition-all duration-300 ease-in-out overflow-hidden"
            :class="isSearchExpanded ? 'w-64 opacity-100' : 'w-0 opacity-0'"
          >
            <UInput 
              ref="searchInput"
              v-model="searchTerm" 
              placeholder="Rechercher..." 
              icon="i-heroicons-magnifying-glass-20-solid" 
              class="w-full header-search-input dark:text-white"
              color="[#121212]"
              variant="none"
              size="md"
              @blur="handleSearchBlur"
            />
          </div>
          <button 
            v-if="!isSearchExpanded"
            @click="isSearchExpanded = true"
            class="p-1 text-[#121212] dark:text-white hover:text-black dark:hover:text-gray-300 hover:font-extrabold transition-all flex items-center justify-center"
          >
            <UIcon name="i-heroicons-magnifying-glass-20-solid" class="w-5 h-5" />
          </button>

          <!-- Search Results Dropdown -->
          <div 
            v-if="isSearchExpanded && searchTerm && searchResults.length > 0" 
            class="absolute top-full mt-2 right-0 w-64 bg-white dark:bg-[#121212] border border-gray-100 dark:border-gray-800 shadow-xl z-[100] max-h-80 overflow-y-auto"
          >
            <NuxtLink 
              v-for="result in searchResults" 
              :key="result.path" 
              :to="result.path"
              class="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 border-b border-gray-50 dark:border-gray-800 last:border-0 group"
              @click="clearSearch"
            >
              <div class="text-[12px] font-bold text-[#121212] dark:text-white tracking-wider group-hover:text-black dark:group-hover:text-gray-300 transition-colors">{{ result.title }}</div>
              <div v-if="result.description" class="text-[10px] text-gray-400 mt-1 line-clamp-1">{{ result.description }}</div>
            </NuxtLink>
            </div>
            <div 
            v-else-if="isSearchExpanded && searchTerm && !isSearching" 
            class="absolute top-full mt-2 right-0 w-64 bg-white dark:bg-[#121212] border border-gray-100 dark:border-gray-800 p-4 shadow-xl z-[100] text-[10px] text-gray-400 tracking-widest text-center"
            >
            Aucun résultat
            </div>        </div>

        <UButton
          :label="currentLang"
          variant="ghost"
          color="[#121212]"
          class="p-0 hover:bg-transparent u-h4 font-medium transition-all hover:text-black dark:hover:text-gray-300 dark:text-white hover:font-extrabold"
          @click="toggleLang"
          @mouseenter="emit('linkHover', 'Langue')"
          @mouseleave="emit('linkHover', '')"
        />
      </div>

      <!-- Mobile Toggle Button -->
      <div class="md:hidden flex items-center gap-4">
        <button 
          @click="toggleTheme" 
          class="p-1 text-[#121212] dark:text-white"
        >
          <UIcon v-if="colorMode.value === 'dark'" name="i-heroicons-sun" class="w-5 h-5" />
          <UIcon v-else name="i-heroicons-moon" class="w-5 h-5" />
        </button>
        <button 
          @click="toggleMenu" 
          class="p-2 rounded-md text-[#121212] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path :class="{ 'hidden': isMenuOpen, 'block': !isMenuOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path :class="{ 'hidden': !isMenuOpen, 'block': isMenuOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation Overlay -->
      <div v-if="isMenuOpen" class="md:hidden fixed inset-0 bg-white dark:bg-[#121212] z-40 flex flex-col items-center justify-center space-y-8">
        <!-- Search Bar (Mobile) -->
        <UInput 
          v-model="searchTerm" 
          placeholder="Rechercher..." 
          icon="i-heroicons-magnifying-glass-20-solid" 
          class="w-full max-w-xs header-search-input"
          color="[#121212]"
          variant="none"
          size="md"
        />

        <NuxtLink 
          v-for="link in links" 
          :key="link.to" 
          :to="link.to"
          class="u-h4 font-bold text-[30px] dark:text-white"
          :class="{ 'text-gray-600 dark:text-gray-400': activeLink === link.label }"
          @click="handleLinkClick(link.label); isMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>

        <UButton
          :label="currentLang"
          variant="ghost"
          color="[#121212]"
          class="p-0 hover:bg-transparent u-h4 font-bold text-[30px] dark:text-white"
          @click="toggleLang"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import { UInput } from '#components';
import { useHoverProject } from '~/composables/useHoverProject';

const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const { hoveredProjectTitle } = useHoverProject();

const emit = defineEmits(['linkClick', 'linkHover']);

const activeLink = ref('');
const currentLang = ref('EN');
const isMenuOpen = ref(false); // State for mobile menu
const searchTerm = ref(''); // Reactive search term
const isSearchExpanded = ref(false);
const searchInput = ref<any>(null);
const isSearching = ref(false);

const { data: allContent } = await useAsyncData('all-site-content', () =>
  queryCollection('content')
    .select('path', 'title', 'description', 'date')
    .where('draft', '<>', true)
    .all()
);

const route = useRoute();

const searchResults = computed(() => {
  if (!searchTerm.value || !allContent.value) return [];
  const query = searchTerm.value.toLowerCase().trim();
  return allContent.value.filter(item => 
    item.title?.toLowerCase().includes(query) || 
    item.description?.toLowerCase().includes(query)
  ).slice(0, 10); // Limit to 10 results
});

const handleSearchBlur = () => {
  // Delay blurring to allow clicking results
  setTimeout(() => {
    if (searchTerm.value === '') {
      isSearchExpanded.value = false;
    }
  }, 200);
};

const clearSearch = () => {
  searchTerm.value = '';
  isSearchExpanded.value = false;
};

watch(isSearchExpanded, (newValue) => {
  if (newValue) {
    nextTick(() => {
      const input = searchInput.value?.$el?.querySelector('input');
      if (input) input.focus();
    });
  }
});

const handleLinkClick = (label: string) => {
  activeLink.value = label;
  emit('linkClick', label);
};

const toggleLang = () => {
  currentLang.value = currentLang.value === 'EN' ? 'FR' : 'EN';
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const links = [{
  label: 'Projets',
  to: '/projects'
}, {
  label: 'Corpus',
  to: '/corpus'
}, {
  label: 'Art',
  to: '/art'
}]
</script>

<style scoped>
@reference "../assets/css/main.css";

.router-link-active:not(.logo-link) {
  @apply text-black dark:text-white font-extrabold text-[15px] opacity-100;
}

.logo-link.router-link-active {
  @apply font-light text-[#121212] dark:text-white;
}

.header-search-input .icon {
  width: 21px;
  height: 21px;
}
</style>

<style scoped>
@reference "../assets/css/main.css";

.router-link-active:not(.logo-link) {
  @apply text-black font-extrabold text-[15px] opacity-100;
}

.logo-link.router-link-active {
  @apply font-light text-[#121212];
}

.header-search-input .icon {
  width: 21px;
  height: 21px;
}
</style>
