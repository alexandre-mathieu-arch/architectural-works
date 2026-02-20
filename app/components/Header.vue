<template>
  <UHeader 
    class="bg-white backdrop-blur-none border-none shadow-none"
    :ui="{
      wrapper: 'bg-white relative z-50 border-none shadow-none',
      container: 'w-full max-w-[1160px] mx-auto flex justify-between items-center h-[var(--header-height)] border-b border-black',
      button: {
        base: 'hidden'
      }
    }"
  >
    <template #logo>
      <NuxtLink to="/" class="font-bold text-[21px] tracking-tighter text-black uppercase whitespace-nowrap" style="font-family: var(--font-dm-sans);">
        Alexandre Mathieu
      </NuxtLink>
    </template>

    <template #default>
      <nav class="hidden lg:flex items-center gap-6">
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
    </template>

    <template #right>
      <UButton
        label="EN"
        variant="ghost"
        color="black"
        class="font-medium p-0 hover:bg-transparent text-[21px] uppercase tracking-wide"
        style="font-family: var(--font-dm-sans);"
        @click="handleLinkClick('Langue')"
        @mouseenter="emit('linkHover', 'Langue')"
        @mouseleave="emit('linkHover', '')"
      />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['linkClick', 'linkHover'])

const activeLink = ref('');

const handleLinkClick = (label: string) => {
  activeLink.value = label;
  emit('linkClick', label);
};

const links = [{
  label: 'PROJETS',
  to: '/projects'
}, {
  label: 'CORPUS',
  to: '/corpus'
}, {
  label: 'ACTUALITÉS',
  to: '/news'
}, {
  label: 'AGENCE',
  to: '/agence'
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
