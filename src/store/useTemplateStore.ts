// src/store/useTemplateStore.ts

import { create } from 'zustand';
import { Template } from '@/types/Template';
import { TemplateService } from '@/services/TemplateService';

interface TemplateState {
    templates: Template[];
    loading: boolean;
    error: string | null;
    fetchTemplates: () => Promise<void>;
    addTemplate: (template: Template) => Promise<void>;
    updateTemplate: (template: Template) => Promise<void>;
    deleteTemplate: (id: number) => Promise<void>;
}

export const useTemplateStore = create<TemplateState>((set, get) => ({
    templates: [],
    loading: false,
    error: null,

    fetchTemplates: async () => {
        set({ loading: true, error: null });
        try {
            const templates = await TemplateService.getAllTemplates();
            set({ templates });
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },

    addTemplate: async (template: Template) => {
        set({ loading: true, error: null });
        try {
            const id = await TemplateService.addTemplate(template);
            template.id = id;
            set((state) => ({ templates: [...state.templates, template] }));
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },

    updateTemplate: async (template: Template) => {
        set({ loading: true, error: null });
        try {
            await TemplateService.updateTemplate(template);
            set((state) => ({
                templates: state.templates.map((item) =>
                    item.id === template.id ? template : item
                )
            }));
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },

    deleteTemplate: async (id: number) => {
        set({ loading: true, error: null });
        try {
            await TemplateService.deleteTemplate(id);
            set((state) => ({
                templates: state.templates.filter(
                    (template) => template.id !== id
                )
            }));
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    }
}));
