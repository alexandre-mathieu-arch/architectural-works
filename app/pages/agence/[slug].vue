<template>
  <div v-if="page" class="pt-0 pb-12">
    <!-- Triggers for Agence section -->
    <div class="flex flex-nowrap md:overflow-visible relative z-40 w-full md:w-[calc((100%-4px)/2)] xl:w-[calc((100%-8px)/3)] overflow-x-auto scrollbar-hide mt-[5px]">
      <NuxtLink 
        to="/agence/pratique" 
        class="flex-shrink-0 flex-auto flex items-center justify-between gap-1 u-h4 transition-all duration-300 px-2 sm:px-3 h-[30px] border border-[#121212]/30 -ml-[1px] -mt-[1px] text-[#121212] hover:border-indigo-500 hover:text-indigo-500"
        active-class="!text-indigo-500 !border-indigo-500 z-50"
      >
        <span>Pratique</span>
        <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 flex-shrink-0">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </NuxtLink>
      <NuxtLink 
        to="/agence/equipes" 
        class="flex-shrink-0 flex-auto flex items-center justify-between gap-1 u-h4 transition-all duration-300 px-2 sm:px-3 h-[30px] border border-[#121212]/30 -ml-[1px] -mt-[1px] text-[#121212] hover:border-indigo-500 hover:text-indigo-500"
        active-class="!text-indigo-500 !border-indigo-500 z-50"
      >
        <span>Équipes</span>
        <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 flex-shrink-0">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </NuxtLink>
    </div>

    <div class="mt-12 prose dark:prose-invert max-w-none">
      <ContentRenderer :value="page" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Query the 'content' collection for the page matching the current path
const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

definePageMeta({
  layout: 'default'
})

// Update route meta title for PageTitle component
watchEffect(() => {
  if (page.value) {
    route.meta.dynamicTitle = page.value.title;
  }
});
</script>

<style scoped>
@reference "../../assets/css/main.css";
</style>
