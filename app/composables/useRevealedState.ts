import { useState } from '#app';

export const useRevealedState = () => {
  const isRevealed = useState<boolean>('is-revealed', () => false);

  const reveal = () => {
    isRevealed.value = true;
  };

  const resetReveal = () => {
    isRevealed.value = false;
  };

  return {
    isRevealed,
    reveal,
    resetReveal
  };
};
