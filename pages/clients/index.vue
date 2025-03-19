<template>
  <div class="space-y-6">
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <div class="space-y-4">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Clients</h2>
        </div>

        <!-- Search -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="lucide:search" class="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search clients..." 
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>
    </div>

    <!-- Clients List -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
      <div v-for="client in filteredClients" :key="client.id" class="p-6">
        <div class="space-y-4">
          <!-- Client Header -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="lucide:building" class="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ client.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ client.numbers.length }} shared numbers</p>
              </div>
            </div>
          </div>

          <!-- Shared Numbers -->
          <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Shared Numbers</h4>
            <div class="space-y-3">
              <div v-for="number in client.numbers" :key="number.id" class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <div class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="lucide:phone" class="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ number.number }}</p>
                  </div>
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Shared since {{ number.sharedSince }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredClients.length === 0" class="p-6 text-center">
        <div class="mx-auto h-12 w-12 text-gray-400">
          <Icon name="lucide:search-x" class="h-12 w-12" />
        </div>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No clients found</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {{ searchQuery ? 'Try adjusting your search term.' : 'No clients are currently sharing numbers with you.' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserRole } from '~/composables/useUserRole';

const { isExternal } = useUserRole();
const searchQuery = ref('');

// Sample data - in a real app, this would come from an API
const clients = ref([
  {
    id: 1,
    name: 'Acme Corporation',
    numbers: [
      {
        id: 1,
        number: '+1 (555) 123-4567',
        sharedSince: 'Jan 15, 2024'
      },
      {
        id: 2,
        number: '+1 (555) 234-5678',
        sharedSince: 'Feb 1, 2024'
      }
    ]
  },
  {
    id: 2,
    name: 'TechStart Inc',
    numbers: [
      {
        id: 3,
        number: '+1 (555) 345-6789',
        sharedSince: 'Mar 1, 2024'
      }
    ]
  }
]);

// Filter clients based on search query
const filteredClients = computed(() => {
  if (!searchQuery.value) return clients.value;
  
  const query = searchQuery.value.toLowerCase();
  return clients.value.filter(client => {
    const matchesName = client.name.toLowerCase().includes(query);
    const matchesNumber = client.numbers.some(number => 
      number.number.includes(query)
    );
    return matchesName || matchesNumber;
  });
});
</script> 