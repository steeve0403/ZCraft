// src/store/useTagStore.ts

import { create } from 'zustand';
import { Tag } from '../models/Tag';
import { TagService } from '../services/TagService';

interface TagState {
    tags: Tag[];
    loading: boolean;
    error: string | null;
    fetchTags: () => Promise<void>;
    addTag: (tagData: Tag) => Promise<void>;
    deleteTag: (tagId: number) => Promise<void>;
}

export const useTagStore = create<TagState>((set) => ({
    tags: [],
    loading: false,
    error: null,

    fetchTags: async () => {
        set({ loading: true, error: null });
        try {
            const tags = await TagService.getAllTags();
            set({ tags });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    addTag: async (tagData) => {
        set({ loading: true, error: null });
        try {
            const tagId = await TagService.addTag(tagData);
            tagData.id = tagId;
            set((state) => ({ tags: [...state.tags, tagData] }));
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    deleteTag: async (tagId) => {
        set({ loading: true, error: null });
        try {
            await TagService.deleteTag(tagId);
            set((state) => ({
                tags: state.tags.filter((tag) => tag.id !== tagId)
            }));
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    }
}));
