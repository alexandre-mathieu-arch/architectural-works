<template>
  <div class="pt-8 pb-12">
    <div v-if="page" class="prose dark:prose-invert max-w-none">
      <div class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
        <ContentRenderer :value="page" />
      </div>

      <nav class="flex flex-col gap-6 mt-8">
        <NuxtLink 
          to="/agence/pratique" 
          class="u-sub-link"
        >
          [pratique]
        </NuxtLink>
        <NuxtLink 
          to="/agence/equipes" 
          class="u-sub-link"
        >
          [équipes]
        </NuxtLink>
      </nav>
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

.u-sub-link {
  @apply font-medium text-[#121212] hover:text-gray-400 tracking-widest text-[21px] transition-colors uppercase;
  letter-spacing: 0.2em;
}
</style>
