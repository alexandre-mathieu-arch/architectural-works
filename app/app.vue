<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <CustomCursor />
</template>

<script setup lang="ts">
import CustomCursor from '~/components/CustomCursor.vue';
</script>