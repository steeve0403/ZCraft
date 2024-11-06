import { useUserStore } from '@/stores/useUserStore';

/**
 * Custom hook to interact with user-related store actions and state.
 * @returns User-related state and actions.
 */
export const useUser = () => {
    const {
        users,
        loading,
        error,
        fetchUsers,
        deleteUser,
        updateUserRole,
        updateUserProfile,
        getUserProfile
    } = useUserStore((state) => ({
        users: state.users,
        loading: state.loading,
        error: state.error,
        fetchUsers: state.fetchUsers,
        deleteUser: state.deleteUser,
        updateUserRole: state.updateUserRole,
        updateUserProfile: state.updateUserProfile,
        getUserProfile: state.getUserProfile,
    }));

    return {
        users,
        loading,
        error,
        fetchUsers,
        deleteUser,
        updateUserRole,
        updateUserProfile,
        getUserProfile,
    };
};
