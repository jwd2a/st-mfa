<!-- Add Number Modal Component -->
<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="close" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-xl transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="div" class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ isEditing ? 'Edit 2FA Number' : 'Add New 2FA Number' }}
                </h3>
                <button
                  type="button"
                  class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  @click="close"
                >
                  <span class="sr-only">Close</span>
                  <Icon name="lucide:x" class="h-6 w-6" />
                </button>
              </DialogTitle>

              <div class="p-6 space-y-6">
                <!-- Label -->
                <div>
                  <label for="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Label</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="label"
                      v-model="form.label"
                      placeholder="e.g., Accounting Services"
                      class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <!-- Number -->
                <div>
                  <label for="number" class="block text-sm font-medium text-gray-700 dark:text-gray-300">2FA Number</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="number"
                      v-model="form.number"
                      placeholder="e.g., +1 (555) 123-4567"
                      class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <!-- Services -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Services</label>
                  <div class="mt-1">
                    <div class="flex items-center space-x-2">
                      <input
                        type="text"
                        v-model="newService"
                        placeholder="e.g., QuickBooks"
                        @keyup.enter="addService"
                        class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        @click="addService"
                        type="button"
                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Add
                      </button>
                    </div>
                    <!-- Service Tags -->
                    <div class="mt-2 flex flex-wrap gap-2">
                      <span
                        v-for="(service, index) in form.services"
                        :key="index"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {{ service }}
                        <button
                          @click="removeService(index)"
                          type="button"
                          class="ml-1 inline-flex items-center p-0.5 rounded-full text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800"
                        >
                          <Icon name="lucide:x" class="h-3 w-3" />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Initial Access -->
                <div>
                  <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Initial Access</h3>
                  
                  <!-- Users -->
                  <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">Users</label>
                    <div class="mt-1">
                      <button
                        @click="showUserSelect = true"
                        type="button"
                        class="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        <Icon name="lucide:plus" class="-ml-0.5 mr-1.5 h-4 w-4" />
                        Add User
                      </button>
                    </div>
                    <!-- Selected Users -->
                    <div class="mt-2">
                      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                        <li
                          v-for="(user, index) in form.users"
                          :key="index"
                          class="py-2 flex items-center justify-between"
                        >
                          <div class="flex items-center">
                            <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ user.name }}</span>
                            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</span>
                          </div>
                          <button
                            @click="removeUser(index)"
                            type="button"
                            class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Remove
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- Teams -->
                  <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-500 dark:text-gray-400">Teams</label>
                    <div class="mt-1">
                      <button
                        @click="showTeamSelect = true"
                        type="button"
                        class="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        <Icon name="lucide:plus" class="-ml-0.5 mr-1.5 h-4 w-4" />
                        Add Team
                      </button>
                    </div>
                    <!-- Selected Teams -->
                    <div class="mt-2">
                      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                        <li
                          v-for="(team, index) in form.teams"
                          :key="index"
                          class="py-2 flex items-center justify-between"
                        >
                          <div class="flex items-center">
                            <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ team.name }}</span>
                            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">{{ team.memberCount }} members</span>
                          </div>
                          <button
                            @click="removeTeam(index)"
                            type="button"
                            class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Remove
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Cost Summary - Only show when creating -->
                <div v-if="!isEditing" class="p-6 space-y-6">
                  <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">Cost Summary</h4>
                    <div class="mt-2 space-y-2">
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-500 dark:text-gray-400">2FA Number</span>
                        <span class="text-gray-900 dark:text-gray-100">$5.00/month</span>
                      </div>
                      <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex justify-between text-sm font-medium">
                          <span class="text-gray-900 dark:text-gray-100">Total Additional Cost</span>
                          <span class="text-gray-900 dark:text-gray-100">$5.00/month</span>
                        </div>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          This will be added to your next monthly bill
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <p v-if="!isEditing" class="text-xs text-gray-500 dark:text-gray-400 max-w-[240px] sm:max-w-none">
                    By clicking Create, you agree to the additional monthly charge
                  </p>
                  <div v-else class="flex-1"></div>
                  <div class="flex space-x-3 shrink-0">
                    <button
                      type="button"
                      @click="close"
                      class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap min-w-[100px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      @click="createNumber"
                      class="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap min-w-[100px]"
                    >
                      {{ isEditing ? 'Save Changes' : 'Create Number' }}
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

interface User {
  name: string;
  email: string;
}

interface Team {
  name: string;
  memberCount: number;
}

interface Form {
  label: string;
  number: string;
  services: string[];
  users: User[];
  teams: Team[];
}

interface Props {
  isOpen: boolean;
  initialData?: Form;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'created'): void;
  (e: 'updated'): void;
}>();

const form = ref<Form>({
  label: '',
  number: '',
  services: [],
  users: [],
  teams: []
});

const isEditing = computed(() => !!props.initialData);

const newService = ref('');
const showUserSelect = ref(false);
const showTeamSelect = ref(false);

// Watch for initialData changes and update form
watch(() => props.initialData, (newData) => {
  if (newData) {
    form.value = { ...newData };
  }
}, { immediate: true });

function addService() {
  if (newService.value.trim()) {
    form.value.services.push(newService.value.trim());
    newService.value = '';
  }
}

function removeService(index: number) {
  form.value.services.splice(index, 1);
}

function removeUser(index: number) {
  form.value.users.splice(index, 1);
}

function removeTeam(index: number) {
  form.value.teams.splice(index, 1);
}

function close() {
  emit('close');
  // Reset form
  form.value = {
    label: '',
    number: '',
    services: [],
    users: [],
    teams: []
  };
}

function createNumber() {
  if (isEditing.value) {
    emit('updated');
  } else {
    emit('created');
  }
  close();
}
</script> 