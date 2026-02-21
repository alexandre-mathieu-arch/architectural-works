<template>
  <UHeader 
    class="bg-white backdrop-blur-none border-none shadow-none"
    :ui="{
      wrapper: 'bg-white relative z-50 border-none shadow-none',
      container: 'main-container',
      // Removed button: { base: 'hidden' } to let UHeader handle responsive toggle
    }"
    :toggle="true"
  >
    <template #logo></template>

    <div class="flex justify-center items-center h-[var(--header-height)] w-full">
      <nav class="flex items-center gap-[50px]">
        <NuxtLink 
          to="/" 
          class="font-bold text-[21px] tracking-tighter text-black uppercase whitespace-nowrap u-header-link"
          @click="handleLinkClick('ATELIER')"
          @mouseenter="emit('linkHover', 'ATELIER')"
          @mouseleave="emit('linkHover', '')"
        >
          ATELIER
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
          color="black"
          class="font-medium p-0 hover:bg-transparent text-[21px] uppercase tracking-wide u-header-link"
          style="font-family: var(--font-dm-sans);"
          @click="toggleLang"
          @mouseenter="emit('linkHover', 'Langue')"
          @mouseleave="emit('linkHover', '')"
        />
      </nav>
    </div>
  </UHeader>
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
  label: 'PROJETS',
  to: '/projects'
}, {
  label: 'CORPUS',
  to: '/corpus'
}, {
  label: 'ART',
  to: '/art'
}]
</script>

<style scoped>
@reference "../assets/css/main.css";

.u-header-link {
  @apply font-medium text-black hover:text-gray-600 uppercase tracking-wide text-[21px] transition-colors;
  font-family: var(--font-dm-sans);
}

.router-link-active {
  @apply text-gray-400;
}
</style>
