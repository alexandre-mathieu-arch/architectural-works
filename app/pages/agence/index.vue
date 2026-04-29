<template>
  <div class="pt-0 pb-12">
    <PageTitle title="Studio Soñj" :hide-main-title="true">
      <template #triggers>
        <div 
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8"
          style="view-transition-name: page-triggers;"
        >
          <button 
            @click="handleToggle('equipe')" 
            class="flex items-center justify-between gap-1 u-h4 transition-all duration-300 px-3 h-[30px] border border-[#121212]/30 dark:border-white/20 -mt-[1px] text-[#121212] dark:text-white hover:border-indigo-500 hover:text-indigo-500 bg-transparent w-full"
            :class="{ '!text-indigo-500 !border-indigo-500 z-50': isSectionActive('equipe') }"
          >
            <span>Parcours</span>
            <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 flex-shrink-0 pointer-events-none transition-transform duration-500" :class="{ 'rotate-180': isSectionActive('equipe') }">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
          <button 
            @click="handleToggle('pratique')" 
            class="flex items-center justify-between gap-1 u-h4 transition-all duration-300 px-3 h-[30px] border border-[#121212]/30 dark:border-white/20 -mt-[1px] text-[#121212] dark:text-white hover:border-indigo-500 hover:text-indigo-500 bg-transparent w-full"
            :class="{ '!text-indigo-500 !border-indigo-500 z-50': isSectionActive('pratique') }"
          >
            <span>Pratique</span>
            <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 flex-shrink-0 pointer-events-none transition-transform duration-500" :class="{ 'rotate-180': isSectionActive('pratique') }">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </template>
    </PageTitle>

    <!-- Content: Integrated mobile-first accordion + desktop grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-4">
      <!-- Column 1: Equipe -->
      <div 
        class="transition-all duration-500 ease-in-out overflow-hidden"
        :class="[
          isSectionActive('equipe') ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 md:max-h-0 md:opacity-0'
        ]"
      >
        <div v-if="equipe" class="prose dark:prose-invert max-w-none pb-8">
          <ContentRenderer :value="equipe" />
        </div>
      </div>

      <!-- Column 2: Pratique -->
      <div 
        class="transition-all duration-500 ease-in-out overflow-hidden"
        :class="[
          isSectionActive('pratique') ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 md:max-h-0 md:opacity-0'
        ]"
      >
        <div v-if="pratique" class="prose dark:prose-invert max-w-none pb-8">
          <ContentRenderer :value="pratique" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAgenceState } from '~/composables/useAgenceState'
import PageTitle from '~/components/PageTitle.vue'

const { toggleSection, isSectionActive, activeSections } = useAgenceState()

const handleToggle = (slug: string) => {
  // On mobile/tablet (single column content flow), we close other sections for a clean accordion effect
  if (window.innerWidth < 768) {
    if (!isSectionActive(slug)) {
      activeSections.value.clear()
    }
  }
  toggleSection(slug)
}

const { data: pratique } = await useAsyncData('agence-pratique', () => {
  return queryCollection('content').path('/agence/pratique').first()
})

const { data: equipe } = await useAsyncData('agence-equipe', () => {
  return queryCollection('content').path('/agence/equipe').first()
})

definePageMeta({
  layout: 'default',
  title: "Agence",
  hideLayoutTitle: true
})
</script>

<style scoped>
@reference "../../assets/css/main.css";
</style>
