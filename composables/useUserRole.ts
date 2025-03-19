import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export type UserRole = 'admin' | 'user' | 'external-admin' | 'external-user';

// Helper function to safely access localStorage
const getStoredRole = (): UserRole | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userRole') as UserRole;
  }
  return null;
};

// Helper function to safely set localStorage
const setStoredRole = (role: UserRole): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userRole', role);
  }
};

export const useUserRole = () => {
  const route = useRoute();
  const router = useRouter();
  
  // Get role from localStorage first (if in browser), then URL query parameter, or default to 'admin'
  const currentRole = ref<UserRole>(
    getStoredRole() || 
    (route.query.role as UserRole) || 
    'admin'
  );
  
  // Watch for URL changes and update localStorage
  watch(
    () => route.query.role,
    (newRole) => {
      if (newRole && ['admin', 'user', 'external-admin', 'external-user'].includes(newRole as string)) {
        currentRole.value = newRole as UserRole;
        setStoredRole(newRole as UserRole);
      }
    }
  );
  
  // Watch for currentRole changes and update localStorage
  watch(
    currentRole,
    (newRole) => {
      setStoredRole(newRole);
    }
  );
  
  // Computed properties for role-based access
  const isAdmin = computed(() => currentRole.value === 'admin');
  const isUser = computed(() => currentRole.value === 'user');
  const isExternalAdmin = computed(() => currentRole.value === 'external-admin');
  const isExternalUser = computed(() => currentRole.value === 'external-user');
  const isExternal = computed(() => isExternalAdmin.value || isExternalUser.value);
  
  // Role-based permissions
  const canManageNumbers = computed(() => isAdmin.value);
  const canManageUsers = computed(() => isAdmin.value || isExternalAdmin.value);
  const canManageSettings = computed(() => isAdmin.value);
  const canManageTeam = computed(() => isAdmin.value || isExternalAdmin.value);
  const canViewClients = computed(() => isExternalAdmin.value || isExternalUser.value);
  const canManageClients = computed(() => isExternalAdmin.value);
  
  // Function to switch roles
  const switchRole = (role: UserRole) => {
    currentRole.value = role;
    // Update URL without triggering a navigation
    router.replace({ query: { ...route.query, role } });
  };
  
  return {
    currentRole,
    isAdmin,
    isUser,
    isExternal,
    isExternalAdmin,
    isExternalUser,
    canManageNumbers,
    canManageUsers,
    canManageSettings,
    canManageTeam,
    canViewClients,
    canManageClients,
    switchRole
  };
}; 