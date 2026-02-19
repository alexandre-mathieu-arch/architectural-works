<template>
  <div class="pb-4">
    <h1 class="text-[86px] font-bold uppercase" style="font-family: var(--font-dm-sans);">
      {{ title }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  title: string;
}>();
</script>
