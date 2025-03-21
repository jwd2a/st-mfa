<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">
      <template v-if="isAdmin">Settings</template>
      <template v-else-if="isExternalAdmin">Team Settings</template>
      <template v-else>Profile Settings</template>
    </h1>
    
    <!-- Settings Tabs -->
    <div class="mb-8 border-b border-gray-200 dark:border-gray-700">
      <nav class="flex space-x-4" aria-label="Settings navigation">
        <button 
          v-for="tab in availableTabs"
          :key="tab.id"
          @click="activeTab = tab.id" 
          :class="[
            activeTab === tab.id 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300',
            'px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200'
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Account Settings (available to all) -->
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

    <!-- Team Members (Admin and External Admin only) -->
    <div v-if="activeTab === 'team' && (isAdmin || isExternalAdmin)" class="space-y-6">
      <div class="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">
        <div class="px-4 py-5 sm:px-6 border-b dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                Internal Team Members
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Manage your internal team members and their roles.
              </p>
            </div>
            <button
              @click="openInviteModal"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Icon name="lucide:user-plus" class="-ml-1 mr-2 h-5 w-5" />
              Add Team Member
            </button>
          </div>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                <tr v-for="member in teamMembers.filter(m => m.type === 'Internal')" :key="member.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" :src="member.avatar" alt="" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ member.name }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{{ member.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-gray-100">{{ member.role }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ member.title }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="{
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400': member.status === 'Active',
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400': member.status === 'Pending'
                    }">
                      {{ member.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      v-if="member.status === 'Active'"
                      @click="removeMember(member)"
                      class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Remove
                    </button>
                    <button
                      v-else
                      @click="resendInvite(member)"
                      class="text-primary hover:text-primary/90"
                    >
                      Resend Invite
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin-only sections -->
    <template v-if="isAdmin">
      <div v-if="activeTab === 'subscription'" class="space-y-6">
        <div class="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">
          <div class="px-4 py-5 sm:px-6 border-b dark:border-gray-700">
            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Subscription & Billing</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Manage your subscription and billing information.</p>
          </div>
          <div class="px-4 py-5 sm:p-6">
            <!-- Current Plan -->
            <div class="mb-8">
              <h4 class="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">Current Plan</h4>
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ subscription.plan }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${{ subscription.amount }}/month</p>
                  </div>
                  <span class="px-2.5 py-1 text-xs font-medium rounded-full" :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400': subscription.status === 'active',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400': subscription.status === 'trialing',
                    'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400': subscription.status === 'inactive'
                  }">
                    {{ subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1) }}
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div v-for="feature in subscription.features" :key="feature" class="flex items-center">
                    <Icon name="lucide:check" class="h-5 w-5 text-green-500 mr-2" />
                    <span class="text-sm text-gray-600 dark:text-gray-300">{{ feature }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="mb-8">
              <h4 class="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">Payment Method</h4>
              <div class="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
                <div class="flex items-center">
                  <Icon name="lucide:credit-card" class="h-8 w-8 text-gray-400" />
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                      •••• {{ subscription.paymentMethod.last4 }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Expires {{ subscription.paymentMethod.expiry }}
                    </p>
                  </div>
                </div>
                <button class="text-primary hover:text-primary/80">
                  Update
                </button>
              </div>
            </div>

            <!-- Billing History -->
            <div>
              <h4 class="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">Billing History</h4>
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Invoice</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="item in billingHistory" :key="item.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ item.date }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">${{ item.amount }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400': item.status === 'paid',
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400': item.status === 'pending',
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400': item.status === 'failed'
                        }">
                          {{ item.status.charAt(0).toUpperCase() + item.status.slice(1) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-primary hover:text-primary/80">
                        <a href="#" class="flex items-center">
                          <Icon name="lucide:download" class="h-4 w-4 mr-1" />
                          {{ item.invoice }}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- User-only sections -->
    <template v-if="isUser || isExternalUser">
      <div v-if="activeTab === 'preferences'" class="space-y-6">
        <div class="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">
          <div class="px-4 py-5 sm:px-6 border-b dark:border-gray-700">
            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">User Preferences</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Customize your experience.</p>
          </div>
          <div class="px-4 py-5 sm:p-6">
            <!-- Notifications -->
            <div class="mb-8">
              <h4 class="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">Notifications</h4>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</label>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                  </div>
                  <button 
                    type="button" 
                    @click="preferences.notifications.email = !preferences.notifications.email"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    :class="[preferences.notifications.email ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700']"
                  >
                    <span 
                      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      :class="[preferences.notifications.email ? 'translate-x-5' : 'translate-x-0']"
                    />
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Browser Notifications</label>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Receive notifications in your browser</p>
                  </div>
                  <button 
                    type="button" 
                    @click="preferences.notifications.browser = !preferences.notifications.browser"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    :class="[preferences.notifications.browser ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700']"
                  >
                    <span 
                      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      :class="[preferences.notifications.browser ? 'translate-x-5' : 'translate-x-0']"
                    />
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">SMS Notifications</label>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Receive notifications via SMS</p>
                  </div>
                  <button 
                    type="button" 
                    @click="preferences.notifications.sms = !preferences.notifications.sms"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    :class="[preferences.notifications.sms ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700']"
                  >
                    <span 
                      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      :class="[preferences.notifications.sms ? 'translate-x-5' : 'translate-x-0']"
                    />
                  </button>
                </div>
              </div>
            </div>

            <!-- Appearance -->
            <div class="mb-8">
              <h4 class="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">Appearance</h4>
              <div class="space-y-4">
                <div>
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
                  <select 
                    v-model="preferences.theme"
                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option value="system">System</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>

                <div>
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
                  <select 
                    v-model="preferences.language"
                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Regional -->
            <div>
              <h4 class="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">Regional</h4>
              <div class="space-y-4">
                <div>
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Timezone</label>
                  <select 
                    v-model="preferences.timezone"
                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <div>
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Date Format</label>
                  <select 
                    v-model="preferences.dateFormat"
                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>

  <!-- Modals -->
  <div v-if="showInviteModal" class="modal">
    <div class="modal-content">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
          {{ isExternalAdmin ? 'Invite Internal Team Member' : 'Invite Team Member' }}
        </h3>
        <button @click="closeInviteModal" class="text-gray-400 hover:text-gray-500">
          <Icon name="lucide:x" class="h-5 w-5" />
        </button>
      </div>
      <form @submit.prevent="submitInvite" class="space-y-4">
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input 
            v-model="inviteForm.email" 
            type="email" 
            required
            class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
            placeholder="colleague@example.com"
          />
        </div>
        
        <div v-if="isAdmin" class="form-group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            User Type
          </label>
          <select 
            v-model="inviteForm.userType"
            class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
          >
            <option value="internal">Internal</option>
            <option value="external">External</option>
          </select>
        </div>

        <div v-if="isAdmin && inviteForm.userType === 'internal'" class="form-group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Role
          </label>
          <select 
            v-model="inviteForm.role"
            class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <!-- Number Assignment Section -->
        <div v-if="(isAdmin && (inviteForm.userType === 'external' || inviteForm.role === 'user')) || isExternalAdmin" class="form-group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Assign 2FA Numbers
          </label>
          <div class="bg-gray-50 dark:bg-gray-800 rounded-md p-3 max-h-64 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
            <label 
              v-for="number in availableNumbers" 
              :key="number.id"
              class="flex items-center space-x-3 py-2.5 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
            >
              <div class="flex-shrink-0">
                <input
                  type="checkbox"
                  v-model="inviteForm.selectedNumbers"
                  :value="number.id"
                  class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
              </div>
              <div class="flex-1 min-w-0 flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ number.label }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ number.number }}</span>
                </div>
                <span class="ml-2 flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full" :class="getServiceBadgeClass(number.service)">
                  {{ number.service }}
                </span>
              </div>
            </label>
          </div>
          <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Selected numbers: {{ inviteForm.selectedNumbers.length }}
          </p>
        </div>

        <div v-if="isExternalAdmin" class="form-group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Client Access
          </label>
          <div class="client-checkboxes bg-gray-50 dark:bg-gray-800 rounded-md p-3 max-h-48 overflow-y-auto">
            <label 
              v-for="client in availableClients" 
              :key="client.id"
              class="flex items-center space-x-3 py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <input
                type="checkbox"
                v-model="inviteForm.selectedClients"
                :value="client.id"
                class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ client.name }}</span>
            </label>
          </div>
        </div>

        <div class="modal-actions border-t dark:border-gray-700 pt-4">
          <button 
            type="button" 
            @click="closeInviteModal"
            class="inline-flex justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="ml-3 inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Send Invite
          </button>
        </div>
      </form>
    </div>
  </div>

  <div v-if="showEditAccessModal" class="modal">
    <div class="modal-content">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
          Edit Client Access
        </h3>
        <button @click="closeEditAccessModal" class="text-gray-400 hover:text-gray-500">
          <Icon name="lucide:x" class="h-5 w-5" />
        </button>
      </div>
      <div class="client-checkboxes bg-gray-50 dark:bg-gray-800 rounded-md p-3 max-h-64 overflow-y-auto">
        <label 
          v-for="client in availableClients" 
          :key="client.id"
          class="flex items-center space-x-3 py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <input
            type="checkbox"
            v-model="editAccessForm.selectedClients"
            :value="client.id"
            class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ client.name }}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">({{ client.sharedNumbers }} numbers)</span>
          </div>
        </label>
      </div>
      <div class="modal-actions border-t dark:border-gray-700 pt-4 mt-4">
        <button 
          @click="closeEditAccessModal"
          class="inline-flex justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Cancel
        </button>
        <button 
          @click="saveClientAccess"
          class="ml-3 inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserRole } from '~/composables/useUserRole';

const activeTab = ref('account');
const { isAdmin, isUser, isExternalAdmin, isExternalUser } = useUserRole();

// Available tabs based on role
const availableTabs = computed(() => {
  if (isAdmin.value) {
    return [
      { id: 'account', name: 'Account' },
      { id: 'subscription', name: 'Subscription & Billing' },
      { id: 'team', name: 'Team Members' }
    ];
  } else if (isExternalAdmin.value) {
    return [
      { id: 'account', name: 'Account' },
      { id: 'team', name: 'Internal Team' }
    ];
  } else if (isUser.value || isExternalUser.value) {
    return [
      { id: 'account', name: 'Account' },
      { id: 'preferences', name: 'Preferences' }
    ];
  }
});

// Set initial active tab
onMounted(() => {
  activeTab.value = availableTabs.value[0].id;
});

// Form data
const inviteForm = ref({
  email: '',
  userType: 'internal',
  role: 'user',
  selectedClients: [],
  selectedNumbers: []
});

const editAccessForm = ref({
  selectedClients: [],
  memberId: null
});

// Modal state
const showInviteModal = ref(false);
const showEditAccessModal = ref(false);

// Methods
const openInviteModal = () => {
  inviteForm.value = {
    email: '',
    userType: isExternalAdmin.value ? 'internal' : 'internal',
    role: isExternalAdmin.value ? 'user' : 'user',
    selectedClients: [],
    selectedNumbers: []
  };
  showInviteModal.value = true;
};

const closeInviteModal = () => {
  showInviteModal.value = false;
};

const submitInvite = async () => {
  try {
    if (inviteForm.value.userType === 'external') {
      // Handle provider member invite
      await submitProviderMemberInvite({
        ...inviteForm.value,
        invitedBy: 'admin'
      });
    } else {
      // Handle internal team invite
      await submitTeamInvite({
        ...inviteForm.value,
        invitedBy: isExternalAdmin.value ? 'external-admin' : 'admin'
      });
    }
    closeInviteModal();
  } catch (error) {
    console.error('Failed to send invite:', error);
  }
};

const editClientAccess = (member) => {
  editAccessForm.value = {
    selectedClients: member.clients?.map(c => c.id) || [],
    memberId: member.id
  };
  showEditAccessModal.value = true;
};

const closeEditAccessModal = () => {
  showEditAccessModal.value = false;
};

const saveClientAccess = async () => {
  try {
    // Handle saving client access
    await updateMemberClientAccess(editAccessForm.value);
    closeEditAccessModal();
  } catch (error) {
    console.error('Failed to update client access:', error);
  }
};

const resendInvite = async (member) => {
  try {
    await resendTeamInvite(member.id);
  } catch (error) {
    console.error('Failed to resend invite:', error);
  }
};

const removeMember = async (member) => {
  if (confirm(`Are you sure you want to remove ${member.name}?`)) {
    try {
      await removeTeamMember(member.id);
    } catch (error) {
      console.error('Failed to remove team member:', error);
    }
  }
};

// Account settings
const accountSettings = ref({
  company: '',
  name: '',
  email: '',
  timezone: 'America/New_York'
});

const saveAccountSettings = async () => {
  try {
    await updateAccountSettings(accountSettings.value);
  } catch (error) {
    console.error('Failed to save account settings:', error);
  }
};

// Team members data
const teamMembers = ref([]);
const availableClients = ref([]);

// Initialize mock 2FA numbers immediately
const availableNumbers = ref([
  {
    id: 1,
    label: 'Google Workspace Admin',
    number: '+1 (555) 123-4567',
    service: 'Google',
    description: 'Primary admin authentication for Google Workspace'
  },
  {
    id: 2,
    label: 'AWS Production',
    number: '+1 (555) 234-5678',
    service: 'AWS',
    description: 'Root account and production environment access'
  },
  {
    id: 3,
    label: 'Microsoft Azure',
    number: '+1 (555) 345-6789',
    service: 'Microsoft',
    description: 'Azure cloud infrastructure management'
  },
  {
    id: 4,
    label: 'GitHub Organization',
    number: '+1 (555) 456-7890',
    service: 'GitHub',
    description: 'GitHub organization admin access'
  },
  {
    id: 5,
    label: 'Stripe Dashboard',
    number: '+1 (555) 567-8901',
    service: 'Stripe',
    description: 'Payment processing and financial operations'
  },
  {
    id: 6,
    label: 'Cloudflare',
    number: '+1 (555) 678-9012',
    service: 'Cloudflare',
    description: 'DNS and CDN management'
  },
  {
    id: 7,
    label: 'MongoDB Atlas',
    number: '+1 (555) 789-0123',
    service: 'MongoDB',
    description: 'Database administration and monitoring'
  },
  {
    id: 8,
    label: 'Salesforce Admin',
    number: '+1 (555) 890-1234',
    service: 'Salesforce',
    description: 'CRM administration and user management'
  }
]);

// Load initial data
onMounted(async () => {
  try {
    if (isAdmin.value || isExternalAdmin.value) {
      teamMembers.value = await fetchTeamMembers();
      availableClients.value = await fetchAvailableClients();
    }
  } catch (error) {
    console.error('Failed to load initial data:', error);
  }
});

// API functions
const updateAccountSettings = async (settings) => {
  // TODO: Implement API call
  console.log('Updating account settings:', settings);
};

const fetchTeamMembers = async () => {
  // Mock data for testing
  return [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      title: 'CEO',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Active',
      type: 'Internal',
      clients: []
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Editor',
      title: 'Developer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Active',
      type: 'Internal',
      clients: []
    }
  ];
};

const fetchAvailableClients = async () => {
  // TODO: Implement API call
  return [];
};

const submitTeamInvite = async (inviteData) => {
  // TODO: Implement API call
  console.log('Submitting team invite:', inviteData);
};

const updateMemberClientAccess = async (accessData) => {
  // TODO: Implement API call
  console.log('Updating member client access:', accessData);
};

const resendTeamInvite = async (memberId) => {
  // TODO: Implement API call
  console.log('Resending team invite for member:', memberId);
};

const removeTeamMember = async (memberId) => {
  // TODO: Implement API call
  console.log('Removing team member:', memberId);
};

// User preferences
const preferences = ref({
  notifications: {
    email: true,
    browser: true,
    sms: false
  },
  theme: 'system',
  language: 'en',
  timezone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY'
});

// Subscription data
const subscription = ref({
  plan: 'Professional',
  status: 'active',
  nextBillingDate: '2024-04-15',
  amount: 79,
  paymentMethod: {
    type: 'card',
    last4: '4242',
    expiry: '12/25'
  },
  features: [
    'Unlimited 2FA Numbers',
    'Team Management',
    'Priority Support',
    'Advanced Analytics'
  ]
});

// Billing history
const billingHistory = ref([
  {
    id: 1,
    date: '2024-03-15',
    amount: 79,
    status: 'paid',
    invoice: 'INV-2024-001'
  },
  {
    id: 2,
    date: '2024-02-15',
    amount: 79,
    status: 'paid',
    invoice: 'INV-2024-002'
  }
]);

// Add providers data
const providers = ref([
  {
    id: 1,
    name: 'Acme Security',
    email: 'team@acmesecurity.com',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Acme+Security&background=6366f1&color=fff',
    assignedNumbers: 3,
    members: [
      {
        id: 1,
        name: 'John Smith',
        email: 'john@acmesecurity.com',
        role: 'external-admin'
      },
      {
        id: 2,
        name: 'Sarah Wilson',
        email: 'sarah@acmesecurity.com',
        role: 'external-user'
      }
    ]
  },
  {
    id: 2,
    name: 'SecureAuth Partners',
    email: 'support@secureauth.com',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=SecureAuth+Partners&background=06b6d4&color=fff',
    assignedNumbers: 5,
    members: [
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@secureauth.com',
        role: 'external-admin'
      }
    ]
  }
]);

// Add provider management methods
const editProvider = (provider) => {
  // TODO: Implement provider editing
  console.log('Editing provider:', provider);
};

const addProviderMember = (provider) => {
  inviteForm.value = {
    email: '',
    userType: 'external',
    role: 'external-user',
    selectedNumbers: [],
    providerId: provider.id
  };
  showInviteModal.value = true;
};

// Add provider-specific API functions
const submitProviderMemberInvite = async (inviteData) => {
  // TODO: Implement API call
  console.log('Submitting provider member invite:', inviteData);
};

function getServiceBadgeClass(service) {
  const serviceClasses = {
    'Google': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'AWS': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    'Microsoft': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'GitHub': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    'Stripe': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
    'Cloudflare': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    'MongoDB': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'Salesforce': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
  };
  
  return serviceClasses[service] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
}
</script>

<style scoped>
.settings-container {
  padding: 2rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tab-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
}

.team-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.team-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.team-member {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.member-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.member-actions {
  display: flex;
  gap: 0.5rem;
}

.client-badges {
  display: flex;
  gap: 0.5rem;
}

.client-badge {
  background: #e5e7eb;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 32rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  margin: 2rem;
}

.dark .modal-content {
  background: #1f2937;
}

.form-group {
  margin-bottom: 1rem;
}

.client-checkboxes {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.dark .client-checkboxes {
  border-color: #374151;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

@media (max-width: 640px) {
  .modal-content {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style>
