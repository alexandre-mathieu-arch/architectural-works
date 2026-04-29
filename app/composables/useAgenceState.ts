import { ref } from 'vue'

const activeSections = ref<Set<string>>(new Set(['equipe', 'pratique']))

export const useAgenceState = () => {
  const toggleSection = (slug: string) => {
    if (activeSections.value.has(slug)) {
      activeSections.value.delete(slug)
    } else {
      activeSections.value.add(slug)
    }
    // Trigger reactivity for Set
    activeSections.value = new Set(activeSections.value)
  }

  const isSectionActive = (slug: string) => {
    return activeSections.value.has(slug)
  }

  return {
    activeSections,
    toggleSection,
    isSectionActive
  }
}
