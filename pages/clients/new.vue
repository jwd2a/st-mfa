<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Client</h2>
      <div>
        <NuxtLink to="/clients" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <Icon name="lucide:arrow-left" class="h-4 w-4 mr-2" />
          Back to Clients
        </NuxtLink>
      </div>
    </div>

    <!-- Add client form -->
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6 border-b dark:border-gray-700">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Client Information</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Enter the details of your new client.</p>
      </div>
      <div class="px-4 py-5 sm:p-6">
        <form @submit.prevent="saveClient" class="space-y-6">
          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <!-- Company Information -->
            <div class="sm:col-span-4">
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company Name
              </label>
              <div class="mt-1">
                <input 
                  id="name" 
                  v-model="client.name" 
                  type="text" 
                  required
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
            </div>
            
            <div class="sm:col-span-3">
              <label for="industry" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Industry
              </label>
              <div class="mt-1">
                <select 
                  id="industry" 
                  v-model="client.industry" 
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                >
                  <option value="">Select an industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div class="sm:col-span-3">
              <label for="size" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company Size
              </label>
              <div class="mt-1">
                <select 
                  id="size" 
                  v-model="client.size" 
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
            </div>

            <!-- Primary Contact -->
            <div class="sm:col-span-6">
              <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 pb-2 border-b dark:border-gray-700">Primary Contact</h4>
            </div>
            
            <div class="sm:col-span-3">
              <label for="contact-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contact Name
              </label>
              <div class="mt-1">
                <input 
                  id="contact-name" 
                  v-model="client.contactName" 
                  type="text" 
                  required
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
            </div>
            
            <div class="sm:col-span-3">
              <label for="contact-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div class="mt-1">
                <input 
                  id="contact-email" 
                  v-model="client.contactEmail" 
                  type="email" 
                  required
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
            </div>
            
            <div class="sm:col-span-3">
              <label for="contact-phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <div class="mt-1">
                <input 
                  id="contact-phone" 
                  v-model="client.contactPhone" 
                  type="tel" 
                  required
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
            </div>
            
            <div class="sm:col-span-3">
              <label for="contact-role" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <div class="mt-1">
                <input 
                  id="contact-role" 
                  v-model="client.contactRole" 
                  type="text" 
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
            </div>

            <!-- Phone Numbers Section -->
            <div class="sm:col-span-6 pt-5">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">2FA Substitute Numbers</h4>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Create Twilio numbers that will receive 2FA codes for your clients.
                  </p>
                </div>
                <button 
                  type="button" 
                  @click="addPhoneNumber"
                  class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Icon name="lucide:plus" class="-ml-0.5 mr-2 h-4 w-4" />
                  Add 2FA Number
                </button>
              </div>
            </div>
            
            <div v-for="(phone, index) in client.phoneNumbers" :key="index" class="sm:col-span-6 space-y-4 rounded-md bg-gray-50 dark:bg-gray-700/50 p-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Twilio Number #{{ index + 1 }}</h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    This number will receive and store 2FA codes
                  </p>
                </div>
                <button 
                  type="button" 
                  @click="removePhoneNumber(index)"
                  class="inline-flex items-center p-1 border border-transparent rounded-md text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Icon name="lucide:trash-2" class="h-4 w-4" />
                  <span class="sr-only">Remove number</span>
                </button>
              </div>
              
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3 lg:col-span-2">
                  <label :for="`phone-label-${index}`" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Number Label
                  </label>
                  <div class="mt-1">
                    <input 
                      :id="`phone-label-${index}`" 
                      v-model="phone.label" 
                      type="text" 
                      required
                      class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md" 
                      placeholder="e.g., Google Accounts, Banking"
                    />
                  </div>
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    A descriptive name to identify this number
                  </p>
                </div>
                
                <div class="sm:col-span-3 lg:col-span-2">
                  <div class="h-full flex flex-col justify-end pb-6">
                    <div class="rounded-md bg-blue-50 dark:bg-blue-900/20 p-2">
                      <div class="flex">
                        <div class="flex-shrink-0">
                          <Icon name="lucide:info" class="h-5 w-5 text-blue-400" />
                        </div>
                        <div class="ml-3 flex-1 md:flex md:justify-center">
                          <p class="text-xs text-blue-700 dark:text-blue-300 text-center">
                            A Twilio number will be provisioned when you save
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="sm:col-span-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Service Tags
                  </label>
                  <div class="mt-1 relative">
                    <div class="flex items-center">
                      <div class="relative flex-grow">
                        <input 
                          type="text" 
                          v-model="serviceSearchQueries[index]" 
                          @focus="openServiceDropdown(index)"
                          @blur="closeServiceDropdownDelayed(index)"
                          placeholder="Search for services to tag this number with..."
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
                        Add tags to organize this number
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="client.phoneNumbers.length === 0" class="sm:col-span-6">
              <div class="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <Icon name="lucide:alert-triangle" class="h-5 w-5 text-yellow-400" />
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-500">No 2FA numbers</h3>
                    <div class="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                      <p>
                        At least one Twilio number is required to receive 2FA codes for your client's services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div class="sm:col-span-6">
              <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Additional Notes
              </label>
              <div class="mt-1">
                <textarea 
                  id="notes" 
                  v-model="client.notes" 
                  rows="3" 
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                ></textarea>
              </div>
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Any additional information about this client.</p>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3">
            <NuxtLink 
              to="/clients" 
              class="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancel
            </NuxtLink>
            <button 
              type="submit" 
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Create Client
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Mock available Twilio numbers - in real app, this would come from an API
const availableTwilioNumbers = ref([
  { phoneNumber: '+15551234567', friendlyName: 'Client A Number' },
  { phoneNumber: '+15557654321', friendlyName: 'Team B Number' },
  { phoneNumber: '+15559876543', friendlyName: 'Support Number' },
  { phoneNumber: '+15551234568', friendlyName: 'Marketing Number' },
  { phoneNumber: '+15551234569', friendlyName: 'Sales Number' }
]);

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
const serviceSearchQueries = ref([]);
const activeServiceDropdown = ref(-1);
let dropdownTimeout = null;

// Client form data
const client = ref({
  name: '',
  industry: '',
  size: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  contactRole: '',
  phoneNumbers: [
    {
      number: '',
      label: '',
      selectedServices: []
    }
  ],
  notes: ''
});

// Get service name by ID
const getServiceName = (serviceId) => {
  const service = availableServices.find(s => s.id === serviceId);
  return service ? service.name : serviceId;
};

// Toggle a service selection
const toggleService = (phoneIndex, serviceId) => {
  const phone = client.value.phoneNumbers[phoneIndex];
  
  if (phone.selectedServices.includes(serviceId)) {
    // Remove service if already selected
    phone.selectedServices = phone.selectedServices.filter(id => id !== serviceId);
  } else {
    // Add service if not selected
    phone.selectedServices.push(serviceId);
  }
};

// Remove a service from the selected list
const removeService = (phoneIndex, serviceId) => {
  const phone = client.value.phoneNumbers[phoneIndex];
  phone.selectedServices = phone.selectedServices.filter(id => id !== serviceId);
};

// Open the service dropdown
const openServiceDropdown = (index) => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout);
    dropdownTimeout = null;
  }
  activeServiceDropdown.value = index;
};

// Close the service dropdown with a delay to allow click events
const closeServiceDropdownDelayed = (index) => {
  dropdownTimeout = window.setTimeout(() => {
    if (activeServiceDropdown.value === index) {
      activeServiceDropdown.value = -1;
    }
  }, 200);
};

// Filter services based on search query
const filteredServices = (index) => {
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
  client.value.phoneNumbers.push({
    number: '',
    label: '',
    selectedServices: []
  });
  
  // Add a new empty search query for this phone
  serviceSearchQueries.value.push('');
};

// Remove a phone number field
const removePhoneNumber = (index) => {
  client.value.phoneNumbers.splice(index, 1);
  serviceSearchQueries.value.splice(index, 1);
};

// Save client data
const saveClient = () => {
  // Validate phone numbers
  if (client.value.phoneNumbers.length === 0) {
    alert('Please add at least one 2FA number');
    return;
  }
  
  // Check that all phone numbers have a label
  const invalidNumbers = client.value.phoneNumbers.filter(
    phone => !phone.label
  );
  
  if (invalidNumbers.length > 0) {
    alert('All 2FA numbers must have a label');
    return;
  }
  
  // Show loading state
  const isLoading = ref(true);
  
  // Simulate API call to provision Twilio numbers
  setTimeout(() => {
    // Assign mock Twilio numbers to each phone entry
    client.value.phoneNumbers.forEach((phone, index) => {
      // Generate a random US phone number for demo purposes
      const areaCode = Math.floor(Math.random() * 900) + 100;
      const prefix = Math.floor(Math.random() * 900) + 100;
      const lineNumber = Math.floor(Math.random() * 9000) + 1000;
      phone.number = `+1${areaCode}${prefix}${lineNumber}`;
    });
    
    // Format the data for submission
    const formattedData = {
      ...client.value,
      phoneNumbers: client.value.phoneNumbers.map(phone => ({
        number: phone.number,
        label: phone.label,
        services: phone.selectedServices.map(id => getServiceName(id))
      }))
    };
    
    // In a real app, this would send data to an API
    console.log('Saving client with provisioned numbers:', formattedData);
    
    // Hide loading state
    isLoading.value = false;
    
    // Show success message
    alert('Client added successfully! Twilio numbers have been provisioned.');
    
    // Redirect to messages (populated state) 
    router.push('/messages');
  }, 1500);
};
</script> 