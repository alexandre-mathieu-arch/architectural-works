<template>
  <ProjectView v-if="page" :project="page" />
</template>

<script setup lang="ts">
import ProjectView from '~/components/ProjectView.vue';
import { useHoverProject } from '~/composables/useHoverProject';

definePageMeta({
  layout: 'default',
  showFilters: true,
  readonlyFilters: true
})

const route = useRoute()
const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { setHoveredProject } = useHoverProject();
watchEffect(() => {
  if (page.value) {
    route.meta.dynamicTitle = page.value.title;
    setHoveredProject(page.value as any);
  }
});

onMounted(() => {
  if (page.value) {
    setHoveredProject(page.value as any);
  }
});
</script>
