<template>
  <div class="pt-0 pb-6">
    <PageTitle title="À propos" :hide-main-title="true">
      <template #triggers>
        <div 
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8"
          style="view-transition-name: page-triggers;"
        >
          <div 
            class="flex items-center justify-between gap-1 u-h4 px-3 h-[30px] border border-primary-900 text-primary-900 bg-transparent w-full"
          >
            <span>Parcours</span>
          </div>
          <div 
            class="flex items-center justify-between gap-1 u-h4 px-3 h-[30px] border border-primary-900 text-primary-900 bg-transparent w-full"
          >
            <span>Pratique</span>
          </div>
          <div 
            class="flex items-center justify-between gap-1 u-h4 px-3 h-[30px] border border-primary-900 text-primary-900 bg-transparent w-full"
          >
            <span>Portrait</span>
          </div>
          <div 
            class="flex items-center justify-between gap-1 u-h4 px-3 h-[30px] border border-primary-900 text-primary-900 bg-transparent w-full"
          >
            <span>Documents</span>
          </div>
        </div>
      </template>
    </PageTitle>

    <!-- Content: Integrated desktop grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-4 -mt-[10px] items-start">
      <!-- Column 1: Equipe -->
      <div class="opacity-100 pt-0">
        <div v-if="equipe" class="prose dark:prose-invert max-w-none pb-4">
          <ContentRenderer :value="equipe" />
        </div>
      </div>

      <!-- Column 2: Pratique -->
      <div class="opacity-100 md:mt-[30vh] xl:mt-[50vh]">
        <div v-if="pratique" class="prose dark:prose-invert max-w-none pb-4">
          <ContentRenderer :value="pratique" />
        </div>
      </div>

      <!-- Column 3: Portrait -->
      <div class="opacity-100 sticky top-24">
        <div class="overflow-hidden w-full aspect-[4/5]">
          <NuxtImg 
            src="/profil.jpg" 
            alt="Alexandre Mathieu" 
            class="w-full h-full object-cover scale-125 origin-center"
          />
        </div>
      </div>

      <!-- Column 4: Download CV -->
      <div class="opacity-100 flex flex-col items-start gap-y-4 md:mt-[30vh] xl:mt-[80vh]">
        <a 
          href="/cv-alexandre-mathieu-fr.pdf" 
          target="_blank" 
          download 
          class="inline-flex items-center gap-2 px-0 py-1 u-h4 hover:text-black dark:hover:text-white transition-all duration-300 no-underline group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mb-[2px] opacity-30 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span class="whitespace-nowrap">Télécharger le CV (FR)</span>
        </a>
        <a 
          href="/cv-alexandre-mathieu-en.pdf" 
          target="_blank" 
          download 
          class="inline-flex items-center gap-2 px-0 py-1 u-h4 hover:text-black dark:hover:text-white transition-all duration-300 no-underline group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mb-[2px] opacity-30 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span class="whitespace-nowrap">Download CV (EN)</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from '~/components/PageTitle.vue'

const { data: pratique } = await useAsyncData('about-pratique', () => {
  return queryCollection('content').path('/about/pratique').first()
})

const { data: equipe } = await useAsyncData('about-equipe', () => {
  return queryCollection('content').path('/about/equipe').first()
})

definePageMeta({
  layout: 'default',
  displayTitle: "À propos",
  hideLayoutTitle: true
})

useHead({
  title: 'À propos — Alexandre Mathieu'
})
</script>

<style scoped>
@reference "../assets/css/main.css";
</style>
