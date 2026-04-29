<template>
  <footer class="fixed bottom-0 left-0 right-0 z-40 bg-transparent pointer-events-none py-4 md:py-8">
    <div class="main-container flex flex-col md:flex-row justify-end items-center md:items-end gap-2 md:gap-12 pointer-events-auto">
      <a 
        href="mailto:alexandre.mat+w@protonmail.com" 
        class="u-h4 text-[#121212] dark:text-white transition-colors hover:text-gray-500 dark:hover:text-gray-400 text-center md:text-right"
      >
        alexandre.mat+w@protonmail.com
      </a>
      <NuxtLink to="/contact" class="u-h4 text-[#121212] dark:text-white uppercase transition-colors hover:text-gray-500 dark:hover:text-gray-400 text-center md:text-right">
        Contact
      </NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>