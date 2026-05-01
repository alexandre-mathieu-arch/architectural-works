<template>
  <div class="pt-8 pb-40 relative">
    <div v-if="filteredArt?.length" class="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-y-48 gap-x-4 md:gap-x-12">
      
      <div 
        v-for="(item, index) in filteredArt" 
        :key="item.path"
        class="flex flex-col group transition-all duration-1000 ease-curtain"
        :class="getItemLayout(index)"
      >
        <div 
          class="relative overflow-hidden cursor-zoom-in bg-gray-50 dark:bg-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-700"
          @click="selectedImage = item"
        >
          <NuxtImg
            v-if="item.image"
            :src="item.image.startsWith('/') ? item.image : '/' + item.image"
            :alt="item.title"
            format="webp"
            width="1200"
            class="w-full h-auto transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
          />
          <!-- Subtle overlay for texture -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-10 dark:bg-white bg-black transition-opacity duration-700 pointer-events-none"></div>
        </div>
        
        <!-- Sober Legend -->
        <div class="mt-4 flex flex-col space-y-0.5 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          <span class="u-h4 font-medium tracking-wider text-[#121212] dark:text-white">{{ item.title }}</span>
          <p v-if="item.description" class="u-legend font-normal opacity-50 max-w-[300px] leading-tight">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-20">
      <p class="text-gray-500 italic">La section Art sera bientôt disponible...</p>
    </div>

    <!-- Exhibition Lightbox -->
    <Transition
      enter-active-class="transition duration-500 ease-curtain"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-400 ease-curtain"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="selectedImage" 
        class="fixed inset-0 z-[100] bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md flex items-center justify-center p-6 md:p-16 cursor-zoom-out"
        @click="selectedImage = null"
      >
        <div class="relative w-full h-full flex flex-col items-center justify-center">
          <NuxtImg
            :src="selectedImage.image.startsWith('/') ? selectedImage.image : '/' + selectedImage.image"
            :alt="selectedImage.title"
            format="webp"
            width="2400"
            class="max-w-full max-h-[85vh] object-contain shadow-2xl"
          />
          
          <div class="mt-12 text-center max-w-2xl">
            <h3 class="u-h2 uppercase tracking-[0.4em] mb-4">{{ selectedImage.title }}</h3>
            <p v-if="selectedImage.description" class="u-body italic opacity-70">
              {{ selectedImage.description }}
            </p>
          </div>
        </div>
        
        <!-- Close button (minimal) -->
        <button class="absolute top-8 right-8 u-h4 opacity-40 hover:opacity-100 transition-opacity">FERMER</button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const selectedImage = ref<any>(null)

const { data: artItems } = await useAsyncData('art-content', () => {
  return queryCollection('content')
    .all()
})

const filteredArt = computed(() => {
  if (!artItems.value) return []
  return artItems.value.filter(item => item.path.startsWith('/art/'))
})

// Logic to create a "Studio Wall" rhythm
const getItemLayout = (index: number) => {
  const layouts = [
    'md:col-span-8 md:col-start-1',
    'md:col-span-5 md:col-start-8 md:-mt-24',
    'md:col-span-6 md:col-start-3 md:mt-12',
    'md:col-span-4 md:col-start-1 md:-mt-16',
    'md:col-span-7 md:col-start-6',
    'md:col-span-5 md:col-start-2 md:-mt-32',
    'md:col-span-4 md:col-start-8 md:mt-8',
    'md:col-span-9 md:col-start-4 md:-mt-12',
    'md:col-span-5 md:col-start-1 md:mt-16',
    'md:col-span-6 md:col-start-7 md:-mt-20'
  ]
  return layouts[index % layouts.length]
}

definePageMeta({
  layout: 'default',
  displayTitle: 'Art'
})

useHead({
  title: 'Art — Alexandre Mathieu'
})

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') selectedImage.value = null
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Optional: specific styles for the studio wall if needed */
</style>
