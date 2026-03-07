<template>
  <div class="collapsible-bio mb-[10px]">
    <button 
      @click="isOpen = !isOpen" 
      class="u-h3 flex items-center gap-4 text-left hover:text-indigo-500 transition-colors duration-300 w-full group tracking-widest"
    >
      <span class="transition-transform duration-300 group-hover:translate-x-1">{{ name }}</span>
      <svg 
        viewBox="0 0 20 20" 
        fill="currentColor" 
        class="w-5 h-5 transform transition-transform duration-1000"
        :class="{ 'rotate-180': isOpen }"
      >
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    
    <div 
      class="grid transition-all duration-1000 ease-in-out" 
      :class="isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <div class="overflow-hidden">
        <div class="pt-1 pb-1 prose dark:prose-invert max-w-none">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  name: string
}>()

const isOpen = ref(false)
</script>

<style scoped>
.collapsible-bio button {
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
}
</style>
