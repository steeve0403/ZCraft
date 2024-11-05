import React from 'react';
import { Link } from 'react-router-dom';
import { CV } from '@/types/CV';
import styles from './CVCard.module.scss';

interface CVCardProps {
    cv: CV;
    // eslint-disable-next-line no-unused-vars
    onDelete: (id: number) => void;
}

export const CVCard: React.FC<CVCardProps> = ({ cv, onDelete }) => {
    return (
        <div className={styles.cvCard}>
            <Link to={`/cv/${cv.id}`} className={styles.cvLink}>
                {cv.title}
            </Link>
            <button
                className={styles.deleteButton}
                onClick={() => onDelete(cv.id!)}
            >
                Supprimer
            </button>
        </div>
    );
};
