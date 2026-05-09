<template>
  <section 
    class="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
  >
    <!-- Hero Content -->
    <div 
      class="main-container w-full flex flex-col items-center group/text transition-all duration-1000"
      :style="{ 
        opacity: 1 - scrollProgress * 2,
        transform: `translateY(${-scrollProgress * 100}px) scale(${1 + scrollProgress * 0.05})`
      }"
    >
      <div class="relative border border-[#121212]/10 dark:border-white/10 px-8 py-10 md:px-16 md:py-12 flex flex-col items-center space-y-2 transition-colors duration-1000 group-hover/text:border-[#121212]/30 dark:group-hover/text:border-white/30">
        <div class="u-h4 text-[#121212] dark:text-white doux:text-[#4A4443] nuit:text-[#CDD6F4] uppercase tracking-[0.3em] group-hover/text:opacity-100 transition-opacity">
          Alexandre MATHIEU
        </div>
        <div class="u-h4 text-[#121212] dark:text-white doux:text-[#4A4443] nuit:text-[#CDD6F4] uppercase tracking-[0.2em] text-[10px] md:text-[12px] group-hover/text:opacity-80 transition-opacity wave-text">
          <span v-for="(char, i) in 'architecture design artistic'" :key="i" :style="{ animationDelay: `${i * 0.15}s` }" :class="{ 'mr-[0.3em]': char === ' ' }">
            {{ char === ' ' ? '&nbsp;' : char }}
          </span>
        </div>
        <span class="u-h4 text-[#121212] dark:text-white doux:text-[#4A4443] nuit:text-[#CDD6F4] opacity-40 animate-pulse uppercase tracking-[0.5em] pt-4 group-hover/text:text-primary-900 dark:group-hover/text:text-primary-400 group-hover/text:opacity-100 transition-all duration-700">works</span>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div 
      class="absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-500"
      :style="{ opacity: 1 - scrollProgress * 5 }"
    >
      <div class="w-px h-12 bg-gradient-to-b from-transparent via-[#121212]/20 dark:via-white/20 to-transparent animate-bounce"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  scrollProgress: number;
}>();
</script>

<style scoped>
@reference "../assets/css/main.css";
</style>
