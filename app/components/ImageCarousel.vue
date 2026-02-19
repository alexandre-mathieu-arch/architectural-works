<template>
  <div class="carousel" v-if="images && images.length">
    <div class="carousel-inner">
      <img :src="images[currentIndex]" :key="currentIndex" class="carousel-image" />
    </div>
    <button @click="prev" class="carousel-control prev" v-if="images.length > 1">‹</button>
    <button @click="next" class="carousel-control next" v-if="images.length > 1">›</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const currentIndex = ref(0)

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.carousel-inner {
  display: flex;
}

.carousel-image {
  width: 100%;
  flex-shrink: 0;
  display: block;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 2.5rem;
  z-index: 10;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.prev {
  left: 15px;
}

.next {
  right: 15px;
}
</style>
