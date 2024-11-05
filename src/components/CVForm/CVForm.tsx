import React, { useState, useEffect } from 'react';
import { useCVs } from '@/hooks/useCVs';
import { CV } from '@/types/CV';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CVForm.module.scss';

export const CVForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { cvs, addCV, updateCV } = useCVs();
    const navigate = useNavigate();
    const [cv, setCv] = useState<CV>({
        title: '',
        description: '',
        sections: [],
        createdAt: new Date(),
        updatedAt: new Date()
    });

    useEffect(() => {
        if (id && id !== 'new') {
            const existingCV = cvs.find((cv) => cv.id === Number(id));
            if (existingCV) {
                setCv(existingCV);
            }
        }
    }, [id, cvs]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCv({ ...cv, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id === 'new') {
            await addCV(cv);
        } else {
            await updateCV(cv);
        }
        navigate('/dashboard');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                {id === 'new' ? 'Créer un nouveau CV' : 'Éditer le CV'}
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Titre du CV
                    <input
                        className={styles.input}
                        type="text"
                        name="title"
                        value={cv.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className={styles.label}>
                    Description
                    <textarea
                        className={styles.textarea}
                        name="description"
                        value={cv.description}
                        onChange={handleChange}
                    />
                </label>
                {/* Ici vous pouvez ajouter le composant SectionList */}
                <button className={styles.submitButton} type="submit">
                    {id === 'new' ? 'Créer' : 'Enregistrer'}
                </button>
            </form>
        </div>
    );
};
