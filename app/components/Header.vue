<template>
  <header class="bg-[rgb(248,248,248)] fixed top-0 left-0 right-0 z-50">
    <div class="main-container h-[var(--header-height)] flex items-center gap-[20px]">
      <!-- Logo -->
      <NuxtLink 
        to="/" 
        class="font-bold text-[21px] tracking-tighter text-[#121212] whitespace-nowrap logo-link"
        @click="handleLinkClick('Home')"
        @mouseenter="emit('linkHover', 'Home')"
        @mouseleave="emit('linkHover', '')"
      >
        Mon Logo
      </NuxtLink>

      <!-- Search Bar (Desktop) -->
      <UInput 
        v-model="searchTerm" 
        placeholder="Rechercher..." 
        icon="i-heroicons-magnifying-glass-20-solid" 
        class="hidden md:block w-48 header-search-input"
        color="[#121212]"
        variant="none"
        size="md"
      />
      
      <!-- Large Space -->
      <div class="flex-grow"></div>

      <!-- Desktop Navigation & Lang Toggle -->
      <div class="hidden md:flex items-center gap-[50px]"> <!-- Wrapper for navigation and language -->
        <nav class="flex items-center gap-[50px]"> <!-- Navigation Links -->
          <NuxtLink 
            v-for="link in links" 
            :key="link.to" 
            :to="link.to"
            class="u-header-link"
            :class="{ 'text-gray-600': activeLink === link.label }"
            @click="handleLinkClick(link.label)"
            @mouseenter="emit('linkHover', link.label)"
            @mouseleave="emit('linkHover', '')"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <UButton
          :label="currentLang"
          variant="ghost"
          color="[#121212]"
          class="font-medium p-0 hover:bg-transparent text-[21px] tracking-wide u-header-link mr-[-16px]"
          style="font-family: var(--font-dm-sans);"
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
          class="u-header-link font-bold text-[30px]"
          :class="{ 'text-gray-600': activeLink === link.label }"
          @click="handleLinkClick(link.label); isMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>

        <UButton
          :label="currentLang"
          variant="ghost"
          color="[#121212]"
          class="font-medium p-0 hover:bg-transparent text-[30px] tracking-wide u-header-link"
          style="font-family: var(--font-dm-sans);"
          @click="toggleLang"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UInput } from '#components'; // Import UInput

const emit = defineEmits(['linkClick', 'linkHover']);

const activeLink = ref('');
const currentLang = ref('EN');
const isMenuOpen = ref(false); // State for mobile menu
const searchTerm = ref(''); // Reactive search term

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
  label: 'Atelier',
  to: '/agence'
}, {
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

.u-header-link {
  @apply font-medium text-[#121212] hover:text-gray-600 tracking-wide text-[21px] transition-colors;
  font-family: var(--font-dm-sans);
  letter-spacing: 0.2em;
}

.logo-link {
  letter-spacing: 0.2em;
}

.router-link-active {
  @apply text-gray-400;
}

/* Base style for main-container to handle mobile padding */
.main-container {
  padding-left: 12%; /* Set left margin to 12% */
  padding-right: 12%; /* Set right margin to 12% */
}

/* Adjust desktop navigation gap for smaller screens if needed, though Tailwind's md:gap should handle */
@media (min-width: 768px) {
  .u-header-link {
    font-size: 21px; /* Ensure desktop font size */
  }
}

.header-search-input .icon {
  width: 21px;
  height: 21px;
}
</style>