<template>
  <div>
    <!-- Marketing Layout with minimal navigation -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <div class="bg-primary rounded-lg p-2">
                <Icon name="lucide:shield-check" class="h-6 w-6 text-white" />
              </div>
              <span class="ml-2 text-xl font-bold text-gray-900">MFA</span>
            </NuxtLink>
          </div>
          
          <!-- Navigation Links -->
          <div class="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <NuxtLink to="/#features" class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Features</NuxtLink>
            <NuxtLink to="/#pricing" class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Pricing</NuxtLink>
            <NuxtLink to="/signup" class="text-primary hover:text-primary/90 px-3 py-2 text-sm font-medium">Sign Up</NuxtLink>
            <NuxtLink to="/login" class="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium">Sign In</NuxtLink>
          </div>
          
          <!-- Mobile menu button -->
          <div class="sm:hidden">
            <button type="button" @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-500 hover:text-gray-900">
              <Icon v-if="!mobileMenuOpen" name="lucide:menu" class="h-6 w-6" />
              <Icon v-else name="lucide:x" class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <NuxtLink to="/#features" class="text-gray-500 hover:text-gray-900 block px-3 py-2 text-base font-medium">Features</NuxtLink>
          <NuxtLink to="/#pricing" class="text-gray-500 hover:text-gray-900 block px-3 py-2 text-base font-medium">Pricing</NuxtLink>
          <NuxtLink to="/signup" class="text-primary hover:text-primary/90 block px-3 py-2 text-base font-medium">Sign Up</NuxtLink>
          <NuxtLink to="/login" class="bg-primary text-white hover:bg-primary/90 block px-3 py-2 text-base font-medium">Sign In</NuxtLink>
        </div>
      </div>
    </header>
    
    <!-- Page Content -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
// Marketing layout for landing page and auth pages (signup, login)
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
</script> 