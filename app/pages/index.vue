<template>
  <!-- Hero avec marges -->
  <div class="relative max-w-[1200px] mx-auto px-5 h-full">
    <div class="absolute inset-y-0 left-5 right-5 overflow-hidden">
      <img
        src="/001.jpg"
        alt="Atelier Archi"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-6">
      </div>
    </div>
  </div>
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
