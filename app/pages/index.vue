<template>
  <!-- Hero avec marges -->
  <div class="relative main-container h-full">
    <div class="w-full h-full overflow-hidden relative">
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
  title: { main: 'AVEL', sub: "ATELIER D'ARCHITECTURE" }
})
</script>


<style scoped>
/* Any specific styles for the landing page */
</style>
