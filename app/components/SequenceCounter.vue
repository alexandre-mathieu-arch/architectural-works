<template>
  <div class="sequence-counter flex items-center h-[30px] border border-[#121212]/30 dark:border-white/20 bg-white dark:bg-[#121212] doux:bg-[#E5E1E0] -mt-[1px] overflow-x-auto whitespace-nowrap scrollbar-hide">
    <button
      v-for="index in total"
      :key="index"
      @click="$emit('update:modelValue', index - 1)"
      class="u-h4 h-full px-2 sm:px-3 flex-shrink-0 flex items-center justify-center transition-all duration-300 border-r border-[#121212]/10 dark:border-white/10 last:border-r-0 bg-transparent"
      :class="[
        modelValue === index - 1 
          ? 'font-bold text-[#121212] dark:text-white doux:text-[#4A4443] opacity-100' 
          : 'font-normal text-[#121212]/20 dark:text-white/20 doux:text-[#4A4443]/20 hover:text-[#121212] dark:hover:text-white doux:hover:text-[#4A4443] hover:opacity-100 hover:bg-[#121212]/5 dark:hover:bg-white/5 doux:hover:bg-[#4A4443]/5'
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
