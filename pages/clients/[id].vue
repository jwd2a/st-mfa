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
        <div class="flex flex-col items-end gap-2">
          <span :class="[
            client.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-500' : 
            client.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500' : 
            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-500',
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'
          ]">
            {{ client.status.charAt(0).toUpperCase() + client.status.slice(1) }}
          </span>
          
          <span v-if="client.billingType === 'self-pay'" :class="[
            client.paymentStatus === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-500' : 
            client.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500' : 
            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-500',
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'
          ]">
            {{ client.paymentStatus === 'paid' ? 'Payment Completed' : 'Payment Required' }}
          </span>
        </div>
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
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Billing Type</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2 flex items-center">
              <span>{{ client.billingType === 'self-pay' ? 'Client Pays' : 'Service Provider Pays' }}</span>
              <div class="ml-4 flex space-x-2">
                <button 
                  @click="toggleBillingType"
                  class="inline-flex items-center px-2 py-1 border border-gray-300 text-xs rounded shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Icon name="lucide:refresh-cw" class="mr-1 h-3 w-3" />
                  Change Billing Type
                </button>
                <button 
                  v-if="client.billingType === 'self-pay' && client.paymentStatus !== 'paid'"
                  @click="sendPaymentLink"
                  class="inline-flex items-center px-2 py-1 border border-transparent text-xs rounded shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Icon name="lucide:mail" class="mr-1 h-3 w-3" />
                  Resend Payment Link
                </button>
                <button 
                  v-if="client.billingType === 'self-pay'"
                  @click="previewPaymentPage"
                  class="inline-flex items-center px-2 py-1 border border-transparent text-xs rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Icon name="lucide:eye" class="mr-1 h-3 w-3" />
                  Preview Payment Page
                </button>
              </div>
            </dd>
          </div>
          <div v-if="client.billingType === 'self-pay'" class="bg-gray-50 dark:bg-gray-700/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Status</dt>
            <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <div class="flex items-center">
                <span :class="[
                  client.paymentStatus === 'paid' ? 'text-green-600 dark:text-green-400' : 
                  client.paymentStatus === 'pending' ? 'text-yellow-600 dark:text-yellow-400' : 
                  'text-red-600 dark:text-red-400'
                ]">
                  {{ client.paymentStatus === 'paid' ? 'Paid' : 'Payment Required' }}
                  <span v-if="client.paymentStatus === 'paid'" class="text-gray-500 dark:text-gray-400 ml-2 text-xs">
                    (Paid on {{ client.paymentDate }})
                  </span>
                </span>
                
                <!-- Testing buttons, would be removed in production -->
                <div v-if="client.paymentStatus !== 'paid'" class="ml-4">
                  <button 
                    @click="markAsPaid" 
                    class="inline-flex items-center px-2 py-1 border border-transparent text-xs rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Icon name="lucide:check" class="mr-1 h-3 w-3" />
                    Mark as Paid (Test)
                  </button>
                </div>
              </div>
              
              <div v-if="client.paymentStatus !== 'paid'" class="mt-2">
                <div class="flex items-center">
                  <Icon name="lucide:link" class="h-4 w-4 text-gray-400 mr-1" />
                  <span class="text-sm text-gray-500 dark:text-gray-400">Payment Link:</span>
                </div>
                <div class="mt-1 flex items-center">
                  <input 
                    type="text" 
                    readonly 
                    :value="getPaymentLink()"
                    class="flex-1 shadow-sm focus:ring-primary focus:border-primary block w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md"
                  />
                  <button 
                    @click="copyPaymentLink" 
                    class="ml-2 inline-flex items-center px-2 py-1 border border-gray-300 text-xs rounded shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Icon name="lucide:copy" class="h-3 w-3" />
                  </button>
                </div>
              </div>
            </dd>
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
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">2FA Substitute Numbers</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Twilio numbers that receive and store 2FA codes for this client.
          </p>
        </div>
        <button 
          type="button" 
          @click="openAddPhoneModal"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Icon name="lucide:plus" class="-ml-0.5 mr-2 h-4 w-4" />
          Add 2FA Number
        </button>
      </div>
      
      <div class="border-t border-gray-200 dark:border-gray-700">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <li v-for="(phone, index) in client.phoneNumbers" :key="index" class="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div class="flex items-start justify-between">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="lucide:phone" class="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div class="ml-4">
                  <div class="flex flex-wrap items-center gap-2">
                    <h2 class="text-sm font-medium text-gray-900 dark:text-gray-100">+{{ phone.number }}</h2>
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-500">
                      Active
                    </span>
                    
                    <!-- Service Labels -->
                    <div class="flex flex-wrap gap-1">
                      <span 
                        v-for="(service, sIndex) in phone.services" 
                        :key="sIndex" 
                        class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/20 px-2 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-400"
                      >
                        {{ service }}
                      </span>
                    </div>
                  </div>
                  <div class="mt-1 flex items-center">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ phone.label || 'Unlabeled' }}
                    </p>
                    <span v-if="!phone.services || phone.services.length === 0" class="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      No services specified
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="flex space-x-2">
                <button 
                  type="button" 
                  @click="managePhoneAccess(index)"
                  class="inline-flex items-center p-1.5 border border-gray-300 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Icon name="lucide:users" class="h-4 w-4" />
                  <span class="sr-only">Manage access</span>
                </button>
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

            <!-- User Access Information -->
            <div class="mt-2 ml-14 border-t border-gray-100 dark:border-gray-700 pt-2">
              <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Icon name="lucide:users" class="h-4 w-4 mr-1" />
                <span>
                  {{ 
                    phone.assignedUsers && phone.assignedUsers.length > 0
                      ? `${phone.assignedUsers.length} user${phone.assignedUsers.length > 1 ? 's' : ''} have access`
                      : 'No users assigned'
                  }}
                </span>
                <div v-if="phone.assignedUsers && phone.assignedUsers.length > 0" class="ml-2 flex -space-x-1 overflow-hidden">
                  <div
                    v-for="(user, uIndex) in phone.assignedUsers.slice(0, 3)"
                    :key="uIndex"
                    class="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                  >
                    <template v-if="'avatar' in user && user.avatar">
                      <div 
                        class="h-6 w-6 rounded-full bg-cover bg-center"
                        :style="{ backgroundImage: `url(${user.avatar})` }"
                      ></div>
                    </template>
                    <template v-else>
                      <div 
                        class="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300"
                      >
                        {{ user.name.charAt(0) }}
                      </div>
                    </template>
                  </div>
                  <div
                    v-if="phone.assignedUsers.length > 3"
                    class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 ring-2 ring-white dark:ring-gray-800"
                  >
                    +{{ phone.assignedUsers.length - 3 }}
                  </div>
                </div>
              </div>
              <div v-if="phone.assignedTeams && phone.assignedTeams.length > 0" class="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                <Icon name="lucide:users-2" class="h-4 w-4 mr-1" />
                <span>
                  {{ 
                    `${phone.assignedTeams.length} team${phone.assignedTeams.length > 1 ? 's' : ''} have access`
                  }}
                </span>
                <div class="ml-2 flex flex-wrap gap-1">
                  <span 
                    v-for="(team, tIndex) in phone.assignedTeams.slice(0, 2)" 
                    :key="tIndex" 
                    class="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    {{ team.name }}
                  </span>
                  <span 
                    v-if="phone.assignedTeams.length > 2" 
                    class="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-300"
                  >
                    +{{ phone.assignedTeams.length - 2 }} more
                  </span>
                </div>
              </div>
            </div>
          </li>
          
          <li v-if="!client.phoneNumbers || client.phoneNumbers.length === 0" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
            No 2FA numbers found
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
                {{ editMode ? 'Edit 2FA Number' : 'Add New 2FA Number' }}
              </h3>
              <div class="mt-4 space-y-4">
                <!-- Label Field -->
                <div>
                  <label for="new-phone-label" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Number Label
                  </label>
                  <div class="mt-1">
                    <input 
                      id="new-phone-label" 
                      v-model="newPhone.label" 
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
                
                <!-- Twilio Provision Info -->
                <div v-if="!editMode" class="rounded-md bg-blue-50 dark:bg-blue-900/20 p-2">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <Icon name="lucide:info" class="h-5 w-5 text-blue-400" />
                    </div>
                    <div class="ml-3 flex-1 md:flex md:justify-center">
                      <p class="text-xs text-blue-700 dark:text-blue-300 text-center">
                        A new Twilio number will be provisioned when you save
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Services Field -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Service Tags (Optional)
                  </label>
                  <div class="mt-1 relative">
                    <div class="flex items-center">
                      <div class="relative flex-grow">
                        <input 
                          type="text" 
                          v-model="serviceSearchQuery" 
                          @focus="showServiceDropdown = true"
                          @blur="closeServiceDropdownDelayed"
                          placeholder="Search for services to tag this number with..."
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
                        Add tags to organize this number
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
            :disabled="!newPhone.label"
          >
            {{ editMode ? 'Update' : 'Add 2FA Number' }}
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

    <!-- Manage Phone Access Modal -->
    <div v-if="showManageAccessModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          <div>
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
              <Icon name="lucide:users" class="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="modal-title">
                Manage Access to +{{ selectedPhone ? selectedPhone.number : '' }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Control which users and teams have access to this 2FA number.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <div class="space-y-6">
              <!-- User Access Section -->
              <div>
                <div class="flex justify-between items-center mb-3">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Users with Access</h4>
                  <button 
                    @click="showAddUserDropdown = !showAddUserDropdown" 
                    class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Icon name="lucide:plus" class="-ml-0.5 mr-1 h-4 w-4" />
                    Add User
                  </button>
                </div>

                <!-- Add User Dropdown -->
                <div v-if="showAddUserDropdown" class="relative z-10 mb-4">
                  <div class="absolute right-0 w-60 mt-1 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600">
                    <div class="p-2">
                      <input 
                        v-model="userSearchQuery" 
                        type="text" 
                        placeholder="Search users..." 
                        class="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white" 
                      />
                    </div>
                    <ul class="max-h-40 overflow-y-auto py-1 divide-y divide-gray-200 dark:divide-gray-600">
                      <li 
                        v-for="(user, index) in filteredAvailableUsers" 
                        :key="index" 
                        @click="addUserToPhone(user)"
                        class="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      >
                        <div class="flex items-center">
                          <template v-if="'avatar' in user && user.avatar">
                            <div 
                              class="h-8 w-8 rounded-full bg-cover bg-center mr-2"
                              :style="{ backgroundImage: `url(${user.avatar})` }"
                            ></div>
                          </template>
                          <template v-else>
                            <div 
                              class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300 mr-2"
                            >
                              {{ user.name.charAt(0) }}
                            </div>
                          </template>
                          <div>
                            <div class="font-medium">{{ user.name }}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                          </div>
                        </div>
                      </li>
                      <li v-if="filteredAvailableUsers.length === 0" class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                        No matching users found
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="bg-gray-50 dark:bg-gray-700 rounded-md overflow-hidden border border-gray-200 dark:border-gray-600">
                  <ul class="divide-y divide-gray-200 dark:divide-gray-600">
                    <li 
                      v-for="(user, index) in selectedPhone?.assignedUsers || []" 
                      :key="index"
                      class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <div class="flex items-center">
                        <template v-if="'avatar' in user && user.avatar">
                          <div 
                            class="h-8 w-8 rounded-full bg-cover bg-center mr-2"
                            :style="{ backgroundImage: `url(${user.avatar})` }"
                          ></div>
                        </template>
                        <template v-else>
                          <div 
                            class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300 mr-2"
                          >
                            {{ user.name.charAt(0) }}
                          </div>
                        </template>
                        <div>
                          <div class="font-medium text-sm text-gray-900 dark:text-gray-100">{{ user.name }}</div>
                          <div class="text-xs text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                        </div>
                      </div>
                      <button 
                        @click="removeUserFromPhone(index)" 
                        class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        <Icon name="lucide:trash-2" class="h-4 w-4" />
                      </button>
                    </li>
                    <li v-if="!selectedPhone?.assignedUsers || selectedPhone.assignedUsers.length === 0" class="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                      No users have been assigned to this number
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Team Access Section -->
              <div>
                <div class="flex justify-between items-center mb-3">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Teams with Access</h4>
                  <button 
                    @click="showAddTeamDropdown = !showAddTeamDropdown" 
                    class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Icon name="lucide:plus" class="-ml-0.5 mr-1 h-4 w-4" />
                    Add Team
                  </button>
                </div>

                <!-- Add Team Dropdown -->
                <div v-if="showAddTeamDropdown" class="relative z-10 mb-4">
                  <div class="absolute right-0 w-60 mt-1 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600">
                    <div class="p-2">
                      <input 
                        v-model="teamSearchQuery" 
                        type="text" 
                        placeholder="Search teams..." 
                        class="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white" 
                      />
                    </div>
                    <ul class="max-h-40 overflow-y-auto py-1 divide-y divide-gray-200 dark:divide-gray-600">
                      <li 
                        v-for="(team, index) in filteredAvailableTeams" 
                        :key="index" 
                        @click="addTeamToPhone(team)"
                        class="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      >
                        <div class="flex items-center">
                          <div 
                            class="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400 mr-2"
                          >
                            <Icon name="lucide:users" class="h-4 w-4" />
                          </div>
                          <div>
                            <div class="font-medium">{{ team.name }}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">{{ team.memberCount }} members</div>
                          </div>
                        </div>
                      </li>
                      <li v-if="filteredAvailableTeams.length === 0" class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                        No matching teams found
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="bg-gray-50 dark:bg-gray-700 rounded-md overflow-hidden border border-gray-200 dark:border-gray-600">
                  <ul class="divide-y divide-gray-200 dark:divide-gray-600">
                    <li 
                      v-for="(team, index) in selectedPhone?.assignedTeams || []" 
                      :key="index"
                      class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <div class="flex items-center">
                        <div 
                          class="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400 mr-2"
                        >
                          <Icon name="lucide:users" class="h-4 w-4" />
                        </div>
                        <div>
                          <div class="font-medium text-sm text-gray-900 dark:text-gray-100">{{ team.name }}</div>
                          <div class="text-xs text-gray-500 dark:text-gray-400">{{ team.memberCount }} members</div>
                        </div>
                      </div>
                      <button 
                        @click="removeTeamFromPhone(index)" 
                        class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        <Icon name="lucide:trash-2" class="h-4 w-4" />
                      </button>
                    </li>
                    <li v-if="!selectedPhone?.assignedTeams || selectedPhone.assignedTeams.length === 0" class="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                      No teams have been assigned to this number
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <button
            type="button"
            @click="savePhoneAccess"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
          >
            Save Changes
          </button>
          <button
            type="button"
            @click="showManageAccessModal = false"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
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

// Define types for user access control
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Team {
  id: string;
  name: string;
  memberCount: number;
}

interface PhoneNumber {
  number: string;
  label: string;
  services: string[];
  assignedUsers: User[];
  assignedTeams: Team[];
}

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  status: string;
  createdAt: string;
  lastActivity: string;
  notes: string;
  billingType: 'provider-pay' | 'self-pay';
  paymentStatus?: 'paid' | 'pending';
  paymentDate?: string;
  phoneNumbers: PhoneNumber[];
}

// Get the client ID from the route params
const route = useRoute();
const id = computed(() => route.params.id as string);

// Get browser globals for client-side use
// const { window } = useNuxtApp().$getGlobals();

// Modal state for adding phone numbers
const showAddPhoneModal = ref(false);
const editMode = ref(false);
const editIndex = ref(-1);
const newPhone = ref<{
  number: string;
  label: string;
  services: string[];
  assignedUsers: User[];
  assignedTeams: Team[];
}>({
  number: '',
  label: '',
  services: [],
  assignedUsers: [],
  assignedTeams: []
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
    services: [],
    assignedUsers: [],
    assignedTeams: []
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
    services: serviceIds,
    assignedUsers: phone.assignedUsers || [],
    assignedTeams: phone.assignedTeams || []
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
  // Validate the form data
  if (!newPhone.value.label) {
    alert('Please enter a label for the 2FA number');
    return;
  }
  
  if (editMode.value) {
    // Update existing phone number
    client.value.phoneNumbers[editIndex.value] = {
      number: newPhone.value.number,
      label: newPhone.value.label,
      services: newPhone.value.services.map(id => getServiceName(id)),
      assignedUsers: client.value.phoneNumbers[editIndex.value].assignedUsers || [],
      assignedTeams: client.value.phoneNumbers[editIndex.value].assignedTeams || []
    };
    alert('2FA number updated successfully!');
  } else {
    // Simulate API call to provision a new Twilio number
    const isLoading = ref(true);
    
    setTimeout(() => {
      // Generate a random phone number
      const areaCode = Math.floor(Math.random() * 900) + 100;
      const prefix = Math.floor(Math.random() * 900) + 100;
      const lineNumber = Math.floor(Math.random() * 9000) + 1000;
      const phoneNumber = `${areaCode}${prefix}${lineNumber}`;
      
      // Add the new phone number to the client's phone numbers
      client.value.phoneNumbers.push({
        number: phoneNumber,
        label: newPhone.value.label,
        services: newPhone.value.services.map(id => getServiceName(id)),
        assignedUsers: [],
        assignedTeams: []
      });
      
      isLoading.value = false;
      alert('New Twilio 2FA number provisioned successfully!');
    }, 1500);
  }
  
  // Close the modal
  closeAddPhoneModal();
};

// Function to confirm and delete a phone number
const confirmDeletePhoneNumber = (index: number) => {
  if (confirm('Are you sure you want to delete this 2FA number? This will release the number from your Twilio account.')) {
    client.value.phoneNumbers.splice(index, 1);
    alert('2FA number deleted and released successfully!');
  }
};

// Access control state
const showManageAccessModal = ref(false);
const selectedPhoneIndex = ref<number | null>(null);
const selectedPhone = ref<PhoneNumber | null>(null);
const showAddUserDropdown = ref(false);
const showAddTeamDropdown = ref(false);
const userSearchQuery = ref('');
const teamSearchQuery = ref('');

// Sample available users and teams data for the prototype
const availableUsers = ref<User[]>([
  { id: 'user1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 'user2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: 'user3', name: 'Carol Davis', email: 'carol@example.com' },
  { id: 'user4', name: 'David Wilson', email: 'david@example.com' },
  { id: 'user5', name: 'Eve Brown', email: 'eve@example.com' }
]);

const availableTeams = ref<Team[]>([
  { id: 'team1', name: 'Support Team', memberCount: 5 },
  { id: 'team2', name: 'Engineering', memberCount: 8 },
  { id: 'team3', name: 'Sales', memberCount: 4 },
  { id: 'team4', name: 'Operations', memberCount: 6 }
]);

// Computed properties for filtered users and teams
const filteredAvailableUsers = computed(() => {
  if (!userSearchQuery.value) return availableUsers.value;
  
  const query = userSearchQuery.value.toLowerCase();
  return availableUsers.value.filter(user => {
    // Filter out users already assigned to the phone number
    const isAlreadyAssigned = selectedPhone.value?.assignedUsers?.some(assignedUser => assignedUser.id === user.id);
    if (isAlreadyAssigned) return false;
    
    return user.name.toLowerCase().includes(query) || 
           user.email.toLowerCase().includes(query);
  });
});

const filteredAvailableTeams = computed(() => {
  if (!teamSearchQuery.value) return availableTeams.value;
  
  const query = teamSearchQuery.value.toLowerCase();
  return availableTeams.value.filter(team => {
    // Filter out teams already assigned to the phone number
    const isAlreadyAssigned = selectedPhone.value?.assignedTeams?.some(assignedTeam => assignedTeam.id === team.id);
    if (isAlreadyAssigned) return false;
    
    return team.name.toLowerCase().includes(query);
  });
});

// Access management functions
function managePhoneAccess(index: number) {
  selectedPhoneIndex.value = index;
  selectedPhone.value = JSON.parse(JSON.stringify(client.value.phoneNumbers[index]));
  showManageAccessModal.value = true;
  showAddUserDropdown.value = false;
  showAddTeamDropdown.value = false;
}

function addUserToPhone(user: User) {
  if (selectedPhone.value) {
    if (!selectedPhone.value.assignedUsers) {
      selectedPhone.value.assignedUsers = [];
    }
    selectedPhone.value.assignedUsers.push(user);
    showAddUserDropdown.value = false;
  }
}

function removeUserFromPhone(index: number) {
  if (selectedPhone.value && selectedPhone.value.assignedUsers) {
    selectedPhone.value.assignedUsers.splice(index, 1);
  }
}

function addTeamToPhone(team: Team) {
  if (selectedPhone.value) {
    if (!selectedPhone.value.assignedTeams) {
      selectedPhone.value.assignedTeams = [];
    }
    selectedPhone.value.assignedTeams.push(team);
    showAddTeamDropdown.value = false;
  }
}

function removeTeamFromPhone(index: number) {
  if (selectedPhone.value && selectedPhone.value.assignedTeams) {
    selectedPhone.value.assignedTeams.splice(index, 1);
  }
}

function savePhoneAccess() {
  if (selectedPhoneIndex.value !== null && selectedPhone.value) {
    client.value.phoneNumbers[selectedPhoneIndex.value] = selectedPhone.value;
    showManageAccessModal.value = false;
    
    // In a real application, you would save the changes to the backend here
    // api.updateClientPhone(client.value.id, selectedPhoneIndex.value, selectedPhone.value)
  }
}

// Mock client data
const client = ref<Client>({
  id: '12345',
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  company: 'Acme Inc.',
  status: 'active',
  createdAt: '01/15/2023',
  lastActivity: '03/22/2023',
  notes: 'Enterprise client with multiple numbers',
  billingType: 'self-pay',
  paymentStatus: 'pending',
  phoneNumbers: [
    {
      number: '14155552671',
      label: 'Main Account',
      services: ['Google', 'Microsoft', 'Facebook'],
      assignedUsers: [
        { id: 'user1', name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 'user2', name: 'Bob Smith', email: 'bob@example.com' }
      ],
      assignedTeams: [
        { id: 'team1', name: 'Support Team', memberCount: 5 }
      ]
    },
    {
      number: '14155552672',
      label: 'Backup Account',
      services: ['AWS', 'Dropbox'],
      assignedUsers: [],
      assignedTeams: []
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

// Function to send payment link to client
const sendPaymentLink = () => {
  // In a real app, this would send an email with a link to the payment page
  alert(`Payment link sent to ${client.value.email}`);
};

// Function to mark client as paying client
const toggleBillingType = () => {
  if (client.value.billingType === 'provider-pay') {
    client.value.billingType = 'self-pay';
    client.value.paymentStatus = 'pending';
  } else {
    client.value.billingType = 'provider-pay';
    client.value.paymentStatus = undefined;
    client.value.paymentDate = undefined;
  }
};

// Function to view payment page as client would see it
const previewPaymentPage = () => {
  window.open(`/payment/${client.value.id}`, '_blank');
};

// Function to mark client as paid (for testing)
const markAsPaid = () => {
  client.value.paymentStatus = 'paid';
  client.value.paymentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  alert('Client marked as paid!');
};

// Function to get payment link (safe for SSR)
const getPaymentLink = () => {
  if (process.client) {
    return `${window.location.origin}/payment/${client.value.id}`;
  }
  return `/payment/${client.value.id}`;
};

// Function to copy payment link to clipboard
const copyPaymentLink = () => {
  if (process.client) {
    navigator.clipboard.writeText(getPaymentLink());
    alert('Payment link copied to clipboard!');
  }
};
</script> 