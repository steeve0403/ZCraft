// src/store/useNotificationStore.ts

import { create } from 'zustand';

interface Notification {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface NotificationState {
    notifications: Notification[];
    addNotification: (message: string, type: Notification['type']) => void;
    removeNotification: (id: number) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
    notifications: [],

    addNotification: (message, type) => {
        const id = Date.now();
        const notification: Notification = { id, message, type };
        set((state) => ({
            notifications: [...state.notifications, notification]
        }));
        // Supprimer la notification après un certain temps
        // eslint-disable-next-line no-undef
        setTimeout(() => {
            get().removeNotification(id);
        }, 5000);
    },

    removeNotification: (id) => {
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id)
        }));
    }
}));
