<template>
  <div id="wrapper">
    <Header @linkClick="handleLinkClick" @linkHover="handleLinkHover" />
    
    <!-- Content -->
    <div class="min-h-screen">
      <main class="pb-12 main-container" :style="{ paddingTop: 'var(--header-height)' }">
        <PageTitle 
          v-if="!route.meta.hideLayoutTitle"
          :title="pageTitle" 
          :show-filters="route.meta.showFilters === true" 
          :readonly-filters="route.meta.readonlyFilters === true"
          :hide-main-title="route.path.startsWith('/projects/')"
        />
        <slot />
      </main>
      <TheFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useProjectFilters } from '~/composables/useProjectFilters';
import { useHoverProject } from '~/composables/useHoverProject';
import { useVisitedProjects } from '~/composables/useVisitedProjects';
import { useRevealedState } from '~/composables/useRevealedState';

const route = useRoute();
const { resetFilters } = useProjectFilters();
const { setHoveredProject } = useHoverProject();
const { reveal } = useRevealedState();
const hoveredTitle = ref<string | object>('');
const clickedTitle = ref<string | object>(''); 

onMounted(() => {
  reveal();
});

// Smart Reset: Clear filters if navigating away from projects section
watch(() => route.path, (newPath, oldPath) => {
  const projectRoutes = ['/architecture', '/design', '/projects'];
  const isFromProjects = projectRoutes.some(r => oldPath?.startsWith(r)) || oldPath === '/';
  const isToProjects = projectRoutes.some(r => newPath.startsWith(r)) || newPath === '/';
  
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
  
  if (route.meta.displayTitle) {
    return route.meta.displayTitle;
  }
  return '';
});

// Alias for PageTitle component prop
const pageTitle = displayedTitle;
</script>