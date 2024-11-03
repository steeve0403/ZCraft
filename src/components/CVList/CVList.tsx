// src/components/CVList/CVList.tsx

import React from 'react';
import { useCVs } from '../../hooks/useCVs';
import styles from './CVList.module.scss';

const CVList: React.FC = () => {
    const { cvs, deleteCV } = useCVs();

    return (
        <div className={styles.container}>
            <h2>Mes CV</h2>
            {cvs.length === 0 ? (
                <p>Aucun CV disponible.</p>
            ) : (
                <ul className={styles.cvList}>
                    {cvs.map((cv) => (
                        <li key={cv.id} className={styles.cvItem}>
                            <span>{cv.title}</span>
                            <button onClick={() => deleteCV(cv.id!)}>
                                Supprimer
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CVList;
