import React from 'react';
import { Section, SectionType } from '@/types/Section';
import { SectionEditor } from '../SectionEditor/SectionEditor';
import styles from './SectionList.module.scss';

interface SectionListProps {
    sections: Section[];
    // eslint-disable-next-line no-unused-vars
    setSections: (sections: Section[]) => void;
}

export const SectionList: React.FC<SectionListProps> = ({
    sections,
    setSections
}) => {
    const addSection = () => {
        const newSection: Section = {
            id: Date.now(),
            title: '',
            content: '',
            type: SectionType.Text,
            order: sections.length,
            cvId: 0, // Sera mis à jour lors de l'enregistrement du CV
            createdAt: new Date(),
            updatedAt: new Date()
        };
        setSections([...sections, newSection]);
    };

    const updateSection = (updatedSection: Section) => {
        setSections(
            sections.map((section) =>
                section.id === updatedSection.id ? updatedSection : section
            )
        );
    };

    const deleteSection = (id: number) => {
        setSections(sections.filter((section) => section.id !== id));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Sections</h2>
            <button
                className={styles.addButton}
                type="button"
                onClick={addSection}
            >
                + Ajouter une section
            </button>
            {sections.map((section) => (
                <SectionEditor
                    key={section.id}
                    section={section}
                    updateSection={updateSection}
                    deleteSection={deleteSection}
                />
            ))}
        </div>
    );
};
