<template>
  <div class="pt-0 pb-12">
    <!-- Triggers for Agence section -->
    <div class="sticky top-[var(--header-height)] z-40 bg-[#FFFFFF] pt-2 pb-2 -mt-[5px]">
      <div 
        class="flex flex-nowrap md:overflow-visible relative w-full md:w-[calc((100%-32px)/2)] xl:w-[calc((100%-96px)/4)] overflow-x-auto scrollbar-hide"
        style="view-transition-name: page-triggers;"
      >
        <NuxtLink 
          to="/agence/pratique" 
          class="flex-shrink-0 flex-auto flex items-center justify-between gap-1 u-h4 transition-all duration-300 px-2 sm:px-3 h-[30px] border border-[#121212]/30 -ml-[1px] -mt-[1px] text-[#121212] hover:border-indigo-500 hover:text-indigo-500"
        >
          <span>Pratique</span>
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 flex-shrink-0">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        </NuxtLink>
        <NuxtLink 
          to="/agence/equipes" 
          class="flex-shrink-0 flex-auto flex items-center justify-between gap-1 u-h4 transition-all duration-300 px-2 sm:px-3 h-[30px] border border-[#121212]/30 -ml-[1px] -mt-[1px] text-[#121212] hover:border-indigo-500 hover:text-indigo-500"
        >
          <span>Équipes</span>
          <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 flex-shrink-0">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        </NuxtLink>
      </div>
    </div>

    <div v-if="page" class="prose dark:prose-invert max-w-none mt-12 w-full md:w-[calc((100%-32px)/2)] xl:w-[calc((100%-96px)/4)]">
      <div class="mb-12">
        <ContentRenderer :value="page" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('agence-index', () => {
  return queryCollection('content').path('/agence').first()
})

definePageMeta({
  layout: 'default',
  title: "Studio Soñj" // Title for the PageTitle component
})
</script>

<style scoped>
@reference "../../assets/css/main.css";
</style>
