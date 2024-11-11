import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
    title: string;
    content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
    return (
        <div className={styles.card}>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
};

export default Card;
