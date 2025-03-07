<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Client</h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Create a new client profile to set up 2FA message forwarding.
        </p>
      </div>
      <div>
        <NuxtLink 
          to="/clients" 
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Icon name="lucide:arrow-left" class="-ml-1 mr-2 h-4 w-4" />
          Back to Clients
        </NuxtLink>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <form @submit.prevent="handleSubmit">
        <div class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <!-- Basic Information -->
            <div class="sm:col-span-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Basic Information</h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Client profile details.
              </p>
            </div>
            
            <div class="sm:col-span-3 lg:col-span-2">
              <label for="first-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First name
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  v-model="formData.firstName"
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md"
                  required
                />
              </div>
            </div>

            <div class="sm:col-span-3 lg:col-span-2">
              <label for="last-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last name
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  v-model="formData.lastName"
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div class="sm:col-span-3 lg:col-span-2">
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div class="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  v-model="formData.email"
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div class="sm:col-span-3 lg:col-span-2">
              <label for="company" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  name="company"
                  id="company"
                  v-model="formData.company"
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div class="sm:col-span-3 lg:col-span-2">
              <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <div class="mt-1">
                <select
                  id="status"
                  name="status"
                  v-model="formData.status"
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <!-- Phone Numbers Section -->
            <div class="sm:col-span-6 pt-5">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Phone Numbers</h3>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Add phone numbers for 2FA message forwarding.
                  </p>
                </div>
                <button 
                  type="button" 
                  @click="addPhoneNumber"
                  class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Icon name="lucide:plus" class="-ml-0.5 mr-2 h-4 w-4" />
                  Add Phone
                </button>
              </div>
            </div>
            
            <div v-for="(phone, index) in formData.phoneNumbers" :key="index" class="sm:col-span-6 space-y-4 rounded-md bg-gray-50 dark:bg-gray-700/50 p-4">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Phone #{{ index + 1 }}</h4>
                <button 
                  type="button" 
                  @click="removePhoneNumber(index)"
                  class="inline-flex items-center p-1 border border-transparent rounded-md text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Icon name="lucide:trash-2" class="h-4 w-4" />
                  <span class="sr-only">Remove phone number</span>
                </button>
              </div>
              
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3 lg:col-span-2">
                  <label :for="`phone-number-${index}`" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <div class="mt-1 relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span class="text-gray-500 sm:text-sm">+</span>
                    </div>
                    <input 
                      :id="`phone-number-${index}`" 
                      v-model="phone.number" 
                      type="text" 
                      class="pl-7 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md" 
                      placeholder="1 555 123 4567"
                      required
                    />
                  </div>
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Include country code (e.g., 1 for US/Canada)</p>
                </div>
                
                <div class="sm:col-span-3 lg:col-span-2">
                  <label :for="`phone-label-${index}`" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Label
                  </label>
                  <div class="mt-1 flex space-x-2 items-center">
                    <div class="flex-grow">
                      <input 
                        :id="`phone-label-${index}`" 
                        v-model="phone.label" 
                        type="text" 
                        class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md" 
                        placeholder="Personal, Work, etc."
                      />
                    </div>
                  </div>
                </div>
                
                <!-- Services Field -->
                <div class="sm:col-span-6">
                  <label :for="`phone-services-${index}`" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Services
                  </label>
                  <div class="mt-1 relative">
                    <div class="flex items-center">
                      <div class="relative flex-grow">
                        <input 
                          :id="`phone-services-${index}`"
                          type="text" 
                          v-model="serviceSearchQueries[index]" 
                          @focus="openServiceDropdown(index)"
                          @blur="closeServiceDropdownDelayed(index)"
                          placeholder="Search for services..."
                          class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md"
                        />
                        
                        <!-- Service Dropdown -->
                        <div 
                          v-if="activeServiceDropdown === index" 
                          class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm"
                        >
                          <div 
                            v-for="service in filteredServices(index)" 
                            :key="service.id" 
                            @mousedown.prevent="toggleService(index, service.id)"
                            class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div class="flex items-center">
                              <span class="block truncate" :class="{'font-semibold': phone.selectedServices.includes(service.id)}">
                                {{ service.name }}
                              </span>
                              <span v-if="phone.selectedServices.includes(service.id)" class="absolute inset-y-0 right-0 flex items-center pr-4">
                                <Icon name="lucide:check" class="h-4 w-4 text-primary" />
                              </span>
                            </div>
                          </div>
                          <div v-if="filteredServices(index).length === 0" class="py-2 px-3 text-gray-500 dark:text-gray-400 text-sm">
                            No matching services found
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Selected Services -->
                    <div class="mt-2 flex flex-wrap gap-1">
                      <span 
                        v-for="serviceId in phone.selectedServices" 
                        :key="serviceId" 
                        class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/20 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-400"
                      >
                        {{ getServiceName(serviceId) }}
                        <button 
                          type="button" 
                          @click="removeService(index, serviceId)" 
                          class="ml-1 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none"
                        >
                          <span class="sr-only">Remove {{ getServiceName(serviceId) }}</span>
                          <Icon name="lucide:x" class="h-3 w-3" />
                        </button>
                      </span>
                      <span v-if="phone.selectedServices.length === 0" class="text-xs text-gray-500 dark:text-gray-400">
                        No services selected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="formData.phoneNumbers.length === 0" class="sm:col-span-6">
              <div class="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <Icon name="lucide:alert-triangle" class="h-5 w-5 text-yellow-400" />
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-500">No phone numbers</h3>
                    <div class="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                      <p>
                        At least one phone number is required to create a client for 2FA message forwarding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Notes -->
            <div class="sm:col-span-6 pt-5">
              <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Notes
              </label>
              <div class="mt-1">
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  v-model="formData.notes"
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md"
                  placeholder="Any additional information about this client..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6 flex justify-end space-x-3">
          <NuxtLink
            to="/clients"
            class="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </NuxtLink>
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            :disabled="formData.phoneNumbers.length === 0"
          >
            Create Client
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Form data
// Define an interface for the phone number items
interface PhoneNumber {
  number: string;
  label: string;
  selectedServices: string[];
}

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  status: 'active',
  notes: '',
  phoneNumbers: [
    {
      number: '',
      label: '',
      selectedServices: [] as string[]
    }
  ] as PhoneNumber[]
});

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

// Service search and dropdown handling
const serviceSearchQueries = ref(Array(formData.value.phoneNumbers.length).fill(''));
const activeServiceDropdown = ref(-1);
let dropdownTimeout: number | null = null;

// Get service name by ID
const getServiceName = (serviceId: string): string => {
  const service = availableServices.find(s => s.id === serviceId);
  return service ? service.name : serviceId;
};

// Toggle a service selection
const toggleService = (phoneIndex: number, serviceId: string) => {
  const phone = formData.value.phoneNumbers[phoneIndex];
  
  if (phone.selectedServices.includes(serviceId)) {
    // Remove service if already selected
    phone.selectedServices = phone.selectedServices.filter(id => id !== serviceId);
  } else {
    // Add service if not selected
    phone.selectedServices.push(serviceId);
  }
};

// Remove a service from the selected list
const removeService = (phoneIndex: number, serviceId: string) => {
  const phone = formData.value.phoneNumbers[phoneIndex];
  phone.selectedServices = phone.selectedServices.filter(id => id !== serviceId);
};

// Open the service dropdown
const openServiceDropdown = (index: number) => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout);
    dropdownTimeout = null;
  }
  activeServiceDropdown.value = index;
};

// Close the service dropdown with a delay to allow click events
const closeServiceDropdownDelayed = (index: number) => {
  dropdownTimeout = window.setTimeout(() => {
    if (activeServiceDropdown.value === index) {
      activeServiceDropdown.value = -1;
    }
  }, 200);
};

// Filter services based on search query
const filteredServices = (index: number) => {
  const query = serviceSearchQueries.value[index]?.toLowerCase() || '';
  
  if (!query) {
    return availableServices;
  }
  
  return availableServices.filter(service => 
    service.name.toLowerCase().includes(query)
  );
};

// Add a new phone number field
const addPhoneNumber = () => {
  formData.value.phoneNumbers.push({
    number: '',
    label: '',
    selectedServices: []
  });
  
  // Add a new empty search query for this phone
  serviceSearchQueries.value.push('');
};

// Remove a phone number field
const removePhoneNumber = (index: number) => {
  formData.value.phoneNumbers.splice(index, 1);
  serviceSearchQueries.value.splice(index, 1);
};

// Handle form submission
const handleSubmit = () => {
  // Format the data 
  const formattedData = {
    ...formData.value,
    phoneNumbers: formData.value.phoneNumbers.map(phone => {
      // Get the full service names based on selected IDs
      const services = phone.selectedServices.map(id => 
        availableServices.find(service => service.id === id)?.name || id
      );
      
      return {
        number: phone.number,
        label: phone.label,
        services, // Use the array of service names
      };
    })
  };
  
  console.log('Submitting client data:', formattedData);
  
  // Here you would normally send the data to your API
  // For now, we'll just show a success message and redirect
  alert('Client created successfully!');
  // You'd normally use the router to navigate
  window.location.href = '/clients';
};
</script> 