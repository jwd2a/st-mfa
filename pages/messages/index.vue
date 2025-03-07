<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h2>
    </div>
    
    <!-- First-time user empty state -->
    <div v-if="isFirstTimeUser" class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
      <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div class="bg-primary/10 rounded-full p-6 mb-6">
          <Icon name="lucide:shield-check" class="h-16 w-16 text-primary" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Welcome to MFA!</h3>
        <p class="text-gray-500 dark:text-gray-400 max-w-lg mb-8">
          Get started by adding your first client to manage multi-factor authentication for your customers.
        </p>
        
        <div class="w-full max-w-md">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-4">Add Your First Client</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Create a client record to start managing their authentication needs.
            </p>
            <NuxtLink to="/clients/new" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <Icon name="lucide:plus" class="h-4 w-4 mr-2" />
              Add a Client
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Normal state content (search, filters, messages) -->
    <div v-else>
      <!-- Search and filtering -->
      <div class="space-y-4">
        <!-- Search and filters -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="relative col-span-1 md:col-span-1">
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
          
          <select 
            v-model="statusFilter" 
            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="unread">Unread ({{ unreadCount }})</option>
            <option value="">All Messages ({{ messages.length }})</option>
            <option value="read">Read ({{ readCount }})</option>
          </select>
          
          <select 
            v-model="clientFilter" 
            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="">All Clients</option>
            <option v-for="client in uniqueClients" :key="client" :value="client">{{ client }}</option>
          </select>
        </div>
      </div>
      
      <!-- Messages list -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
        <!-- Empty state when no unread messages -->
        <div v-if="statusFilter === 'unread' && unreadCount === 0" class="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div class="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
            <Icon name="lucide:check-circle" class="h-12 w-12 text-primary" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">All caught up!</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md">
            You have no unread messages. Check the "All Messages" view to see your message history.
          </p>
          <button 
            @click="statusFilter = ''" 
            class="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            View all messages
          </button>
        </div>
        
        <ul v-else role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <li 
            v-for="(message, index) in filteredMessages" 
            :key="index" 
            class="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700"
            :class="{'bg-primary/5 dark:bg-primary/10': !message.read}"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div 
                    class="h-10 w-10 rounded-full flex items-center justify-center"
                    :class="message.read ? 'bg-primary/10' : 'bg-primary/25'"
                  >
                    <Icon 
                      name="lucide:shield" 
                      class="h-5 w-5" 
                      :class="message.read ? 'text-primary' : 'text-primary-dark'"
                    />
                  </div>
                </div>
                <div class="ml-4">
                  <div class="flex flex-wrap items-center">
                    <h2 
                      class="text-sm font-medium dark:text-gray-100"
                      :class="message.read ? 'text-gray-900' : 'text-gray-900 font-semibold'"
                    >
                      {{ message.client }}
                    </h2>
                    <span class="ml-2 mt-1 sm:mt-0 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      {{ message.service }}
                    </span>
                    <span v-if="!message.read" class="ml-2 mt-1 sm:mt-0 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                      New
                    </span>
                  </div>
                  <div class="mt-1 flex items-center">
                    <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                      <span class="font-medium">{{ message.phoneNumber }}</span> · From: {{ message.sender }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-start sm:items-end mt-2 sm:mt-0">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ message.time }}</span>
                <span class="mt-1 text-xs text-gray-500 dark:text-gray-400" v-if="message.read">
                  <Icon name="lucide:check" class="inline h-3.5 w-3.5 mr-1" />Read
                </span>
              </div>
            </div>
            
            <!-- Message content and actions on the same line -->
            <div class="mt-2 flex items-start justify-between">
              <p 
                class="text-sm font-mono p-2 rounded flex-grow"
                :class="message.read 
                  ? 'text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700' 
                  : 'text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-gray-700 border-l-4 border-primary'"
              >
                {{ message.content }}
              </p>
              
              <button 
                v-if="!message.read"
                @click="markAsRead(message)"
                type="button" 
                class="ml-4 mt-1 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap"
              >
                <Icon name="lucide:check" class="mr-1 h-3.5 w-3.5" />
                Mark as read
              </button>
            </div>
          </li>
          
          <li v-if="filteredMessages.length === 0 && statusFilter !== 'unread'" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
            No messages found
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
const searchQuery = ref('');
const clientFilter = ref('');
const statusFilter = ref('unread'); // Default to unread messages

// First-time user state
const isFirstTimeUser = ref(false);

// Check for 'ftu' URL parameter
onMounted(() => {
  // Check for 'ftu' parameter in URL
  isFirstTimeUser.value = route.query.ftu !== undefined;
});

// Interface for message
interface Message {
  client: string;
  service: string;
  phoneNumber: string;
  sender: string;
  content: string;
  time: string;
  read: boolean;
  id?: string; // Optional ID field
}

// Mock message data
const messages = ref<Message[]>([
  {
    id: '1',
    client: 'Acme Corp',
    service: 'QuickBooks',
    phoneNumber: '+1 (555) 123-4567',
    sender: '+1 (844) 472-3829',
    content: 'Your verification code is 472931',
    time: '5 minutes ago',
    read: false
  },
  {
    id: '2',
    client: 'Globex Inc',
    service: 'Xero',
    phoneNumber: '+1 (555) 234-5678',
    sender: '+1 (844) 387-9120',
    content: 'Use 893421 as your login code',
    time: '18 minutes ago',
    read: false
  },
  {
    id: '3',
    client: 'Stark Industries',
    service: 'NetSuite',
    phoneNumber: '+1 (555) 345-6789',
    sender: '+1 (844) 629-3857',
    content: '325790 is your authentication code',
    time: '1 hour ago',
    read: true
  },
  {
    id: '4',
    client: 'Wayne Enterprises',
    service: 'AWS',
    phoneNumber: '+1 (555) 456-7890',
    sender: '+1 (844) 289-1056',
    content: 'Your security code is 914852',
    time: '2 hours ago',
    read: true
  },
  {
    id: '5',
    client: 'Acme Corp',
    service: 'Microsoft',
    phoneNumber: '+1 (555) 123-4567',
    sender: '+1 (844) 743-9612',
    content: 'Microsoft verification code: 593741',
    time: '3 hours ago',
    read: true
  },
  {
    id: '6',
    client: 'Umbrella Corp',
    service: 'Google',
    phoneNumber: '+1 (555) 567-8901',
    sender: '+1 (844) 921-5463',
    content: 'G-782940 is your Google verification code.',
    time: '5 hours ago',
    read: true
  },
  {
    id: '7',
    client: 'Globex Inc',
    service: 'GitHub',
    phoneNumber: '+1 (555) 234-5678',
    sender: '+1 (844) 384-9172',
    content: 'Your GitHub code is: 127854',
    time: 'Yesterday',
    read: true
  },
  {
    id: '8',
    client: 'Stark Industries',
    service: 'Salesforce',
    phoneNumber: '+1 (555) 345-6789',
    sender: '+1 (844) 983-2461',
    content: 'Use code 831654 to verify your Salesforce identity',
    time: 'Yesterday',
    read: true
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
const uniqueClients = computed(() => {
  return [...new Set(messages.value.map(message => message.client))];
});

// Filter messages based on status, search, and client filter
const filteredMessages = computed(() => {
  return messages.value.filter(message => {
    // Apply read/unread status filter
    const matchesStatus = 
      statusFilter.value === '' || 
      (statusFilter.value === 'unread' && !message.read) || 
      (statusFilter.value === 'read' && message.read);
    
    // Apply search filter
    const matchesSearch = searchQuery.value === '' || 
      message.content.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      message.client.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      message.service.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // Apply client filter
    const matchesClient = clientFilter.value === '' || message.client === clientFilter.value;
    
    return matchesStatus && matchesSearch && matchesClient;
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
    console.log(`Marked message from ${message.client} as read`);
    
    // If we're in unread view and all messages are now read, we'll show the empty state
    if (statusFilter.value === 'unread' && unreadCount.value === 0) {
      console.log('All caught up! No more unread messages.');
    }
  }
};
</script> 