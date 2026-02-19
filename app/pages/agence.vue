<template>
  <NuxtLayout name="default">
    <div class="pt-8 pb-12">
      <div class="prose dark:prose-invert max-w-none">
        <p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Description de l'agence MDP et de sa philosophie architecturale.
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: "L'Agence" // Title for the PageTitle component
})
</script>
