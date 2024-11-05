// src/components/CVPreview/CVPreview.tsx

import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { CV } from '@/database/db';

interface CVPreviewProps {
    cv: CV;
}

const CVPreview: React.FC<CVPreviewProps> = ({ cv }) => {
    const previewRef = useRef<HTMLDivElement>(null);

    const handleExportPDF = () => {
        if (previewRef.current) {
            html2pdf()
                .from(previewRef.current)
                .set({
                    filename: `${cv.title}.pdf`,
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
                })
                .save();
        }
    };

    return (
        <div>
            <button onClick={handleExportPDF}>Exporter en PDF</button>
            <div ref={previewRef}>
                <h1>{cv.title}</h1>
                {cv.sections.map((section) => (
                    <div key={section.id}>
                        <h2>{section.title}</h2>
                        <p>{section.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CVPreview;
