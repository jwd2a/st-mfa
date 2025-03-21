# Create a new providers page
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">External Providers</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your external service providers.
        </p>
      </div>
      <button
        @click="openInviteModal"
        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <Icon name="lucide:building-2" class="-ml-1 mr-2 h-5 w-5" />
        Add Provider
      </button>
    </div>

    <!-- Provider List -->
    <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li v-for="provider in providers" :key="provider.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
          <div class="px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center min-w-0 flex-1">
                <img :src="provider.avatar" alt="" class="h-10 w-10 rounded-lg flex-shrink-0" />
                <div class="ml-4 flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <div class="truncate">
                      <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{{ provider.name }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ provider.email }}</p>
                    </div>
                    <div class="flex items-center space-x-4 ml-4">
                      <span class="px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap" :class="{
                        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400': provider.status === 'Active',
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400': provider.status === 'Pending'
                      }">
                        {{ provider.status }}
                      </span>
                      <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {{ provider.assignedNumbers }} numbers
                      </span>
                      <button
                        class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        @click="editProvider(provider)"
                      >
                        <Icon name="lucide:settings" class="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- Invite Modal -->
  <div v-if="showInviteModal" class="modal">
    <div class="modal-content">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
          Add Provider
        </h3>
        <button @click="closeInviteModal" class="text-gray-400 hover:text-gray-500">
          <Icon name="lucide:x" class="h-5 w-5" />
        </button>
      </div>
      <form @submit.prevent="submitInvite" class="space-y-4">
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Provider Name
          </label>
          <input 
            v-model="inviteForm.name" 
            type="text" 
            required
            class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
            placeholder="Acme Security"
          />
        </div>

        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input 
            v-model="inviteForm.email" 
            type="email" 
            required
            class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
            placeholder="team@acmesecurity.com"
          />
        </div>

        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            2FA Numbers
          </label>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Select the numbers you want to assign. Additional numbers will incur a monthly fee.
          </p>
          <div class="space-y-2 max-h-60 overflow-y-auto">
            <label 
              v-for="number in availableNumbers" 
              :key="number.id"
              class="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <input
                type="checkbox"
                v-model="inviteForm.selectedNumbers"
                :value="number.id"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
              />
              <div class="ml-3 flex-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ number.label }}</p>
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ number.phone }}</span>
                </div>
              </div>
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
            Add Provider
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserRole } from '~/composables/useUserRole';

const { isAdmin } = useUserRole();

// Modal state
const showInviteModal = ref(false);

// Form data
const inviteForm = ref({
  name: '',
  email: '',
  selectedNumbers: []
});

// Available numbers for selection
const availableNumbers = ref([
  {
    id: 1,
    label: 'Google Workspace Admin',
    phone: '+1 (555) 123-4567',
  },
  {
    id: 2,
    label: 'AWS Production',
    phone: '+1 (555) 234-5678',
  },
  {
    id: 3,
    label: 'Microsoft Azure',
    phone: '+1 (555) 345-6789',
  },
  {
    id: 4,
    label: 'GitHub Organization',
    phone: '+1 (555) 456-7890',
  },
  {
    id: 5,
    label: 'Stripe Dashboard',
    phone: '+1 (555) 567-8901',
  }
]);

// Providers data
const providers = ref([
  {
    id: 1,
    name: 'Acme Security',
    email: 'team@acmesecurity.com',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Acme+Security&background=6366f1&color=fff',
    assignedNumbers: 3
  },
  {
    id: 2,
    name: 'SecureAuth Partners',
    email: 'support@secureauth.com',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=SecureAuth+Partners&background=06b6d4&color=fff',
    assignedNumbers: 5
  },
  {
    id: 3,
    name: 'CyberGuard Solutions',
    email: 'info@cyberguard.com',
    status: 'Pending',
    avatar: 'https://ui-avatars.com/api/?name=CyberGuard+Solutions&background=10b981&color=fff',
    assignedNumbers: 0
  }
]);

// Methods
const openInviteModal = () => {
  inviteForm.value = {
    name: '',
    email: '',
    selectedNumbers: []
  };
  showInviteModal.value = true;
};

const closeInviteModal = () => {
  inviteForm.value = {
    name: '',
    email: '',
    selectedNumbers: []
  };
  showInviteModal.value = false;
};

const submitInvite = async () => {
  try {
    // TODO: Implement API call
    console.log('Adding provider:', {
      ...inviteForm.value,
      numberCount: inviteForm.value.selectedNumbers.length
    });
    closeInviteModal();
  } catch (error) {
    console.error('Failed to add provider:', error);
  }
};

const editProvider = (provider) => {
  // TODO: Implement provider editing
  console.log('Editing provider:', provider);
};
</script>

<style scoped>
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