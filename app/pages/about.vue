<template>
  <div class="pt-8 pb-12">
    <ContentDoc path="/about" class="prose dark:prose-invert max-w-none" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'À Propos' // Title for the PageTitle component
})
</script>