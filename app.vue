<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Redirect root path to messages page if not on marketing pages
const route = useRoute();
const router = useRouter();

// Add viewport meta tag for mobile devices
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }
  ]
});

// List of paths that should use the marketing layout without redirection
const marketingPaths = ['/', '/signup', '/login'];

onMounted(() => {
  // Only redirect to /messages if we're at root and not on a marketing page
  if (route.path === '/' && !marketingPaths.includes(route.path)) {
    router.push('/messages');
  }
});
</script>

<style>
  html, body {
    @apply antialiased;
  }
</style> 