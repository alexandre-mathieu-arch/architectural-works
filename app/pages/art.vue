<template>
  <div class="pt-0 pb-6 relative">
    <div v-if="filteredArt?.length" class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      <div class="col-span-full u-h4 text-gray-400 mb-4">
        {{ filteredArt.length }} œuvres chargées
      </div>
      <div 
        v-for="item in filteredArt" 
        :key="item.path"
        class="break-inside-avoid relative group overflow-hidden border border-[#121212]/10 cursor-zoom-in"
        @click="selectedImage = item"
      >
        <NuxtImg
          v-if="item.image"
          :src="item.image.startsWith('/') ? item.image : '/' + item.image"
          :alt="item.title"
          format="webp"
          width="600"
          height="800"
          class="w-full h-auto transition-all duration-700 group-hover:scale-105"
        />
        
        <!-- Hover Info Overlay -->
        <div class="absolute top-0 left-0 w-full px-2 h-[30px] flex items-center bg-[#FFFFFF] border-b border-[#121212]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span class="u-h4 font-bold truncate">{{ item.title }}</span>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-20">
      <p class="text-gray-500 italic">La section Art sera bientôt disponible...</p>
    </div>

    <!-- Lightbox / Zoom Overlay -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="selectedImage" 
        class="fixed inset-0 z-[100] bg-[#FFFFFF]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
        @click="selectedImage = null"
      >
        <div class="relative max-w-full max-h-full flex flex-col items-center">
          <NuxtImg
            :src="selectedImage.image.startsWith('/') ? selectedImage.image : '/' + selectedImage.image"
            :alt="selectedImage.title"
            format="webp"
            width="1600"
            height="1200"
            class="max-w-full max-h-[85vh] object-contain shadow-2xl border border-[#121212]/10"
          />
          <div class="mt-6 text-center">
            <h3 class="u-h3 mb-1">{{ selectedImage.title }}</h3>
            <button class="u-h4 uppercase tracking-widest text-[#121212]/40 hover:text-[#121212] transition-colors">
              [fermer]
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const selectedImage = ref<any>(null)

const staticArtItems = [
  { title: 'Cité de la voile', image: '/images/art/cite-de-la-voile.jpg', path: 'cite-de-la-voile' },
  { title: 'Faucon', image: '/images/art/faucon-pastels-seche.jpg', path: 'faucon' },
  { title: 'Lac de Garde', image: '/images/art/lac-de-garde.jpg', path: 'lac-de-garde' },
  { title: 'Laverie 23h', image: '/images/art/laverie-23h-encre.jpg', path: 'laverie-23h' },
  { title: 'Nu de Dos', image: '/images/art/nu-dos-pastel-seche.jpg', path: 'nu-de-dos' },
  { title: 'Rough Nature morte', image: '/images/art/rough-nature-morte-ail-rose.jpg', path: 'rough-nature-morte' },
  { title: 'Surf à Uluwatu', image: '/images/art/surf-uluwatu.jpg', path: 'surf-uluwatu' },
  { title: 'Vague', image: '/images/art/vague.jpg', path: 'vague' },
  { title: 'Drapé 01', image: '/images/art/drape.jpg', path: 'drape' },
  { title: 'Drapé 02', image: '/images/art/drape02.jpg', path: 'drape02' },
  { title: 'Nu au graphite', image: '/images/art/nu-graphite.jpg', path: 'nu-graphite' }
]

const { data: artItems } = await useAsyncData('art-content', () => {
  return queryCollection('content')
    .all()
})

const filteredArt = computed(() => {
  // If content query returns nothing, use static fallback
  if (!artItems.value || artItems.value.length === 0) return staticArtItems
  
  const fromContent = artItems.value.filter(item => item.path.startsWith('/art/'))
  return fromContent.length > 0 ? fromContent : staticArtItems
})

definePageMeta({
  layout: 'default',
  title: 'Art'
})

// Keyboard navigation for closing lightbox
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
@reference "../assets/css/main.css";

/* Avoid layout jumps when images load in masonry */
.columns-1 img {
  display: block;
}
</style>
