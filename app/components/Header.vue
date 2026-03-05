<template>
  <header class="fixed top-0 left-0 right-0 z-50">
    <div class="main-container h-[var(--header-height)] flex items-center gap-[20px] px-[var(--main-padding)]">
      <!-- Logo -->
      <NuxtLink 
        to="/agence" 
        class="text-[#121212] whitespace-nowrap u-h4"
        @click="handleLinkClick('Studio Soñj')"
        @mouseenter="emit('linkHover', 'Studio Soñj')"
        @mouseleave="emit('linkHover', '')"
      >
        Soñj
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-[50px] ml-10">
        <NuxtLink 
          v-for="link in links" 
          :key="link.to" 
          :to="link.to"
          class="u-h4 font-medium transition-colors hover:text-gray-600 text-[#121212]"
          :class="{ 'text-gray-600': activeLink === link.label }"
          @click="handleLinkClick(link.label)"
          @mouseenter="emit('linkHover', link.label)"
          @mouseleave="emit('linkHover', '')"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      
      <!-- Large Space -->
      <div class="flex-grow"></div>

      <!-- Desktop Search Bar & Lang Toggle -->
      <div class="hidden md:flex items-center gap-[50px]">
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
              class="w-full header-search-input"
              color="[#121212]"
              variant="none"
              size="md"
              @blur="handleSearchBlur"
            />
          </div>
          <button 
            v-if="!isSearchExpanded"
            @click="isSearchExpanded = true"
            class="p-1 text-[#121212] hover:text-gray-600 transition-colors flex items-center justify-center"
          >
            <UIcon name="i-heroicons-magnifying-glass-20-solid" class="w-5 h-5" />
          </button>

          <!-- Search Results Dropdown -->
          <div 
            v-if="isSearchExpanded && searchTerm && searchResults.length > 0" 
            class="absolute top-full mt-2 right-0 w-64 bg-white border border-gray-100 shadow-xl z-[100] max-h-80 overflow-y-auto"
          >
            <NuxtLink 
              v-for="result in searchResults" 
              :key="result.path" 
              :to="result.path"
              class="block px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 group"
              @click="clearSearch"
            >
              <div class="text-[12px] font-bold text-[#121212] tracking-wider group-hover:text-gray-600 transition-colors">{{ result.title }}</div>
              <div v-if="result.description" class="text-[10px] text-gray-400 mt-1 line-clamp-1">{{ result.description }}</div>
            </NuxtLink>
            </div>
            <div 
            v-else-if="isSearchExpanded && searchTerm && !isSearching" 
            class="absolute top-full mt-2 right-0 w-64 bg-white border border-gray-100 p-4 shadow-xl z-[100] text-[10px] text-gray-400 tracking-widest text-center"
            >
            Aucun résultat
            </div>        </div>

        <UButton
          :label="currentLang"
          variant="ghost"
          color="[#121212]"
          class="p-0 hover:bg-transparent u-h4 font-medium transition-colors hover:text-gray-600 mr-[-16px]"
          @click="toggleLang"
          @mouseenter="emit('linkHover', 'Langue')"
          @mouseleave="emit('linkHover', '')"
        />
      </div>

      <!-- Mobile Toggle Button -->
      <button 
        @click="toggleMenu" 
        class="md:hidden p-2 rounded-md text-[#121212] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path :class="{ 'hidden': isMenuOpen, 'block': !isMenuOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path :class="{ 'hidden': !isMenuOpen, 'block': isMenuOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Mobile Navigation Overlay -->
      <div v-if="isMenuOpen" class="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8">
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
          class="u-h4 font-bold text-[30px]"
          :class="{ 'text-gray-600': activeLink === link.label }"
          @click="handleLinkClick(link.label); isMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>

        <UButton
          :label="currentLang"
          variant="ghost"
          color="[#121212]"
          class="p-0 hover:bg-transparent u-h4 font-bold text-[30px]"
          @click="toggleLang"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import { UInput } from '#components'; // Import UInput

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
    .select('path', 'title', 'description')
    .where('draft', '<>', true)
    .all()
);

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

.router-link-active {
  @apply text-[#121212] font-bold opacity-100;
}

.router-link-active::before {
  content: "~";
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  color: #121212;
  font-size: 14px;
}

.header-search-input .icon {
  width: 21px;
  height: 21px;
}
</style>