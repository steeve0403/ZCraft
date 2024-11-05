import React from 'react';
import { Link } from 'react-router-dom';
import { useCVs } from '@/hooks/useCVs';
import styles from './CVList.module.scss';
import { CVCard } from '@/components/CVCard/CVCard';

export const CVList: React.FC = () => {
    const { cvs, deleteCV } = useCVs();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Mes CV</h1>
            <div className={styles.cvList}>
                {cvs.map((cv) => (
                    <CVCard key={cv.id} cv={cv} onDelete={deleteCV} />
                ))}
            </div>
            <Link to="/cv/new" className={styles.addButton}>
                + Nouveau CV
            </Link>
        </div>
    );
};
