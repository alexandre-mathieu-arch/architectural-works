import { ref, computed } from 'vue';

const currentImageIndex = ref(0);
const totalImages = ref(0);

export function useCarouselState() {
  const setCurrentImageIndex = (index: number) => {
    currentImageIndex.value = index;
  };

  const setTotalImages = (total: number) => {
    totalImages.value = total;
  };

  return {
    currentImageIndex: computed(() => currentImageIndex.value),
    totalImages: computed(() => totalImages.value),
    setCurrentImageIndex,
    setTotalImages,
  };
}