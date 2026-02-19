<template>
  <NuxtLayout name="default">
    <div class="pt-8 pb-12">

      <div v-if="projects?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard v-for="project in projects" :key="project.path" :project="project" />
      </div>
      <div v-else class="text-center py-20">
        <p class="text-gray-500">No projects found.</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import ProjectCard from '~/components/ProjectCard.vue';

definePageMeta({
  layout: 'default',
  title: 'Projets' // Title for the PageTitle component
});

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/projects/%')
    .order('date', 'DESC')
    .all()
);
</script>
