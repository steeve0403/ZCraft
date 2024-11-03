// src/components/CVForm/CVForm.tsx

import React, { useState } from 'react';
import { useCVs } from '../../hooks/useCVs';
import styles from './CVForm.module.scss';

const CVForm: React.FC = () => {
    const { addCV } = useCVs();
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            addCV({ title, sections: [] });
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre du CV"
                required
            />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default CVForm;
