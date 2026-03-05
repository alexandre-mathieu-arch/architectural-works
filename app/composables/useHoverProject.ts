import { ref } from 'vue';

const hoveredProjectTitle = ref<string | null>(null);

export const useHoverProject = () => {
  const setHoveredProject = (title: string | null) => {
    hoveredProjectTitle.value = title;
  };

  return {
    hoveredProjectTitle,
    setHoveredProject,
  };
};
