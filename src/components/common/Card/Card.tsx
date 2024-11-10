// src/components/common/Card/Card.jsx

import React from 'react';
import './Card.scss';

interface CardProps {
    title: string;
    content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => (
    <div className="card p-3 rounded-lg shadow-md">
        <h2 className="fs-lg fw-bold mb-2">{title}</h2>
        <p className="fs-md text-secondary">{content}</p>
    </div>
);

export default Card;
