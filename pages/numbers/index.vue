<template>
  <div class="space-y-6">
    <!-- Role Switcher (for demo purposes) -->
    <RoleSwitcher />

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">2FA Numbers</h1>
        <span 
          class="px-2 py-1 text-xs font-medium rounded-full"
          :class="{
            'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400': isAdmin,
            'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400': isUser,
            'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400': isExternal
          }"
        >
          {{ isAdmin ? 'Admin' : isUser ? 'User' : 'External' }}
        </span>
      </div>
      <button
        v-if="canManageNumbers"
        @click="openAddModal()"
        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <Icon name="lucide:plus" class="-ml-1 mr-2 h-5 w-5" />
        Add Number
      </button>
    </div>

    <!-- Role-specific message -->
    <div v-if="isUser" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <Icon name="lucide:info" class="h-5 w-5 text-blue-400" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">View-only Access</h3>
          <div class="mt-1 text-sm text-blue-700 dark:text-blue-300">
            <p>You have view-only access to 2FA numbers. Contact your admin to request additional permissions.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Numbers List -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div v-for="number in numbers" :key="number.id" class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ number.label }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ number.number }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <button
                v-if="canManageNumbers"
                @click="openEditModal(number)"
                class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Icon name="lucide:edit" class="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>
          </div>

          <!-- Services -->
          <div v-if="number.services.length > 0" class="mt-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Services</h4>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="service in number.services"
                :key="service"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
              >
                {{ service }}
              </span>
            </div>
          </div>

          <!-- Users -->
          <div v-if="number.users.length > 0" class="mt-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Users</h4>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="user in number.users"
                :key="user.email"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              >
                {{ user.name }}
              </span>
            </div>
          </div>

          <!-- Teams -->
          <div v-if="number.teams.length > 0" class="mt-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Teams</h4>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="team in number.teams"
                :key="team.name"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
              >
                {{ team.name }} ({{ team.memberCount }} members)
              </span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="numbers.length === 0" class="p-12 text-center">
          <Icon name="lucide:phone" class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No numbers yet</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ canManageNumbers 
              ? 'Add your first 2FA number to get started.' 
              : 'No numbers have been added yet.' 
            }}
          </p>
          <div v-if="canManageNumbers" class="mt-6">
            <button
              @click="openAddModal()"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Icon name="lucide:plus" class="-ml-1 mr-2 h-5 w-5" />
              Add Number
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Number Modal -->
    <AddNumberModal
      v-if="canManageNumbers"
      :is-open="showModal"
      :initial-data="editingNumber"
      @close="closeModal"
      @created="onNumberCreated"
      @updated="onNumberUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddNumberModal from '~/components/AddNumberModal.vue';
import { useUserRole } from '~/composables/useUserRole';
import RoleSwitcher from '~/components/RoleSwitcher.vue';

const { isAdmin, isUser, isExternal, canManageNumbers } = useUserRole();

interface Number {
  id: string;
  label: string;
  number: string;
  services: string[];
  users: { name: string; email: string }[];
  teams: { name: string; memberCount: number }[];
}

const showModal = ref(false);
const editingNumber = ref<Number | undefined>();

const numbers = ref<Number[]>([
  {
    id: 'default',
    label: 'Default Number',
    number: '+1 (555) 000-0000',
    services: [],
    users: [],
    teams: []
  }
]);

function openAddModal() {
  editingNumber.value = undefined;
  showModal.value = true;
}

function openEditModal(number: Number) {
  editingNumber.value = { ...number };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  editingNumber.value = undefined;
}

function onNumberCreated() {
  closeModal();
}

function onNumberUpdated() {
  closeModal();
}
</script> 