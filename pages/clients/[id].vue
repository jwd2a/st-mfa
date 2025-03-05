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
          @click="openAddPhoneModal"
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
                  @click="editPhoneNumber(index)"
                  class="inline-flex items-center p-1.5 border border-transparent rounded-md text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Icon name="lucide:edit" class="h-4 w-4" />
                  <span class="sr-only">Edit phone number</span>
                </button>
                <button 
                  type="button" 
                  @click="confirmDeletePhoneNumber(index)"
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

    <!-- Add Phone Number Modal -->
    <div v-if="showAddPhoneModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center z-50">
      <div class="relative bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4 shadow-xl overflow-hidden">
        <div class="px-4 pt-5 pb-4 sm:p-6">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                {{ editMode ? 'Edit Phone Number' : 'Add New Phone Number' }}
              </h3>
              <div class="mt-4 space-y-4">
                <!-- Phone Number Field -->
                <div>
                  <label for="new-phone-number" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <div class="mt-1 relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span class="text-gray-500 sm:text-sm">+</span>
                    </div>
                    <input 
                      id="new-phone-number" 
                      v-model="newPhone.number" 
                      type="text" 
                      class="pl-7 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md" 
                      placeholder="1 555 123 4567"
                      required
                    />
                  </div>
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Include country code (e.g., 1 for US/Canada)</p>
                </div>
                
                <!-- Label Field -->
                <div>
                  <label for="new-phone-label" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Label
                  </label>
                  <div class="mt-1">
                    <input 
                      id="new-phone-label" 
                      v-model="newPhone.label" 
                      type="text" 
                      class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md" 
                      placeholder="Personal, Work, etc."
                    />
                  </div>
                </div>
                
                <!-- Services Placeholder (to be implemented later) -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Services
                  </label>
                  <div class="mt-1 relative">
                    <div class="flex items-center">
                      <div class="relative flex-grow">
                        <input 
                          type="text" 
                          v-model="serviceSearchQuery" 
                          @focus="showServiceDropdown = true"
                          @blur="closeServiceDropdownDelayed"
                          placeholder="Search for services..."
                          class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md"
                        />
                        
                        <!-- Service Dropdown -->
                        <div 
                          v-if="showServiceDropdown" 
                          class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm"
                        >
                          <div 
                            v-for="service in filteredServices" 
                            :key="service.id" 
                            @mousedown.prevent="toggleService(service.id)"
                            class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div class="flex items-center">
                              <span class="block truncate" :class="{'font-semibold': newPhone.services.includes(service.id)}">
                                {{ service.name }}
                              </span>
                              <span v-if="newPhone.services.includes(service.id)" class="absolute inset-y-0 right-0 flex items-center pr-4">
                                <Icon name="lucide:check" class="h-4 w-4 text-primary" />
                              </span>
                            </div>
                          </div>
                          <div v-if="filteredServices.length === 0" class="py-2 px-3 text-gray-500 dark:text-gray-400 text-sm">
                            No matching services found
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Selected Services -->
                    <div class="mt-2 flex flex-wrap gap-1">
                      <span 
                        v-for="serviceId in newPhone.services" 
                        :key="serviceId" 
                        class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/20 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-400"
                      >
                        {{ getServiceName(serviceId) }}
                        <button 
                          type="button" 
                          @click="removeService(serviceId)" 
                          class="ml-1 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none"
                        >
                          <span class="sr-only">Remove {{ getServiceName(serviceId) }}</span>
                          <Icon name="lucide:x" class="h-3 w-3" />
                        </button>
                      </span>
                      <span v-if="newPhone.services.length === 0" class="text-xs text-gray-500 dark:text-gray-400">
                        No services selected
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button 
            type="button" 
            @click="savePhoneNumber" 
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
            :disabled="!newPhone.number"
          >
            {{ editMode ? 'Update' : 'Add Phone' }}
          </button>
          <button 
            type="button" 
            @click="closeAddPhoneModal" 
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
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

// Modal state for adding phone numbers
const showAddPhoneModal = ref(false);
const editMode = ref(false);
const editIndex = ref(-1);
const newPhone = ref({
  number: '',
  label: '',
  services: [] as string[]
});

// Services dropdown state
const showServiceDropdown = ref(false);
const serviceSearchQuery = ref('');
let dropdownTimeout: number | null = null;

// Available services for selection
const availableServices = [
  { id: 'google', name: 'Google' },
  { id: 'microsoft', name: 'Microsoft' },
  { id: 'github', name: 'GitHub' },
  { id: 'aws', name: 'AWS' },
  { id: 'apple', name: 'Apple' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'twitter', name: 'Twitter/X' },
  { id: 'dropbox', name: 'Dropbox' },
  { id: 'slack', name: 'Slack' },
  { id: 'banking', name: 'Banking' },
  { id: 'coinbase', name: 'Coinbase' },
  { id: 'binance', name: 'Binance' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'reddit', name: 'Reddit' },
  { id: 'digitalocean', name: 'DigitalOcean' },
  { id: 'salesforce', name: 'Salesforce' },
  { id: 'twilio', name: 'Twilio' },
  { id: 'stripe', name: 'Stripe' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'uber', name: 'Uber' },
  { id: 'lyft', name: 'Lyft' },
  { id: 'robinhood', name: 'Robinhood' },
  { id: 'box', name: 'Box' },
  { id: 'zoom', name: 'Zoom' },
  { id: 'other', name: 'Other' }
];

// Filter services based on search query
const filteredServices = computed(() => {
  const query = serviceSearchQuery.value.toLowerCase();
  
  if (!query) {
    return availableServices;
  }
  
  return availableServices.filter(service => 
    service.name.toLowerCase().includes(query)
  );
});

// Get service name by ID
const getServiceName = (serviceId: string): string => {
  const service = availableServices.find(s => s.id === serviceId);
  return service ? service.name : serviceId;
};

// Toggle a service selection
const toggleService = (serviceId: string) => {
  if (newPhone.value.services.includes(serviceId)) {
    // Remove service if already selected
    newPhone.value.services = newPhone.value.services.filter(id => id !== serviceId);
  } else {
    // Add service if not selected
    newPhone.value.services.push(serviceId);
  }
};

// Remove a service from the selected list
const removeService = (serviceId: string) => {
  newPhone.value.services = newPhone.value.services.filter(id => id !== serviceId);
};

// Close the service dropdown with a delay to allow click events
const closeServiceDropdownDelayed = () => {
  dropdownTimeout = window.setTimeout(() => {
    showServiceDropdown.value = false;
  }, 200);
};

// Modal control functions
const openAddPhoneModal = () => {
  // Reset the form
  newPhone.value = {
    number: '',
    label: '',
    services: []
  };
  editMode.value = false;
  showAddPhoneModal.value = true;
  serviceSearchQuery.value = '';
};

const editPhoneNumber = (index: number) => {
  editMode.value = true;
  editIndex.value = index;
  const phone = client.value.phoneNumbers[index];
  
  // Convert service names to IDs for the form
  const serviceIds = phone.services.map(serviceName => {
    const service = availableServices.find(s => s.name === serviceName);
    return service ? service.id : serviceName.toLowerCase();
  });
  
  newPhone.value = {
    number: phone.number,
    label: phone.label,
    services: serviceIds
  };
  
  showAddPhoneModal.value = true;
  serviceSearchQuery.value = '';
};

const closeAddPhoneModal = () => {
  showAddPhoneModal.value = false;
  editMode.value = false;
  editIndex.value = -1;
};

// Function to save a phone number (add or update)
const savePhoneNumber = () => {
  // Validate the phone number (basic validation)
  if (!newPhone.value.number) {
    alert('Please enter a phone number');
    return;
  }
  
  const phoneData = {
    number: newPhone.value.number,
    label: newPhone.value.label,
    services: newPhone.value.services.map(id => getServiceName(id))
  };
  
  if (editMode.value) {
    // Update existing phone number
    client.value.phoneNumbers[editIndex.value] = phoneData;
    alert('Phone number updated successfully!');
  } else {
    // Add the new phone number to the client's phone numbers
    client.value.phoneNumbers.push(phoneData);
    alert('Phone number added successfully!');
  }
  
  // Close the modal
  closeAddPhoneModal();
};

// Function to confirm and delete a phone number
const confirmDeletePhoneNumber = (index: number) => {
  if (confirm('Are you sure you want to delete this phone number?')) {
    client.value.phoneNumbers.splice(index, 1);
    alert('Phone number deleted successfully!');
  }
};

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