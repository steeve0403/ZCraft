// src/hooks/useTags.ts

import { useTagStore } from '../store/useTagStore';
import { useEffect } from 'react';

export const useTags = () => {
    const { tags, loading, error, fetchTags, addTag, deleteTag } =
        useTagStore();

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    return { tags, loading, error, addTag, deleteTag };
};
