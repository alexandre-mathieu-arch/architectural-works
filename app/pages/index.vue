<template>
  <NuxtLayout name="home">
    <!-- Hero plein écran -->
    <div class="relative w-full h-full">
      <img
        src="/hero.jpg"
        alt="Atelier Archi"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-6">
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home', // Use the new home layout
  title: 'Accueil' // Title for the PageTitle component
})
</script>


<style scoped>
/* Any specific styles for the landing page */
</style>
