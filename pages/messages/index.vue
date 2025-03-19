<template>
  <div class="space-y-6">
    <!-- Role Switcher (for demo purposes) -->
    <RoleSwitcher />

    <!-- Header with filters -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <div class="space-y-4">
        <!-- First row: Title -->
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Messages</h2>
        </div>

        <!-- Second row: Search and Filters -->
        <div class="flex items-center gap-4">
          <!-- Search -->
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="lucide:search" class="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search messages..." 
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <!-- Filter Section -->
          <div class="flex items-center space-x-4">
            <!-- Status Filter (shown to all users) -->
            <select 
              v-model="statusFilter" 
              class="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>

            <!-- Client Filter (only for external users) -->
            <select 
              v-if="isExternal"
              v-model="selectedClient" 
              class="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-100"
            >
              <option :value="null">All Clients</option>
              <option v-for="client in clients" :key="client.id" :value="client.id">
                {{ client.name }}
              </option>
            </select>

            <!-- Service Filter (only for non-external users) -->
            <select 
              v-if="!isExternal"
              v-model="selectedService" 
              class="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">All Services</option>
              <option v-for="service in services" :key="service" :value="service">
                {{ service }}
              </option>
            </select>

            <!-- Number Filter (only for non-external users) -->
            <select 
              v-if="!isExternal"
              v-model="selectedNumber" 
              class="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">All Numbers</option>
              <option v-for="number in numbers" :key="number" :value="number">
                {{ number }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- First-time user empty state -->
    <div v-if="isFirstTimeUser" class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
      <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div class="bg-primary/10 rounded-full p-6 mb-6">
          <Icon name="lucide:shield-check" class="h-16 w-16 text-primary" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{{ welcomeMessage }}</h3>
        <p class="text-gray-500 dark:text-gray-400 max-w-lg mb-8">
          {{ welcomeDescription }}
        </p>
        
        <div class="w-full max-w-md">
          <!-- Default Number Card -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-gray-100">Default Number</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Ready to use</p>
              </div>
              <span class="text-lg font-mono text-gray-600 dark:text-gray-300">+1 (555) 000-0000</span>
            </div>
            <div class="space-y-3 text-sm">
              <p class="text-gray-500 dark:text-gray-400">
                Here's what you can do with your number:
              </p>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <Icon name="lucide:check" class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-gray-600 dark:text-gray-300">Receive 2FA codes for any service</span>
                </li>
                <li class="flex items-start">
                  <Icon name="lucide:users" class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-gray-600 dark:text-gray-300">Share access with your team members</span>
                </li>
                <li class="flex items-start">
                  <Icon name="lucide:tag" class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-gray-600 dark:text-gray-300">Tag with services for better organization</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="grid gap-4 sm:grid-cols-2">
            <NuxtLink
              to="/numbers"
              class="inline-flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Icon name="lucide:settings" class="w-5 h-5 mr-2 text-gray-400" />
              Configure Number
            </NuxtLink>
            <NuxtLink
              to="/settings"
              class="inline-flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Icon name="lucide:users" class="w-5 h-5 mr-2 text-gray-400" />
              Invite Team
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Normal state content (search, filters, messages) -->
    <div v-else>
      <!-- Messages list -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        <div v-for="message in filteredMessages" :key="message.id" class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                {{ message.service }}
                <span v-if="isExternal" class="ml-2 mt-1 sm:mt-0 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  {{ getClientName(message.clientId) }}
                </span>
                <span v-if="!message.read" class="ml-2 mt-1 sm:mt-0 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                  New
                </span>
              </h2>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ message.number }}
              </p>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ message.time }}
            </div>
          </div>
          <p class="mt-2 text-gray-600 dark:text-gray-300">{{ message.content }}</p>
        </div>

        <!-- Empty State -->
        <div v-if="filteredMessages.length === 0" class="p-6 text-center">
          <div class="mx-auto h-12 w-12 text-gray-400">
            <Icon name="lucide:inbox" class="h-12 w-12" />
          </div>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No messages</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ searchQuery ? 'Try adjusting your search term.' : 'No messages to display.' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserRole } from '~/composables/useUserRole';
import RoleSwitcher from '~/components/RoleSwitcher.vue';

const route = useRoute();
const router = useRouter();
const { isAdmin, isUser, isExternal, canManageNumbers, canManageUsers, canManageSettings } = useUserRole();
const searchQuery = ref('');
const numberFilter = ref('');
const statusFilter = ref('all');
const selectedService = ref('');
const selectedClient = ref(null);
const selectedNumber = ref('');

// Function to get number label
function getNumberLabel(number: string): string {
  const defaultNumber = '+1 (555) 000-0000';
  if (number === defaultNumber) return 'Default Number';
  return 'Custom Number'; // In a real app, this would come from your numbers data
}

// First-time user state
const isFirstTimeUser = ref(false);

// Check for 'ftu' URL parameter
onMounted(() => {
  // Check for 'ftu' parameter in URL
  isFirstTimeUser.value = route.query.ftu !== undefined;
  
  // Remove the ftu parameter after checking it
  if (isFirstTimeUser.value) {
    router.replace({ query: {} });
  }
});

// Interface for message
interface Message {
  id: string;
  number: string;
  service: string;
  content: string;
  time: string;
  read: boolean;
  clientId: number;
}

interface Client {
  id: number;
  name: string;
}

// Mock message data
const messages = ref<Message[]>([
  {
    id: '1',
    service: 'Google',
    number: '+1 (555) 123-4567',
    content: 'Your verification code is 472931',
    time: '5 minutes ago',
    read: false,
    clientId: 1
  },
  {
    id: '2',
    service: 'Amazon',
    number: '+1 (555) 234-5678',
    content: 'Use 893421 as your login code',
    time: '18 minutes ago',
    read: false,
    clientId: 1
  },
  {
    id: '3',
    service: 'Microsoft',
    number: '+1 (555) 345-6789',
    content: '325790 is your authentication code',
    time: '1 hour ago',
    read: true,
    clientId: 2
  },
  {
    id: '4',
    service: 'Apple',
    number: '+1 (555) 456-7890',
    content: 'Your security code is 914852',
    time: '2 hours ago',
    read: true,
    clientId: 2
  },
  {
    id: '5',
    service: 'Facebook',
    number: '+1 (555) 567-8901',
    content: 'Your verification code is 123456',
    time: '3 hours ago',
    read: true,
    clientId: 1
  }
]);

// Generate more mock messages for demonstration
for (let i = 0; i < 20; i++) {
  const baseMessage = messages.value[i % messages.value.length]; // Reuse the existing messages
  messages.value.push({
    ...baseMessage,
    id: `${parseInt(baseMessage.id || '0') + 100 + i}`, // Generate unique ID
    content: `${baseMessage.content} - Additional item ${i + 1}`,
    time: i > 10 ? `${i - 10} days ago` : `${i} hours ago`,
  });
}

// Calculate counts for filters
const unreadCount = computed(() => messages.value.filter(m => !m.read).length);
const readCount = computed(() => messages.value.filter(m => m.read).length);

// Get unique client names for filter
const uniqueNumbers = computed(() => {
  return [...new Set(messages.value.map(message => message.number))];
});

// Computed property for all available services
const availableServices = computed(() => {
  const services = new Set<string>();
  messages.value.forEach(message => {
    if (message.service) services.add(message.service);
  });
  return Array.from(services).sort();
});

// Filter messages based on selected filters
const filteredMessages = computed(() => {
  if (!messages.value) return [];
  
  return messages.value.filter(message => {
    const matchesSearch = message.content.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = statusFilter.value === 'all' || 
      (statusFilter.value === 'unread' && !message.read) ||
      (statusFilter.value === 'read' && message.read);
    
    // Client filter for external users
    const matchesClient = !selectedClient.value || message.clientId === selectedClient.value;
    
    // Service and number filters for non-external users
    const matchesService = isExternal.value || !selectedService.value || message.service === selectedService.value;
    const matchesNumber = isExternal.value || !selectedNumber.value || message.number === selectedNumber.value;
    
    return matchesSearch && matchesStatus && matchesClient && matchesService && matchesNumber;
  });
});

// Function to mark a message as read
const markAsRead = (message: Message) => {
  // Find the message in the messages array
  const index = messages.value.findIndex(m => m.id === message.id);
  if (index !== -1) {
    // Create a new message object with read set to true
    messages.value[index] = { ...messages.value[index], read: true };

    // Show a toast or notification (in a real app)
    console.log(`Marked message from ${message.service} as read`);
    
    // If we're in unread view and all messages are now read, we'll show the empty state
    if (statusFilter.value === 'unread' && unreadCount.value === 0) {
      console.log('All caught up! No more unread messages.');
    }
  }
};

// Update FTU welcome message based on role
const welcomeMessage = computed(() => {
  if (isAdmin.value) return 'Welcome, Admin!';
  if (isUser.value) return 'Welcome to MFA!';
  return 'Welcome, External User!';
});

const welcomeDescription = computed(() => {
  if (isAdmin.value) return 'You have full access to manage numbers, users, and settings.';
  if (isUser.value) return 'You can view and manage your 2FA codes. Contact your admin for additional access.';
  return 'You can manage users and view numbers, but cannot add new numbers.';
});

// Sample data - in a real app, this would come from an API
const clients = ref<Client[]>([
  { id: 1, name: 'Acme Corporation' },
  { id: 2, name: 'TechStart Inc' }
]);

// Helper function to get client name
const getClientName = (clientId: number): string => {
  const client = clients.value.find(c => c.id === clientId);
  return client ? client.name : 'Unknown Client';
};

// Available services and numbers (for non-external users)
const services = ref(['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook']);
const numbers = ref([
  '+1 (555) 123-4567',
  '+1 (555) 234-5678',
  '+1 (555) 345-6789',
  '+1 (555) 456-7890',
  '+1 (555) 567-8901'
]);
</script> 