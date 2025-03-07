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
  // If visiting root, check where to direct the user
  if (route.path === '/' && !marketingPaths.includes(route.path)) {
    // If 'ftu' parameter is provided in the URL, preserve it when redirecting
    if (route.query.ftu !== undefined) {
      router.push('/messages?ftu');
    } else {
      router.push('/messages');
    }
  }
});
</script>

<style>
  html, body {
    @apply antialiased;
  }
</style> 