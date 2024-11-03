// src/store/useCVStore.ts

import { create } from 'zustand';
import { CV } from '../database/db';

interface CVState {
    cvs: CV[];
    setCVs: (cvs: CV[]) => void;
    addCV: (cv: CV) => void;
    updateCV: (cv: CV) => void;
    deleteCV: (id: number) => void;
}

export const useCVStore = create<CVState>((set) => ({
    cvs: [],
    setCVs: (cvs) => set({ cvs }),
    addCV: (cv) =>
        set((state) => ({
            cvs: [...state.cvs, cv]
        })),
    updateCV: (cv) =>
        set((state) => ({
            cvs: state.cvs.map((item) => (item.id === cv.id ? cv : item))
        })),
    deleteCV: (id) =>
        set((state) => ({
            cvs: state.cvs.filter((cv) => cv.id !== id)
        }))
}));
