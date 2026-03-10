<template>
  <div class="sequence-counter flex items-center h-[30px] border border-[#121212]/30 bg-white -mt-[1px]">
    <button
      v-for="index in total"
      :key="index"
      @click="$emit('update:modelValue', index - 1)"
      class="u-h4 h-full px-3 flex items-center justify-center transition-all duration-300 border-r border-[#121212]/10 last:border-r-0"
      :class="[
        modelValue === index - 1 
          ? 'bg-[#121212] text-white' 
          : 'bg-white text-[#121212] hover:bg-[#121212]/5'
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
}
</style>
