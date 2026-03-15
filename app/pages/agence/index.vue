<template>
  <div class="pt-0 pb-12">
    <PageTitle title="Studio Soñj" class="-mt-[80px]">
      <template #triggers>
        <div 
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
          style="view-transition-name: page-triggers;"
        >
          <button 
            @click="toggleSection('equipe')" 
            class="flex items-center justify-between gap-1 u-h4 transition-all duration-300 px-2 sm:px-3 h-[30px] border border-[#121212]/30 -mt-[1px] text-[#121212] hover:border-indigo-500 hover:text-indigo-500 bg-[#FFFFFF] w-full"
            :class="{ 'text-indigo-500 border-indigo-500 z-50': isSectionActive('equipe') }"
          >
            <span>Parcours</span>
            <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 flex-shrink-0 pointer-events-none transition-transform duration-1000" :class="{ 'rotate-180': isSectionActive('equipe') }">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </button>
          <button 
            @click="toggleSection('pratique')" 
            class="flex items-center justify-between gap-1 u-h4 transition-all duration-300 px-2 sm:px-3 h-[30px] border border-[#121212]/30 -mt-[1px] text-[#121212] hover:border-indigo-500 hover:text-indigo-500 bg-[#FFFFFF] w-full"
            :class="{ 'text-indigo-500 border-indigo-500 z-50': isSectionActive('pratique') }"
          >
            <span>Pratique</span>
            <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 flex-shrink-0 pointer-events-none transition-transform duration-1000" :class="{ 'rotate-180': isSectionActive('pratique') }">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </button>
        </div>
      </template>
    </PageTitle>

    <!-- Content in 2 columns aligned with triggers -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-[3px]">
      <!-- Column 1: Equipe -->
      <div v-if="equipe" class="prose dark:prose-invert max-w-none">
        <ContentRenderer :value="equipe" />
      </div>

      <!-- Column 2: Pratique -->
      <div v-if="pratique" class="prose dark:prose-invert max-w-none">
        <ContentRenderer :value="pratique" />
      </div>

      <!-- Empty columns for alignment -->
      <div class="hidden xl:block"></div>
      <div class="hidden xl:block"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAgenceState } from '~/composables/useAgenceState'
import PageTitle from '~/components/PageTitle.vue'

const { toggleSection, isSectionActive } = useAgenceState()

const { data: pratique } = await useAsyncData('agence-pratique', () => {
  return queryCollection('content').path('/agence/pratique').first()
})

const { data: equipe } = await useAsyncData('agence-equipe', () => {
  return queryCollection('content').path('/agence/equipe').first()
})

definePageMeta({
  layout: 'default',
  title: "Studio Soñj"
})
</script>

<style scoped>
@reference "../../assets/css/main.css";
</style>