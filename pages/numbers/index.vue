<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">2FA Numbers</h1>
        <button
          @click="openAddModal()"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Icon name="lucide:plus" class="-ml-1 mr-2 h-5 w-5" />
          Add Number
        </button>
      </div>

      <!-- Numbers List -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div v-for="number in numbers" :key="number.id" class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <div class="flex items-center gap-3">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ number.label }}</h3>
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ number.number }}</span>
                </div>
                <div class="mt-1 flex flex-wrap gap-2">
                  <span
                    v-for="service in number.services"
                    :key="service"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {{ service }}
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <button
                  @click="openEditModal(number)"
                  class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <Icon name="lucide:edit" class="h-5 w-5" />
                </button>
                <!-- ... other actions ... -->
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="numbers.length === 0" class="p-12 text-center">
            <Icon name="lucide:phone" class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              No numbers yet
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add your first 2FA number to get started.
            </p>
            <div class="mt-6">
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
    </div>

    <!-- Add/Edit Number Modal -->
    <AddNumberModal
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