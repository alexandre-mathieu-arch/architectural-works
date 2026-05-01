<template>
  <header class="fixed top-0 left-0 right-0 z-50 glass-fluted transition-colors duration-300">
    <div class="main-container h-[var(--header-height)] flex items-center gap-[20px] relative">
      <!-- Logo -->
      <NuxtLink 
        to="/about" 
        class="text-[#121212] dark:text-white whitespace-nowrap u-h4 logo-link"
        @click="handleLinkClick('À propos')"
        @mouseenter="emit('linkHover', 'À propos')"
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
            class="u-h4 transition-all hover:text-black dark:hover:text-gray-300 text-[#121212] dark:text-white"
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
      <div class="hidden md:flex items-center gap-[30px]">
        <!-- Theme Toggle -->
        <button 
          @click="cycleTheme" 
          class="p-1 text-[#121212] dark:text-white transition-colors flex items-center justify-center hover:text-primary-900 dark:hover:text-primary-400"
          :title="themeTitle"
        >
          <UIcon v-if="colorMode.preference === 'dark'" name="i-heroicons-moon" class="w-5 h-5" />
          <UIcon v-else-if="colorMode.preference === 'doux'" name="i-heroicons-sparkles" class="w-5 h-5" />
          <UIcon v-else name="i-heroicons-sun" class="w-5 h-5" />
        </button>

        <!-- Lang Toggle -->
        <UButton
          :label="currentLang"
          variant="ghost"
          color="[#121212]"
          class="p-0 hover:bg-transparent u-h4 font-medium transition-all hover:text-black dark:hover:text-gray-300 dark:text-white hover:font-extrabold"
          @click="toggleLang"
        />

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
              class="header-search-input dark:text-white"
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
            class="absolute top-full mt-2 right-0 w-64 glass-fluted bg-white/70 dark:bg-[#121212]/70 border border-gray-100 dark:border-gray-800 shadow-xl z-[100] max-h-80 overflow-y-auto"
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
          </div>        
        </div>
      </div>

      <!-- Mobile Toggle Button -->
      <div class="md:hidden flex items-center gap-2">
        <button 
          @click="cycleTheme" 
          class="p-1 text-[#121212] dark:text-white"
        >
          <UIcon v-if="colorMode.preference === 'dark'" name="i-heroicons-moon" class="w-5 h-5" />
          <UIcon v-else-if="colorMode.preference === 'doux'" name="i-heroicons-sparkles" class="w-5 h-5" />
          <UIcon v-else name="i-heroicons-sun" class="w-5 h-5" />
        </button>
        <UButton
          :label="currentLang"
          variant="ghost"
          color="[#121212]"
          class="p-1 hover:bg-transparent u-h4 font-medium transition-all dark:text-white"
          @click="toggleLang"
        />
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
      <div v-if="isMenuOpen" class="md:hidden fixed inset-0 h-screen w-screen glass-fluted bg-white dark:bg-[#121212] z-50 flex flex-col items-end justify-start pt-24 px-6 space-y-4">
        <!-- Search Bar (Mobile) -->
        <div class="w-full max-w-xs mb-8">
          <UInput 
            v-model="searchTerm" 
            placeholder="Rechercher..." 
            icon="i-heroicons-magnifying-glass-20-solid" 
            class="header-search-input"
            color="[#121212]"
            variant="none"
            size="lg"
          />
        </div>

        <nav class="flex flex-col items-end space-y-4 w-full">
          <NuxtLink 
            v-for="link in links" 
            :key="link.to" 
            :to="link.to"
            class="u-h2 text-[24px] text-[#121212] dark:text-white mobile-link px-4 py-2 border border-[#121212]/10 dark:border-white/10 w-fit"
            @click="handleLinkClick(link.label); isMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed, onUnmounted } from 'vue';
import { UInput } from '#components';
import { useHoverProject } from '~/composables/useHoverProject';

const colorMode = useColorMode();
const cycleTheme = () => {
  const modes = ['light', 'dark', 'doux'];
  const currentIndex = modes.indexOf(colorMode.preference);
  const nextIndex = (currentIndex + 1) % modes.length;
  colorMode.preference = modes[nextIndex];
};

const themeTitle = computed(() => {
  if (colorMode.preference === 'light') return 'Passer au mode sombre';
  if (colorMode.preference === 'dark') return 'Passer au mode doux';
  return 'Passer au mode clair';
});

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
  if (import.meta.client) {
    document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
  }
};

watch(isMenuOpen, (newValue) => {
  if (import.meta.client) {
    document.body.style.overflow = newValue ? 'hidden' : '';
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = '';
  }
});

const links = [
  { label: 'Projets', to: '/projects' },
  { label: 'Corpus', to: '/corpus' },
  { label: 'Art', to: '/art' }
];
</script>

<style scoped>
@reference "../assets/css/main.css";

.router-link-active:not(.logo-link) {
  @apply text-black dark:text-white opacity-100;
}

.doux .router-link-active:not(.logo-link) {
  color: #4A4443;
}

.logo-link.router-link-active {
  @apply text-[#121212] dark:text-white;
}

.doux .logo-link {
  color: #4A4443;
}

.doux .mobile-link {
  color: #4A4443 !important;
}

.header-search-input .icon {
  width: 21px;
  height: 21px;
}
</style>
