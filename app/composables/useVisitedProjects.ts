import { ref, onMounted } from 'vue'

const visitedProjects = ref<Set<string>>(new Set())

export const useVisitedProjects = () => {
  const loadVisited = () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('visited-projects')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          visitedProjects.value = new Set(parsed)
        } catch (e) {
          console.error('Failed to parse visited projects', e)
        }
      }
    }
  }

  const addVisited = (path: string) => {
    visitedProjects.value.add(path)
    if (import.meta.client) {
      localStorage.setItem('visited-projects', JSON.stringify(Array.from(visitedProjects.value)))
    }
  }

  const isVisited = (path: string) => {
    return visitedProjects.value.has(path)
  }

  // Load on initial composable call if in client
  if (import.meta.client && visitedProjects.value.size === 0) {
    loadVisited()
  }

  return {
    visitedProjects,
    addVisited,
    isVisited
  }
}
