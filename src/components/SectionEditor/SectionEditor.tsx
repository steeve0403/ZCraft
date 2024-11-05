// src/components/SectionEditor/SectionEditor.tsx

import React from 'react';
import { Section } from '@/types/Section';
import styles from './SectionEditor.module.scss';

interface SectionEditorProps {
    section: Section;
    // eslint-disable-next-line no-unused-vars
    updateSection: (section: Section) => void;
    // eslint-disable-next-line no-unused-vars
    deleteSection: (id: number) => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
    section,
    updateSection,
    deleteSection
}) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        updateSection({ ...section, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.section}>
            <label className={styles.label}>
                Titre de la section
                <input
                    className={styles.input}
                    type="text"
                    name="title"
                    value={section.title}
                    onChange={handleChange}
                    required
                />
            </label>
            <label className={styles.label}>
                Contenu
                <textarea
                    className={styles.textarea}
                    name="content"
                    value={section.content}
                    onChange={handleChange}
                    required
                />
            </label>
            <button
                className={styles.deleteButton}
                type="button"
                onClick={() => deleteSection(section.id!)}
            >
                Supprimer la section
            </button>
        </div>
    );
};
