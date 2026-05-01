import { ref, onMounted, onUnmounted } from 'vue'

export const useParallax = (intensity = 15) => {
  const scrollY = ref(0)
  const windowHeight = ref(0)

  const updateScroll = () => {
    scrollY.value = window.scrollY
  }

  const updateDimensions = () => {
    windowHeight.value = window.innerHeight
  }

  onMounted(() => {
    updateDimensions()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateDimensions)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
    window.removeEventListener('resize', updateDimensions)
  })

  const getParallaxStyle = (el: any) => {
    if (!process.client || typeof window === 'undefined' || !el) return {}
    
    // Handle Vue component refs or raw elements
    const element = el.$el || el
    
    if (!element || typeof element.getBoundingClientRect !== 'function') return {}

    const rect = element.getBoundingClientRect()
    const elementCenter = rect.top + rect.height / 2
    const viewportCenter = windowHeight.value / 2
    
    // Calculate distance from center of viewport (-1 to 1)
    const distanceFromCenter = (elementCenter - viewportCenter) / (windowHeight.value / 2)
    
    // Clamp values to prevent excessive motion
    const clampedDistance = Math.max(-1, Math.min(1, distanceFromCenter))
    
    const translateY = clampedDistance * intensity

    return {
      transform: `translateY(${translateY}px)`,
      transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
    }
  }

  return {
    getParallaxStyle
  }
}
