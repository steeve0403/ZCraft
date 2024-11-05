// src/store/useSectionStore.ts

import { create } from 'zustand';
import { Section } from '../models/Section';
import { SectionService } from '../services/SectionService';

interface SectionState {
    sections: Section[];
    loading: boolean;
    error: string | null;
    fetchSections: () => Promise<void>;
    addSection: (sectionData: Section) => Promise<void>;
    updateSection: (sectionData: Section) => Promise<void>;
    deleteSection: (sectionId: number) => Promise<void>;
}

export const useSectionStore = create<SectionState>((set) => ({
    sections: [],
    loading: false,
    error: null,

    fetchSections: async () => {
        set({ loading: true, error: null });
        try {
            const sections = await SectionService.getAllSections();
            set({ sections });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    addSection: async (sectionData) => {
        set({ loading: true, error: null });
        try {
            const sectionId = await SectionService.addSection(sectionData);
            sectionData.id = sectionId;
            set((state) => ({ sections: [...state.sections, sectionData] }));
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    updateSection: async (sectionData) => {
        set({ loading: true, error: null });
        try {
            await SectionService.updateSection(sectionData);
            set((state) => ({
                sections: state.sections.map((section) =>
                    section.id === sectionData.id ? sectionData : section
                )
            }));
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    deleteSection: async (sectionId) => {
        set({ loading: true, error: null });
        try {
            await SectionService.deleteSection(sectionId);
            set((state) => ({
                sections: state.sections.filter(
                    (section) => section.id !== sectionId
                )
            }));
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    }
}));
