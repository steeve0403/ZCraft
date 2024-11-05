import React from 'react';
import { useTemplates } from '@/hooks/useTemplates';
import styles from './TemplateSelector.module.scss';

interface TemplateSelectorProps {
    selectedTemplateId?: number;
    // eslint-disable-next-line no-unused-vars
    setSelectedTemplateId: (id: number) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
    selectedTemplateId,
    setSelectedTemplateId
}) => {
    const { templates } = useTemplates();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Choisir un modèle</h2>
            <div className={styles.templateList}>
                {templates.map((template) => (
                    <label key={template.id} className={styles.templateItem}>
                        <input
                            type="radio"
                            name="template"
                            value={template.id}
                            checked={selectedTemplateId === template.id}
                            onChange={() => setSelectedTemplateId(template.id!)}
                        />
                        {template.name}
                    </label>
                ))}
            </div>
        </div>
    );
};
