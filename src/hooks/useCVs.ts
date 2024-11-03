import { useEffect } from 'react';
import { useCVStore } from '../store/useCVStore';
import { db, CV } from '../database/db';

export const useCVs = () => {
    const cvs = useCVStore((state) => state.cvs);
    const setCVs = useCVStore((state) => state.setCVs);

    useEffect(() => {
        const loadCVs = async () => {
            const allCVs = await db.cvs.toArray();
            setCVs(allCVs);
        };

        loadCVs();
    }, [setCVs]);

    const addCV = async (cv: CV) => {
        const id = await db.cvs.add(cv);
        const newCV = { ...cv, id };
        useCVStore.getState().addCV(newCV);
    };

    const updateCV = async (cv: CV) => {
        await db.cvs.put(cv);
        useCVStore.getState().updateCV(cv);
    };

    const deleteCV = async (id: number) => {
        await db.cvs.delete(id);
        useCVStore.getState().deleteCV(id);
    };

    return { cvs, addCV, updateCV, deleteCV };
};
