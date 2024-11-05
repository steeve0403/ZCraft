// src/hooks/useCVs.ts

import { useEffect, useCallback, useMemo } from 'react';
import { useCVStore } from '../store/useCVStore';

export const useCVs = (userId: number) => {
    const cvs = useCVStore((state) => state.cvs);
    const loading = useCVStore((state) => state.loading);
    const error = useCVStore((state) => state.error);
    const fetchCVs = useCVStore((state) => state.fetchCVs);
    const addCV = useCVStore((state) => state.addCV);
    const updateCV = useCVStore((state) => state.updateCV);
    const deleteCV = useCVStore((state) => state.deleteCV);

    useEffect(() => {
        fetchCVs(userId);
    }, [userId, fetchCVs]);

    const userCVs = useMemo(
        () => cvs.filter((cv) => cv.userId === userId),
        [cvs, userId]
    );

    const addCVCallback = useCallback(
        (cvData: CV) => {
            addCV(cvData);
        },
        [addCV]
    );

    const updateCVCallback = useCallback(
        (cvData: CV) => {
            updateCV(cvData);
        },
        [updateCV]
    );

    const deleteCVCallback = useCallback(
        (cvId: number) => {
            deleteCV(cvId);
        },
        [deleteCV]
    );

    return {
        cvs: userCVs,
        loading,
        error,
        addCV: addCVCallback,
        updateCV: updateCVCallback,
        deleteCV: deleteCVCallback
    };
};
