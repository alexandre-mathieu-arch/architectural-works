<template>
  <div id="wrapper">
    <Header @linkClick="handleLinkClick" @linkHover="handleLinkHover" />
    <div :style="{ paddingTop: 'var(--header-height)' }">
      <main class="main-container pb-12">
        <PageTitle 
          v-if="!route.meta.hideLayoutTitle"
          :title="pageTitle" 
          :show-filters="route.meta.showFilters === true" 
          :readonly-filters="route.meta.readonlyFilters === true"
          :hide-main-title="route.path.startsWith('/projects/')"
        />
        <slot />
      </main>
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Header from '~/components/Header.vue';
import PageTitle from '~/components/PageTitle.vue';
import { useProjectFilters } from '~/composables/useProjectFilters';
import { useHoverProject } from '~/composables/useHoverProject';
import { useVisitedProjects } from '~/composables/useVisitedProjects';

const route = useRoute();
const { resetFilters } = useProjectFilters();
const { setHoveredProject } = useHoverProject();
const hoveredTitle = ref<string | object>('');
const clickedTitle = ref<string | object>(''); 

// Smart Reset: Clear filters if navigating away from projects section
watch(() => route.path, (newPath, oldPath) => {
  const isFromProjects = oldPath?.startsWith('/projects') || oldPath === '/';
  const isToProjects = newPath.startsWith('/projects');
  
  if (isFromProjects && !isToProjects) {
    resetFilters();
    setHoveredProject(null);
  }
});

watch(() => route.fullPath, () => {
  clickedTitle.value = '';
  hoveredTitle.value = '';
}, { immediate: true }); 

const handleLinkClick = (title: string) => {
  clickedTitle.value = title;
  hoveredTitle.value = title;
};

const handleLinkHover = (title: string) => {
  hoveredTitle.value = title;
};

const displayedTitle = computed(() => {
  // Priority: hover > click > dynamic project title > static Projets for grid
  if (hoveredTitle.value) {
    return hoveredTitle.value;
  }
  if (clickedTitle.value) {
    return clickedTitle.value;
  }
  
  // For project detail pages, show the project title
  if (route.path.startsWith('/projects/') && route.meta.dynamicTitle) {
    return route.meta.dynamicTitle;
  }
  
  // For the projects grid or any projects page
  if (route.path.startsWith('/projects')) {
    return 'Projets';
  }
  
  if (route.meta.title) {
    return route.meta.title;
  }
  return '';
});

// Alias for PageTitle component prop
const pageTitle = displayedTitle;
</script>