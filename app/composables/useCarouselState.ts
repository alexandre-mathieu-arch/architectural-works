import { computed } from 'vue';
import { useState } from '#app';

export function useCarouselState() {
  const currentImageIndex = useState<number>('carousel-current-index', () => 0);
  const totalImages = useState<number>('carousel-total-images', () => 0);

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