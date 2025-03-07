<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Clients</h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your client profiles and their authentication methods.
        </p>
      </div>
      
      <div>
        <NuxtLink 
          to="/clients/new" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Icon name="lucide:plus" class="-ml-1 mr-2 h-4 w-4" />
          Add Client
        </NuxtLink>
      </div>
    </div>
    
    <!-- Empty state for first time users -->
    <div v-if="isFirstTimeUser" class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-16 sm:px-6 text-center">
        <div class="flex justify-center mb-6">
          <div class="bg-primary/10 rounded-full p-6">
            <Icon name="lucide:users" class="h-12 w-12 text-primary" />
          </div>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No clients yet</h3>
        <p class="max-w-md mx-auto text-sm text-gray-500 dark:text-gray-400 mb-6">
          Get started by adding your first client. This will allow you to manage multi-factor authentication for your customers.
        </p>
        <NuxtLink 
          to="/clients/new" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Icon name="lucide:plus" class="-ml-1 mr-2 h-4 w-4" />
          Add Your First Client
        </NuxtLink>
      </div>
    </div>

    <!-- Client list -->
    <div v-else>
      <!-- Search and filter -->
      <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="lucide:search" class="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search clients..." 
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-sm dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        
        <select 
          v-model="statusFilter" 
          class="block w-full sm:w-40 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      
      <!-- Clients table/cards view -->
      <div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
        <!-- Desktop table view (hidden on mobile) -->
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Phone Numbers
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="client in filteredClients" :key="client.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      {{ client.firstName.charAt(0) }}{{ client.lastName.charAt(0) }}
                    </div>
                    <div class="ml-4">
                      <NuxtLink :to="`/clients/${client.id}`" class="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary">
                        {{ client.firstName }} {{ client.lastName }}
                      </NuxtLink>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ client.company }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-gray-100">{{ client.email }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Last activity: {{ client.lastActivity }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-gray-100">{{ client.phoneNumbers.length }} numbers</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="client.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'">
                    {{ client.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-3">
                    <NuxtLink to="/clients/paid-client" class="text-primary hover:text-primary/80">
                      View
                    </NuxtLink>
                    <NuxtLink to="/clients/paid-client/edit" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Edit
                    </NuxtLink>
                    <button class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              
              <!-- Sample client with paid status -->
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      JD
                    </div>
                    <div class="ml-4">
                      <NuxtLink to="/clients/paid-client" class="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary">
                        Jane Doe
                      </NuxtLink>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        Example Corp
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-gray-100">jane@example.com</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Last activity: 2 hours ago
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col space-y-1">
                    <span class="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-500 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit">
                      Active
                    </span>
                    <span class="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-500 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit">
                      Payment Complete
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-3">
                    <NuxtLink to="/clients/paid-client" class="text-primary hover:text-primary/80">
                      View
                    </NuxtLink>
                    <NuxtLink to="/clients/paid-client/edit" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Edit
                    </NuxtLink>
                    <button class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Mobile card view (shown only on mobile) -->
        <ul class="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
          <li v-for="client in filteredClients" :key="client.id" class="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" @click="navigateToClient(client.id)">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span class="text-primary font-medium text-sm">{{ getInitials(client.name) }}</span>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ client.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ client.company }}</p>
                </div>
              </div>
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="client.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'">
                {{ client.status }}
              </span>
            </div>
            <div class="mt-2">
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ client.phoneNumbers.length }} phone numbers</p>
              <!-- View details button removed - entire card is clickable -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Mock client data
const clients = ref([
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    company: 'Acme Corp',
    status: 'active',
    lastActivity: '2 hours ago',
    billingType: 'provider-pay'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    company: 'XYZ Industries',
    status: 'pending',
    lastActivity: '1 day ago',
    billingType: 'self-pay',
    paymentStatus: 'pending'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    company: 'Global Tech',
    status: 'inactive',
    lastActivity: '2 weeks ago',
    billingType: 'provider-pay'
  }
]);

// Search and filter
const searchQuery = ref('');
const statusFilter = ref('');

// First-time user state
const isFirstTimeUser = ref(false);

// Check for 'ftu' URL parameter
onMounted(() => {
  // Check for 'ftu' parameter in URL
  isFirstTimeUser.value = route.query.ftu !== undefined;
});

// Computed filtered clients based on search and filter
const filteredClients = computed(() => {
  return clients.value.filter(client => {
    // Apply search filter
    const matchesSearch = searchQuery.value === '' || 
      client.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.value.toLowerCase());
      
    // Apply status filter
    const matchesStatus = statusFilter.value === 'all' || client.status === statusFilter.value;
    
    return matchesSearch && matchesStatus;
  });
});

// Function to get initials from a name
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

// Function to navigate to client details
const navigateToClient = (id: string) => {
  // Use Nuxt's router to navigate to the client details page
  navigateTo(`/clients/${id}`);
};
</script> 