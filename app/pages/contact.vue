<template>
  <div class="pt-8 pb-12">
    <div class="flex flex-col md:flex-row flex-wrap items-baseline gap-x-12 gap-y-6">
      <div class="u-h2">Alexandre MATHIEU</div>
      
      <div class="flex flex-wrap items-center gap-x-8 gap-y-2">
        <a 
          href="mailto:alexandre.mat+w@protonmail.com" 
          class="u-body hover:text-black transition-colors"
        >
          alexandre.mat+w@protonmail.com
        </a>
        
        <a 
          href="tel:+33658215300" 
          class="u-body hover:text-black transition-colors"
        >
          +33 6 58 21 53 00
        </a>
      </div>
    </div>

    <!-- Additional space for potential future form -->
    <div class="mt-24 border-t border-[#121212]/5 pt-12">
      <p class="u-legend opacity-40 uppercase tracking-[0.2em]">
        Sur rendez-vous uniquement
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Contact'
})
</script>

<style scoped>
@reference "../assets/css/main.css";
</style>