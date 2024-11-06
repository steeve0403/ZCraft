import { useAuthStore } from '@/stores/useAuthStore';

/**
 * Utility function to access the auth store's current state.
 * @returns The current state of the auth store.
 */
export const getAuthStore = () => useAuthStore.getState();
