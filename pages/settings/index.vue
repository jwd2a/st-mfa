<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Settings</h1>
    
    <!-- Settings Tabs -->
    <div class="mb-8 border-b border-gray-200 dark:border-gray-700">
      <nav class="flex space-x-4" aria-label="Settings navigation">
        <button 
          @click="activeTab = 'account'" 
          :class="[
            activeTab === 'account' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300',
            'px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200'
          ]"
        >
          Account
        </button>
        <button 
          @click="activeTab = 'subscription'" 
          :class="[
            activeTab === 'subscription' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300',
            'px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200'
          ]"
        >
          Subscription
        </button>
        <button 
          @click="activeTab = 'billing'" 
          :class="[
            activeTab === 'billing' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300',
            'px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200'
          ]"
        >
          Billing
        </button>
        <button 
          @click="activeTab = 'team'" 
          :class="[
            activeTab === 'team' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300',
            'px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200'
          ]"
        >
          Team Members
        </button>
        <button 
          @click="activeTab = 'api'" 
          :class="[
            activeTab === 'api' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300',
            'px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200'
          ]"
        >
          API Keys
        </button>
      </nav>
    </div>

    <!-- Account Settings -->
    <div v-if="activeTab === 'account'" class="space-y-6">
      <div class="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">
        <div class="px-4 py-5 sm:px-6 border-b dark:border-gray-700">
          <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Account Information</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Update your account details and preferences.</p>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <form @submit.prevent="saveAccountSettings" class="space-y-6">
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="company" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Name
                </label>
                <div class="mt-1">
                  <input 
                    id="company" 
                    v-model="accountSettings.company" 
                    type="text" 
                    class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
              </div>
              
              <div class="sm:col-span-3">
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Name
                </label>
                <div class="mt-1">
                  <input 
                    id="name" 
                    v-model="accountSettings.name" 
                    type="text" 
                    class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
              </div>
              
              <div class="sm:col-span-4">
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div class="mt-1">
                  <input 
                    id="email" 
                    v-model="accountSettings.email" 
                    type="email" 
                    class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
              </div>
              
              <div class="sm:col-span-6">
                <label for="timezone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Timezone
                </label>
                <div class="mt-1">
                  <select 
                    id="timezone" 
                    v-model="accountSettings.timezone" 
                    class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="pt-5">
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Subscription Settings -->
    <div v-if="activeTab === 'subscription'" class="space-y-6">
      <div class="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">
        <div class="px-4 py-5 sm:px-6 border-b dark:border-gray-700">
          <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Current Plan</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Manage your subscription plan.</p>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div class="border dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ subscription.plan.name }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ subscription.plan.description }}</p>
                <div class="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  Active
                </div>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">${{ subscription.plan.price }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">per month</p>
              </div>
            </div>
            
            <div class="mt-6">
              <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300">Includes:</h5>
              <ul class="mt-2 space-y-2">
                <li v-for="(feature, index) in subscription.plan.features" :key="index" class="flex items-start">
                  <Icon name="lucide:check" class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ feature }}</span>
                </li>
              </ul>
            </div>
            
            <div class="mt-6 space-y-3">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Next billing on <span class="font-medium text-gray-900 dark:text-gray-100">{{ subscription.nextBillingDate }}</span>
              </p>
              <div class="flex space-x-3">
                <button
                  @click="showChangePlanModal = true"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Change Plan
                </button>
                
                <button
                  @click="showCancelModal = true"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-red-700 dark:text-red-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
          
          <!-- Usage Stats -->
          <div class="mt-6">
            <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Current Usage</h4>
            
            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Authentications</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ subscription.usage.authentications }} / {{ subscription.plan.limits.authentications }}</p>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div class="bg-primary h-2.5 rounded-full" :style="`width: ${(subscription.usage.authentications / subscription.plan.limits.authentications) * 100}%`"></div>
                </div>
              </div>
              
              <div>
                <div class="flex items-center justify-between mb-1">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">API Calls</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ subscription.usage.apiCalls }} / {{ subscription.plan.limits.apiCalls }}</p>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div class="bg-primary h-2.5 rounded-full" :style="`width: ${(subscription.usage.apiCalls / subscription.plan.limits.apiCalls) * 100}%`"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Billing Settings -->
    <div v-if="activeTab === 'billing'" class="space-y-6">
      <div class="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">
        <div class="px-4 py-5 sm:px-6 border-b dark:border-gray-700">
          <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Payment Method</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Manage your payment information.</p>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-16 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                <Icon name="lucide:credit-card" class="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">Visa ending in {{ billing.paymentMethod.last4 }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Expires {{ billing.paymentMethod.expiryMonth }}/{{ billing.paymentMethod.expiryYear }}</p>
              </div>
            </div>
            <button
              @click="showUpdatePaymentModal = true"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Update
            </button>
          </div>
          
          <div class="mt-6">
            <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-4">Billing History</h4>
            
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  <tr v-for="(invoice, index) in billing.invoices" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ invoice.date }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ invoice.description }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">${{ invoice.amount }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <span class="inline-flex rounded-md text-sm font-medium text-gray-900 dark:text-gray-100">
                        {{ invoice.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">Download</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Members -->
    <div v-if="activeTab === 'team'" class="space-y-6">
      <!-- Teams Section -->
      <div class="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">
        <div class="px-4 py-5 sm:px-6 border-b dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Teams</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Create and manage teams to simplify access control to 2FA numbers.</p>
            </div>
            <button
              @click="showCreateTeamModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Create Team
            </button>
          </div>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Team Name</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Members</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Access Level</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                <tr v-for="(team, index) in teams" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <Icon name="lucide:users" class="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ team.name }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{{ team.description }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex -space-x-1 overflow-hidden">
                        <div
                          v-for="(member, mIndex) in team.members.slice(0, 3)"
                          :key="mIndex"
                          class="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                        >
                          <img
                            v-if="member.avatar"
                            :src="member.avatar"
                            alt=""
                            class="h-6 w-6 rounded-full"
                          />
                          <div 
                            v-else 
                            class="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300"
                          >
                            {{ member.name.charAt(0) }}
                          </div>
                        </div>
                      </div>
                      <div class="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {{ team.members.length }} member{{ team.members.length !== 1 ? 's' : '' }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {{ team.accessLevel }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {{ team.createdAt }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex space-x-3 justify-end">
                      <button
                        @click="editTeam(team)"
                        class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Edit
                      </button>
                      <button
                        @click="confirmDeleteTeam(team)"
                        class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="teams.length === 0">
                  <td colspan="5" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                    No teams found. Create a team to get started.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Team Members Section -->
      <div class="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">
        <div class="px-4 py-5 sm:px-6 border-b dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Team Members</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Manage your team members and their roles.</p>
            </div>
            <button
              @click="showInviteModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Invite Member
            </button>
          </div>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                <tr v-for="(member, index) in team.members" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" :src="member.avatar" alt="" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ member.name }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{{ member.title }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ member.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ member.role }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span :class="{
                      'text-green-800 dark:text-green-400': member.status === 'Active',
                      'text-yellow-800 dark:text-yellow-400': member.status === 'Pending'
                    }" class="text-sm font-medium">
                      {{ member.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      @click="removeTeamMember(member)"
                      class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- API Keys -->
    <div v-if="activeTab === 'api'" class="space-y-6">
      <div class="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">
        <div class="px-4 py-5 sm:px-6 border-b dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">API Keys</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Manage your API keys for accessing the API.</p>
            </div>
            <button
              @click="showCreateKeyModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Create API Key
            </button>
          </div>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Used</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                <tr v-for="(key, index) in apiKeys" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ key.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ key.prefix }}...{{ key.suffix }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ key.created }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ key.lastUsed }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span :class="{
                      'text-green-800 dark:text-green-400': key.status === 'Active',
                      'text-red-800 dark:text-red-400': key.status === 'Revoked'
                    }" class="text-sm font-medium">
                      {{ key.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      v-if="key.status === 'Active'"
                      @click="revokeApiKey(key)"
                      class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Create API Key Modal -->
  <div v-if="showCreateKeyModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
            <Icon name="lucide:key" class="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="modal-title">
              Create API Key
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Create a new API key to access the API. Make sure to copy the key now. You won't be able to see it again!
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <div class="mt-4">
            <label for="key-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Key Name</label>
            <div class="mt-1">
              <input
                type="text"
                name="key-name"
                id="key-name"
                v-model="newApiKey.name"
                class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100"
                placeholder="e.g. Production API Key"
              />
            </div>
          </div>
          <div class="mt-4">
            <label for="key-scope" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Scope</label>
            <div class="mt-1">
              <select
                id="key-scope"
                name="key-scope"
                v-model="newApiKey.scope"
                class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="read">Read Only</option>
                <option value="write">Read & Write</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button
            type="button"
            @click="createApiKey"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
          >
            Create Key
          </button>
          <button
            type="button"
            @click="showCreateKeyModal = false"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Invite Team Member Modal -->
  <div v-if="showInviteModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
            <Icon name="lucide:user-plus" class="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="modal-title">
              Invite Team Member
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Invite a new team member to collaborate on your project.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <div class="mt-4">
            <label for="invite-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <div class="mt-1">
              <input
                type="email"
                name="invite-email"
                id="invite-email"
                v-model="newTeamMember.email"
                class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100"
                placeholder="colleague@example.com"
              />
            </div>
          </div>
          <div class="mt-4">
            <label for="invite-role" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <div class="mt-1">
              <select
                id="invite-role"
                name="invite-role"
                v-model="newTeamMember.role"
                class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button
            type="button"
            @click="inviteTeamMember"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
          >
            Send Invitation
          </button>
          <button
            type="button"
            @click="showInviteModal = false"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Create Team Modal -->
  <div v-if="showCreateTeamModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
            <Icon name="lucide:users" class="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="modal-title">
              {{ editingTeam ? 'Edit Team' : 'Create New Team' }}
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ editingTeam ? 'Update team information and members.' : 'Create a new team to manage access to 2FA numbers.' }}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <div class="space-y-4">
            <div>
              <label for="team-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Team Name</label>
              <div class="mt-1">
                <input
                  type="text"
                  name="team-name"
                  id="team-name"
                  v-model="newTeam.name"
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Engineering Team"
                />
              </div>
            </div>
            
            <div>
              <label for="team-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <div class="mt-1">
                <textarea
                  id="team-description"
                  name="team-description"
                  v-model="newTeam.description"
                  rows="3"
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Describe the purpose of this team"
                ></textarea>
              </div>
            </div>
            
            <div>
              <label for="team-access" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Access Level</label>
              <div class="mt-1">
                <select
                  id="team-access"
                  name="team-access"
                  v-model="newTeam.accessLevel"
                  class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="Full Access">Full Access</option>
                  <option value="View Only">View Only</option>
                  <option value="Limited Access">Limited Access</option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Team Members</label>
              <div class="mt-1">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-md overflow-hidden border border-gray-200 dark:border-gray-600">
                  <ul class="divide-y divide-gray-200 dark:divide-gray-600 max-h-48 overflow-y-auto">
                    <li 
                      v-for="(member, index) in newTeam.members" 
                      :key="index"
                      class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <div class="flex items-center">
                        <div 
                          class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300 mr-2"
                        >
                          {{ member.name.charAt(0) }}
                        </div>
                        <div>
                          <div class="font-medium text-sm text-gray-900 dark:text-gray-100">{{ member.name }}</div>
                          <div class="text-xs text-gray-500 dark:text-gray-400">{{ member.email }}</div>
                        </div>
                      </div>
                      <button 
                        @click="removeTeamMember(index)" 
                        class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        <Icon name="lucide:x" class="h-4 w-4" />
                      </button>
                    </li>
                    <li v-if="newTeam.members.length === 0" class="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                      No members added to this team
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mt-2">
                <button 
                  @click="showAddTeamMemberModal = true"
                  type="button" 
                  class="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Icon name="lucide:plus" class="-ml-0.5 mr-1 h-4 w-4" />
                  Add Team Member
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button
            type="button"
            @click="saveTeam"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
          >
            {{ editingTeam ? 'Save Changes' : 'Create Team' }}
          </button>
          <button
            type="button"
            @click="cancelTeamEdit"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Team Member Modal -->
  <div v-if="showAddTeamMemberModal" class="fixed z-20 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
            <Icon name="lucide:user-plus" class="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="modal-title">
              Add Team Member
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Select a user to add to this team.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="mb-4">
            <input 
              v-model="teamMemberSearchQuery" 
              type="text" 
              placeholder="Search users..." 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white" 
            />
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-md overflow-hidden border border-gray-200 dark:border-gray-600">
            <ul class="divide-y divide-gray-200 dark:divide-gray-600 max-h-60 overflow-y-auto">
              <li 
                v-for="(user, index) in filteredAvailableMembers" 
                :key="index"
                @click="addMemberToTeam(user)"
                class="px-4 py-3 flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              >
                <div class="flex items-center">
                  <div 
                    class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300 mr-2"
                  >
                    {{ user.name.charAt(0) }}
                  </div>
                  <div>
                    <div class="font-medium text-sm text-gray-900 dark:text-gray-100">{{ user.name }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                  </div>
                </div>
              </li>
              <li v-if="filteredAvailableMembers.length === 0" class="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                No matching users found
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-5 sm:mt-6 flex justify-end">
          <button
            type="button"
            @click="showAddTeamMemberModal = false"
            class="inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Team Confirmation Modal -->
  <div v-if="showDeleteTeamModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 sm:mx-0 sm:h-10 sm:w-10">
            <Icon name="lucide:alert-triangle" class="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="modal-title">
              Delete Team
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this team? This will remove access for all team members to any 2FA numbers associated with this team. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            @click="deleteTeam"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Delete
          </button>
          <button
            type="button"
            @click="showDeleteTeamModal = false"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Active tab state
const activeTab = ref('team');

// Account settings form
const accountSettings = ref({
  company: 'Acme Inc.',
  name: 'John Doe',
  email: 'john@example.com',
  timezone: 'America/New_York'
});

// Subscription information
const subscription = ref({
  plan: {
    name: 'Professional',
    price: 79,
    description: 'For growing businesses with more authentication needs',
    features: [
      'Up to 5,000 authentications per month',
      'All authentication channels',
      'Advanced reporting',
      'Priority support',
      '5 team members'
    ],
    limits: {
      authentications: 5000,
      apiCalls: 10000
    }
  },
  status: 'active',
  nextBillingDate: 'June 15, 2023',
  usage: {
    authentications: 2850,
    apiCalls: 4200
  }
});

// Billing information
const billing = ref({
  paymentMethod: {
    type: 'card',
    brand: 'visa',
    last4: '4242',
    expiryMonth: '12',
    expiryYear: '2024'
  },
  invoices: [
    {
      date: 'May 15, 2023',
      description: 'Professional Plan - Monthly',
      amount: 79.00,
      status: 'Paid'
    },
    {
      date: 'April 15, 2023',
      description: 'Professional Plan - Monthly',
      amount: 79.00,
      status: 'Paid'
    },
    {
      date: 'March 15, 2023',
      description: 'Professional Plan - Monthly',
      amount: 79.00,
      status: 'Paid'
    }
  ]
});

// Team information
const team = ref({
  members: [
    {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      title: 'CEO',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Active'
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Editor',
      title: 'Developer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Active'
    },
    {
      name: 'Bob Wilson',
      email: 'bob@example.com',
      role: 'Viewer',
      title: 'Designer',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Pending'
    }
  ]
});

// API Keys
const apiKeys = ref([
  {
    name: 'Production API Key',
    prefix: 'pk_live_',
    suffix: '1234',
    created: 'Jan 1, 2023',
    lastUsed: '2 hours ago',
    status: 'Active'
  },
  {
    name: 'Development API Key',
    prefix: 'pk_test_',
    suffix: '5678',
    created: 'Jan 1, 2023',
    lastUsed: '1 day ago',
    status: 'Active'
  },
  {
    name: 'Old Production Key',
    prefix: 'pk_live_',
    suffix: '9012',
    created: 'Dec 1, 2022',
    lastUsed: '1 month ago',
    status: 'Revoked'
  }
]);

// Modal states
const showChangePlanModal = ref(false);
const showCancelModal = ref(false);
const showUpdatePaymentModal = ref(false);
const showInviteModal = ref(false);
const showCreateKeyModal = ref(false);
const showCreateTeamModal = ref(false);
const showAddTeamMemberModal = ref(false);
const showDeleteTeamModal = ref(false);
const editingTeam = ref(false);
const teamToDelete = ref(null);
const teamMemberSearchQuery = ref('');

// New API Key form
const newApiKey = ref({
  name: '',
  scope: 'read'
});

// New Team Member form
const newTeamMember = ref({
  email: '',
  role: 'viewer'
});

// Team management
const teams = ref([
  {
    id: 'team1',
    name: 'Support Team',
    description: 'Handles customer support and account access',
    accessLevel: 'Full Access',
    createdAt: 'March 10, 2023',
    members: [
      { id: 'user1', name: 'Alice Johnson', email: 'alice@example.com', avatar: null },
      { id: 'user2', name: 'Bob Smith', email: 'bob@example.com', avatar: null },
      { id: 'user3', name: 'Carol Davis', email: 'carol@example.com', avatar: null }
    ]
  },
  {
    id: 'team2',
    name: 'Engineering',
    description: 'Technical team that manages the API integration',
    accessLevel: 'Full Access',
    createdAt: 'January 15, 2023',
    members: [
      { id: 'user4', name: 'David Wilson', email: 'david@example.com', avatar: null },
      { id: 'user5', name: 'Eve Brown', email: 'eve@example.com', avatar: null }
    ]
  }
]);

// New team template
const newTeam = ref({
  id: '',
  name: '',
  description: '',
  accessLevel: 'Full Access',
  members: []
});

// Computed properties for filtering available team members
const filteredAvailableMembers = computed(() => {
  if (!teamMemberSearchQuery.value) return availableUsers.value.filter(user => 
    !newTeam.value.members.some(member => member.id === user.id)
  );
  
  const query = teamMemberSearchQuery.value.toLowerCase();
  return availableUsers.value.filter(user => {
    // Filter out users already in the team
    const isAlreadyInTeam = newTeam.value.members.some(member => member.id === user.id);
    if (isAlreadyInTeam) return false;
    
    return user.name.toLowerCase().includes(query) || 
           user.email.toLowerCase().includes(query);
  });
});

// Team management functions
function createTeam() {
  showCreateTeamModal.value = true;
  editingTeam.value = false;
  newTeam.value = {
    id: 'team' + (teams.value.length + 1),
    name: '',
    description: '',
    accessLevel: 'Full Access',
    createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    members: []
  };
}

function editTeam(team) {
  showCreateTeamModal.value = true;
  editingTeam.value = true;
  newTeam.value = JSON.parse(JSON.stringify(team));
}

function saveTeam() {
  if (editingTeam.value) {
    // Find and update existing team
    const index = teams.value.findIndex(team => team.id === newTeam.value.id);
    if (index !== -1) {
      teams.value[index] = newTeam.value;
    }
  } else {
    // Add new team
    teams.value.push(newTeam.value);
  }
  
  showCreateTeamModal.value = false;
  // In a real app, you would save to the backend here
}

function cancelTeamEdit() {
  showCreateTeamModal.value = false;
  showAddTeamMemberModal.value = false;
}

function confirmDeleteTeam(team) {
  teamToDelete.value = team;
  showDeleteTeamModal.value = true;
}

function deleteTeam() {
  if (teamToDelete.value) {
    const index = teams.value.findIndex(team => team.id === teamToDelete.value.id);
    if (index !== -1) {
      teams.value.splice(index, 1);
    }
  }
  
  showDeleteTeamModal.value = false;
  teamToDelete.value = null;
  // In a real app, you would delete from the backend here
}

function addMemberToTeam(user) {
  newTeam.value.members.push(user);
  showAddTeamMemberModal.value = false;
}

function removeTeamMember(index) {
  newTeam.value.members.splice(index, 1);
}

// Form actions (these would connect to real APIs in a production app)
const saveAccountSettings = () => {
  alert('Account settings saved!');
};

// API Key actions
const revokeApiKey = (key) => {
  if (confirm(`Are you sure you want to revoke the API key "${key.name}"?`)) {
    key.status = 'Revoked';
  }
};

// API Key actions
const createApiKey = () => {
  // In a real app, this would make an API call to create the key
  const key = {
    name: newApiKey.value.name,
    prefix: 'pk_live_',
    suffix: Math.random().toString(36).substring(2, 6),
    created: new Date().toLocaleDateString(),
    lastUsed: 'Never',
    status: 'Active'
  };
  apiKeys.value.push(key);
  showCreateKeyModal.value = false;
  newApiKey.value = { name: '', scope: 'read' };
};

// Team member actions
const inviteTeamMember = () => {
  // In a real app, this would make an API call to send the invitation
  const member = {
    name: newTeamMember.value.email.split('@')[0],
    email: newTeamMember.value.email,
    role: newTeamMember.value.role,
    title: 'Team Member',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newTeamMember.value.email.split('@')[0])}&background=random`,
    status: 'Pending'
  };
  team.value.members.push(member);
  showInviteModal.value = false;
  newTeamMember.value = { email: '', role: 'viewer' };
};
</script>
