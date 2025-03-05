<template>
  <div>
    <!-- This page will redirect to /messages -->
  </div>
</template>

<script setup>
// Redirect to messages page
const router = useRouter();

onMounted(() => {
  router.push('/messages');
});
</script> 