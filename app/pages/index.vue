<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo('/works', { redirectCode: 301 })
    }
  ]
})
</script>
