<template>
  <header class="bg-[rgb(248,248,248)] fixed top-0 left-0 right-0 z-50">
    <div class="main-container">
      <div class="flex justify-center items-center h-[var(--header-height)] w-full">
        <nav class="flex items-center gap-[50px]">
          <NuxtLink 
            to="/" 
            class="font-bold text-[21px] tracking-tighter text-[#121212] whitespace-nowrap u-header-link"
            @click="handleLinkClick('Home')"
            @mouseenter="emit('linkHover', 'Home')"
            @mouseleave="emit('linkHover', '')"
          >
            Home
          </NuxtLink>

          <NuxtLink 
            to="/agence" 
            class="font-bold text-[21px] tracking-tighter text-[#121212] whitespace-nowrap u-header-link"
            @click="handleLinkClick('Atelier')"
            @mouseenter="emit('linkHover', 'Atelier')"
            @mouseleave="emit('linkHover', '')"
          >
            Atelier
          </NuxtLink>

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

          <UButton
            :label="currentLang"
            variant="ghost"
            color="[#121212]"
            class="font-medium p-0 hover:bg-transparent text-[21px] tracking-wide u-header-link"
            style="font-family: var(--font-dm-sans);"
            @click="toggleLang"
            @mouseenter="emit('linkHover', 'Langue')"
            @mouseleave="emit('linkHover', '')"
          />
        </nav>
      </div>
    </div>
    <!-- Note: The hamburger menu functionality from UHeader is now removed.
         It would need to be re-implemented manually if required for mobile. -->
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['linkClick', 'linkHover']);

const activeLink = ref('');
const currentLang = ref('EN');

const handleLinkClick = (label: string) => {
  activeLink.value = label;
  emit('linkClick', label);
};

const toggleLang = () => {
  currentLang.value = currentLang.value === 'EN' ? 'FR' : 'EN';
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

.u-header-link {
  @apply font-medium text-[#121212] hover:text-gray-600 tracking-wide text-[21px] transition-colors;
  font-family: var(--font-dm-sans);
}

.router-link-active {
  @apply text-gray-400;
}
</style>
