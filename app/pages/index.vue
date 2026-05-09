<template>
  <div 
    class="-mx-[var(--main-padding)] -mt-[var(--header-height)] flex flex-col md:flex-row bg-white dark:bg-[#121212] transition-colors duration-700 overflow-hidden h-screen"
    style="view-transition-name: projects-grid;"
  >
    <!-- Architecture Side -->
    <NuxtLink 
      to="/architecture"
      class="flex-1 relative group overflow-hidden border-b md:border-b-0 md:border-r border-[#121212]/5 dark:border-white/5 transition-all duration-1000 hover:flex-[1.1] hover:bg-[#121212] dark:hover:bg-white doux:hover:bg-[#4A4443] nuit:hover:bg-[#CDD6F4]"
    >
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="flex flex-col items-center space-y-8 px-4 text-center">
          <span class="u-h1 !font-normal !text-[42px] md:!text-[65px] lg:!text-[80px] !text-[#121212] dark:!text-white doux:!text-[#4A4443] nuit:!text-[#CDD6F4] group-hover:!text-white dark:group-hover:!text-[#121212] doux:group-hover:!text-[#E5E1E0] nuit:group-hover:!text-[#1A2238] opacity-10 group-hover:opacity-100 transition-all duration-1000 scale-95 group-hover:scale-100 uppercase !tracking-[0.3em] !webkit-text-stroke-0">
            Architecture
          </span>
          <div class="h-px w-0 group-hover:w-24 bg-[#121212]/20 dark:bg-white/20 group-hover:bg-white dark:group-hover:bg-[#121212] doux:group-hover:bg-[#E5E1E0] nuit:group-hover:bg-[#1A2238] transition-all duration-1000"></div>
          <span class="u-h4 opacity-0 group-hover:opacity-40 transition-all duration-1000 translate-y-4 group-hover:translate-y-0 !tracking-[0.2em] text-[12px] md:text-[14px] group-hover:text-white dark:group-hover:text-[#121212] doux:group-hover:text-[#E5E1E0] nuit:group-hover:text-[#1A2238]">
            Explorer les projets
          </span>
        </div>
      </div>
    </NuxtLink>

    <!-- Design Side -->
    <NuxtLink 
      to="/design"
      class="flex-1 relative group overflow-hidden transition-all duration-1000 hover:flex-[1.1] hover:bg-[#121212] dark:hover:bg-white doux:hover:bg-[#4A4443] nuit:hover:bg-[#CDD6F4]"
    >
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="flex flex-col items-center space-y-8 px-4 text-center">
          <span class="u-h1 !font-normal !text-[42px] md:!text-[65px] lg:!text-[80px] !text-[#121212] dark:!text-white doux:!text-[#4A4443] nuit:!text-[#CDD6F4] group-hover:!text-white dark:group-hover:!text-[#121212] doux:group-hover:!text-[#E5E1E0] nuit:group-hover:!text-[#1A2238] opacity-10 group-hover:opacity-100 transition-all duration-1000 scale-95 group-hover:scale-100 uppercase !tracking-[0.3em] !webkit-text-stroke-0">
            Design
          </span>
          <div class="h-px w-0 group-hover:w-24 bg-[#121212]/20 dark:bg-white/20 group-hover:bg-white dark:group-hover:bg-[#121212] doux:group-hover:bg-[#E5E1E0] nuit:group-hover:bg-[#1A2238] transition-all duration-1000"></div>
          <span class="u-h4 opacity-0 group-hover:opacity-40 transition-all duration-1000 translate-y-4 group-hover:translate-y-0 !tracking-[0.2em] text-[12px] md:text-[14px] group-hover:text-white dark:group-hover:text-[#121212] doux:group-hover:text-[#E5E1E0] nuit:group-hover:text-[#1A2238]">
            Objets & Mobilier
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home',
  hideHeader: true,
  hideLayoutTitle: true,
  colorMode: 'nuit'
})

useHead({
  title: 'Alexandre Mathieu — architecture & design'
})
</script>

<style scoped>
/* Page transition logic is already in main.css via Nuxt config */
</style>
