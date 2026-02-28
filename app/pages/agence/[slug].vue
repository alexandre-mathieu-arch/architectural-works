<template>
  <div v-if="page" class="pt-8 pb-12">
    <!-- Sub-navigation for Agence section -->
    <nav class="flex gap-8 mb-12 border-b border-gray-200 pb-4">
      <NuxtLink to="/agence" class="nav-link">[agence]</NuxtLink>
      <NuxtLink to="/agence/pratique" class="nav-link" active-class="active-link">[pratique]</NuxtLink>
      <NuxtLink to="/agence/equipes" class="nav-link" active-class="active-link">[équipes]</NuxtLink>
    </nav>

    <div class="prose dark:prose-invert max-w-none">
      <ContentRenderer :value="page" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Query the 'content' collection for the page matching the current path
const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

definePageMeta({
  layout: 'default'
})

// Update route meta title for PageTitle component
watchEffect(() => {
  if (page.value) {
    route.meta.dynamicTitle = page.value.title;
  }
});
</script>

<style scoped>
@reference "../../assets/css/main.css";

.nav-link {
  @apply font-medium text-[#121212] hover:text-gray-400 tracking-widest text-sm transition-colors uppercase;
}

.active-link {
  @apply text-gray-400;
}
</style>
