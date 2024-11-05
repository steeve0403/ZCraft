// src/pages/CVEditorPage.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import CVForm from '../components/CVForm/CVForm';
import CVPreview from '@/components/CVPreview/CVPreview';

const CVEditorPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>{id === 'new' ? 'Créer un nouveau CV' : 'Éditer le CV'}</h1>
            <CVForm cvId={id} />
            {cvId !== 'new' && cv && <CVPreview cv={cv} />}
        </div>
    );
};

export default CVEditorPage;
