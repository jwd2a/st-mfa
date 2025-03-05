<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ client.firstName }} {{ client.lastName }}</h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Client profile and details
        </p>
      </div>
      <div class="flex space-x-3">
        <NuxtLink 
          to="/clients" 
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Icon name="lucide:arrow-left" class="-ml-1 mr-2 h-4 w-4" />
          Back to Clients
        </NuxtLink>
        <NuxtLink 
          :to="`/clients/${id}/edit`" 
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Icon name="lucide:edit" class="-ml-1 mr-2 h-4 w-4" />
          Edit Client
        </NuxtLink>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-start">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Client Information</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Personal details and contact information.
          </p>
        </div>
        <span :class="[
          client.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-500' : 
          client.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500' : 
          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-500',
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'
        ]">
          {{ client.status.charAt(0).toUpperCase() + client.status.slice(1) }}
        </span>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-700">
        <dl>
          <div class="bg-gray-50 dark:bg-gray-700/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{{ client.firstName }} {{ client.lastName }}</dd>
          </div>
          <div class="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Company</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{{ client.company }}</dd>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{{ client.email }}</dd>
          </div>
          <div class="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Created date</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{{ client.createdAt }}</dd>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Last activity</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{{ client.lastActivity || 'No recent activity' }}</dd>
          </div>
          <div class="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
              {{ client.notes || 'No notes' }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
    
    <!-- Phone Numbers -->
    <div class="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Phone Numbers</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            2FA phone numbers and services.
          </p>
        </div>
        <button 
          type="button" 
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Icon name="lucide:plus" class="-ml-0.5 mr-2 h-4 w-4" />
          Add Phone Number
        </button>
      </div>
      
      <div class="border-t border-gray-200 dark:border-gray-700">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <li v-for="(phone, index) in client.phoneNumbers" :key="index" class="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex flex-col md:flex-row md:items-center md:space-x-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="lucide:phone" class="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="flex items-center">
                      <h2 class="text-sm font-medium text-gray-900 dark:text-gray-100">+{{ phone.number }}</h2>
                    </div>
                    <div class="mt-1 flex items-center">
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{ phone.label || 'Unlabeled' }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-2 md:mt-0 flex flex-wrap gap-1">
                  <span 
                    v-for="(service, sIndex) in phone.services" 
                    :key="sIndex" 
                    class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/20 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-400"
                  >
                    {{ service }}
                  </span>
                  <span v-if="!phone.services || phone.services.length === 0" class="text-xs text-gray-500 dark:text-gray-400">
                    No services specified
                  </span>
                </div>
              </div>
              
              <div class="flex items-center space-x-2">
                <button 
                  type="button" 
                  class="inline-flex items-center p-1.5 border border-transparent rounded-md text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Icon name="lucide:edit" class="h-4 w-4" />
                  <span class="sr-only">Edit phone number</span>
                </button>
                <button 
                  type="button" 
                  class="inline-flex items-center p-1.5 border border-transparent rounded-md text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Icon name="lucide:trash-2" class="h-4 w-4" />
                  <span class="sr-only">Remove phone number</span>
                </button>
              </div>
            </div>
          </li>
          
          <li v-if="!client.phoneNumbers || client.phoneNumbers.length === 0" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
            No phone numbers found
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Recent Messages -->
    <div class="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Recent Messages</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          2FA messages received for this client.
        </p>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-700">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <li v-for="(message, index) in recentMessages" :key="index" class="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="lucide:shield" class="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div class="ml-4">
                  <div class="flex items-center">
                    <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
                      +{{ message.phoneNumber }}
                    </span>
                    <span class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      {{ message.service }}
                    </span>
                  </div>
                  <div class="mt-1 flex items-center">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      From: {{ message.sender }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ message.time }}</span>
                <span class="mt-1 text-xs text-gray-500 dark:text-gray-400" v-if="message.read">
                  <Icon name="lucide:check" class="inline h-3.5 w-3.5 mr-1" />Read
                </span>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="mt-2 text-sm text-gray-800 dark:text-gray-200 font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  {{ message.content }}
                </p>
              </div>
            </div>
          </li>
          
          <li v-if="!recentMessages || recentMessages.length === 0" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
            No recent messages found
          </li>
        </ul>
        
        <div v-if="recentMessages && recentMessages.length > 0" class="px-4 py-4 sm:px-6 text-center">
          <NuxtLink 
            :to="`/messages?client=${client.id}`" 
            class="text-sm font-medium text-primary hover:text-primary/80"
          >
            View all messages
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Get the client ID from the route params
const route = useRoute();
const id = computed(() => route.params.id as string);

// Mock client data
const client = ref({
  id: '1',
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@example.com',
  company: 'Acme Corp',
  status: 'active',
  createdAt: 'January 10, 2023',
  lastActivity: '2 hours ago',
  notes: 'Key client for our enterprise services. Prefers communication via email.',
  phoneNumbers: [
    {
      number: '15551234567',
      label: 'Work',
      services: ['Google', 'Microsoft', 'GitHub']
    },
    {
      number: '15559876543',
      label: 'Personal',
      services: ['AWS', 'Salesforce']
    }
  ]
});

// Mock recent messages
const recentMessages = ref([
  {
    id: '1',
    phoneNumber: '15551234567',
    service: 'Microsoft',
    sender: '+1 (844) 743-9612',
    content: 'Microsoft verification code: 593741',
    time: '3 hours ago',
    read: true
  },
  {
    id: '2',
    phoneNumber: '15551234567',
    service: 'Google',
    sender: '+1 (844) 921-5463',
    content: 'G-782940 is your Google verification code.',
    time: '5 hours ago',
    read: true
  },
  {
    id: '3',
    phoneNumber: '15559876543',
    service: 'AWS',
    sender: '+1 (844) 289-1056',
    content: 'Your security code is 914852',
    time: 'Yesterday',
    read: true
  }
]);
</script> 