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
        </div>
      </template>
    </PageTitle>

    <!-- Content: Integrated desktop grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-4 -mt-[10px]">
      <!-- Column 1: Equipe -->
      <div class="opacity-100">
        <div v-if="equipe" class="prose dark:prose-invert max-w-none pb-4">
          <ContentRenderer :value="equipe" />
        </div>
        <!-- Portrait positioned below Download links with a subtle zoom -->
        <div class="mt-4 overflow-hidden w-full aspect-[4/5]">
          <NuxtImg 
            src="/profil.jpg" 
            alt="Alexandre Mathieu" 
            class="w-full h-full object-cover scale-125 origin-center"
          />
        </div>
      </div>

      <!-- Column 2: Pratique -->
      <div class="opacity-100">
        <div v-if="pratique" class="prose dark:prose-invert max-w-none pb-4">
          <ContentRenderer :value="pratique" />
        </div>
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
