<template>
  <NuxtLayout name="home">
    <!-- Hero avec marges -->
    <div class="relative w-[90vw] lg:w-[60vw] mx-auto h-full">
      <img
        src="/001.jpg"
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
  title: 'Atelier Kerswell'
})
</script>


<style scoped>
/* Any specific styles for the landing page */
</style>
