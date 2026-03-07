import { ref, computed } from 'vue';

interface ProjectHoverData {
  title: string;
  typologies?: string[];
  tailles?: string[];
  date?: string | number | Date;
  pays?: string[];
}

const hoveredProject = ref<ProjectHoverData | null>(null);

export const useHoverProject = () => {
  const setHoveredProject = (project: ProjectHoverData | null) => {
    hoveredProject.value = project;
  };

  const hoveredProjectTitle = computed(() => hoveredProject.value?.title || null);

  return {
    hoveredProject,
    hoveredProjectTitle,
    setHoveredProject,
  };
};
