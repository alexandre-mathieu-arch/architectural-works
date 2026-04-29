<template>
  <div class="sequence-counter flex items-center h-[30px] border border-[#121212]/30 bg-white dark:bg-[#121212] -mt-[1px] overflow-x-auto whitespace-nowrap scrollbar-hide">
    <button
      v-for="index in total"
      :key="index"
      @click="$emit('update:modelValue', index - 1)"
      class="u-h4 h-full px-2 sm:px-3 flex-shrink-0 flex items-center justify-center transition-all duration-300 border-r border-[#121212]/10 dark:border-white/10 last:border-r-0"
      :class="[
        modelValue === index - 1 
          ? 'bg-[#121212] text-white dark:bg-white dark:text-[#121212]' 
          : 'bg-white text-[#121212] dark:bg-[#121212] dark:text-white hover:bg-[#121212]/5 dark:hover:bg-white/5'
      ]"
    >
      {{ index }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: number;
  total: number;
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped>
.sequence-counter {
  user-select: none;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.sequence-counter::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>
