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

            <!-- Authentication Options -->
            <div class="sm:col-span-6">
              <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 pb-2 border-b dark:border-gray-700">Authentication Methods</h4>
            </div>
            
            <div class="sm:col-span-6">
              <fieldset>
                <legend class="sr-only">Authentication Methods</legend>
                <div class="space-y-4">
                  <div class="relative flex items-start">
                    <div class="flex items-center h-5">
                      <input 
                        id="auth-sms" 
                        v-model="client.authMethods.sms" 
                        type="checkbox" 
                        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="auth-sms" class="font-medium text-gray-700 dark:text-gray-300">SMS Authentication</label>
                      <p class="text-gray-500 dark:text-gray-400">Send verification codes via text message.</p>
                    </div>
                  </div>
                  
                  <div class="relative flex items-start">
                    <div class="flex items-center h-5">
                      <input 
                        id="auth-email" 
                        v-model="client.authMethods.email" 
                        type="checkbox" 
                        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="auth-email" class="font-medium text-gray-700 dark:text-gray-300">Email Authentication</label>
                      <p class="text-gray-500 dark:text-gray-400">Send verification codes via email.</p>
                    </div>
                  </div>
                  
                  <div class="relative flex items-start">
                    <div class="flex items-center h-5">
                      <input 
                        id="auth-app" 
                        v-model="client.authMethods.app" 
                        type="checkbox" 
                        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="auth-app" class="font-medium text-gray-700 dark:text-gray-300">Authenticator App</label>
                      <p class="text-gray-500 dark:text-gray-400">Time-based one-time passwords (TOTP) via an authenticator app.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
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

// Client form data
const client = ref({
  name: '',
  industry: '',
  size: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  contactRole: '',
  authMethods: {
    sms: true,
    email: false,
    app: false
  },
  notes: ''
});

// Save client data
const saveClient = () => {
  // In a real app, this would send data to an API
  console.log('Saving client:', client.value);
  
  // Show success message
  alert('Client added successfully!');
  
  // Redirect to messages (populated state) 
  router.push('/messages');
};
</script> 