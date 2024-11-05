// src/hooks/useSections.ts

import { useSectionStore } from '../store/useSectionStore';
import { useEffect } from 'react';

export const useSections = () => {
    const {
        sections,
        loading,
        error,
        fetchSections,
        addSection,
        updateSection,
        deleteSection
    } = useSectionStore();

    useEffect(() => {
        fetchSections();
    }, [fetchSections]);

    return {
        sections,
        loading,
        error,
        addSection,
        updateSection,
        deleteSection
    };
};
