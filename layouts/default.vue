<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Mobile sidebar backdrop -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"></div>
    
    <!-- Sidebar -->
    <aside :class="`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm`">
      <div class="flex flex-col h-full">
        <!-- Logo and app name -->
        <div class="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <span class="text-2xl font-bold text-primary">MFA</span>
          <button @click="isSidebarOpen = false" class="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
          <NuxtLink to="/messages" class="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="$route.path === '/' || $route.path.startsWith('/messages') ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300'">
            <Icon name="lucide:home" class="w-5 h-5 mr-3" />
            Dashboard
          </NuxtLink>
          
          <NuxtLink to="/clients" class="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="$route.path.startsWith('/clients') ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300'">
            <Icon name="lucide:users" class="w-5 h-5 mr-3" />
            Clients
          </NuxtLink>
          
          <NuxtLink to="/settings" class="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="$route.path.startsWith('/settings') ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300'">
            <Icon name="lucide:settings" class="w-5 h-5 mr-3" />
            Settings
          </NuxtLink>
        </nav>
        
        <!-- User profile -->
        <div class="p-4 border-t dark:border-gray-700">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Icon name="lucide:user" class="w-4 h-4" />
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300">John Doe</p>
              <p class="text-xs font-medium text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 md:pl-64">
      <!-- Header -->
      <header class="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b dark:border-gray-700 h-16">
        <div class="px-4 md:px-6 flex items-center justify-between h-full">
          <div class="flex items-center">
            <button @click="isSidebarOpen = true" class="md:hidden mr-3 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <Icon name="lucide:menu" class="w-5 h-5" />
            </button>
            <h1 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              {{ pageTitle }}
            </h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <button type="button" class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <Icon name="lucide:bell" class="w-5 h-5" />
            </button>
            
            <button type="button" class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <Icon name="lucide:help-circle" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <div class="p-4 md:p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const isSidebarOpen = ref(false);

// Compute page title based on route
const pageTitle = computed(() => {
  if (route.path === '/') return 'Dashboard';
  if (route.path.startsWith('/clients')) return 'Clients';
  if (route.path.startsWith('/messages')) return 'Dashboard';
  if (route.path.startsWith('/settings')) return 'Settings';
  
  // Fallback to route name or path
  return route.name?.toString() || route.path.split('/').pop() || 'MFA';
});
</script> 