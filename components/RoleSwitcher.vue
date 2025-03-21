<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Icon name="lucide:users" class="h-5 w-5 text-gray-400" />
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Switch User Role</span>
      </div>
      <div class="flex items-center space-x-2">
        <button
          v-for="role in roles"
          :key="role.value"
          @click="switchRole(role.value)"
          class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
          :class="[
            currentRole === role.value
              ? role.activeClass
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >
          {{ role.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserRole, type UserRole } from '~/composables/useUserRole';

const { currentRole, switchRole } = useUserRole();

const roles = [
  { 
    label: 'Admin', 
    value: 'admin' as UserRole,
    activeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
  },
  { 
    label: 'User', 
    value: 'user' as UserRole,
    activeClass: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
  },
  { 
    label: 'Provider - Admin', 
    value: 'external-admin' as UserRole,
    activeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
  },
  { 
    label: 'External User', 
    value: 'external-user' as UserRole,
    activeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
  }
];
</script> 