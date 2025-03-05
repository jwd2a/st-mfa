<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Redirect root path to messages page
const route = useRoute();
const router = useRouter();

// Add viewport meta tag for mobile devices
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }
  ]
});

onMounted(() => {
  if (route.path === '/') {
    router.push('/messages');
  }
});
</script>

<style>
  html, body {
    @apply antialiased;
  }
</style> 