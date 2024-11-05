// src/store/useCVStore.ts

import { create } from 'zustand';
import { CV } from '../models/CV';
import { CVService } from '../services/CVServices';

interface CVState {
    cvs: CV[];
    loading: boolean;
    error: string | null;
    fetchCVs: (userId: number) => Promise<void>;
    addCV: (cvData: CV) => Promise<void>;
    updateCV: (cvData: CV) => Promise<void>;
    deleteCV: (cvId: number) => Promise<void>;
}

export const useCVStore = create<CVState>((set) => ({
    cvs: [],
    loading: false,
    error: null,

    fetchCVs: async (userId) => {
        set({ loading: true, error: null });
        try {
            const cvs = await CVService.getCVsByUser(userId);
            set({ cvs });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    addCV: async (cvData) => {
        set({ loading: true, error: null });
        try {
            const cvId = await CVService.addCV(cvData);
            cvData.id = cvId;
            set((state) => ({ cvs: [...state.cvs, cvData] }));
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    updateCV: async (cvData) => {
        set({ loading: true, error: null });
        try {
            await CVService.updateCV(cvData);
            set((state) => ({
                cvs: state.cvs.map((cv) => (cv.id === cvData.id ? cvData : cv))
            }));
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    deleteCV: async (cvId) => {
        set({ loading: true, error: null });
        try {
            await CVService.deleteCV(cvId);
            set((state) => ({
                cvs: state.cvs.filter((cv) => cv.id !== cvId)
            }));
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    }
}));
