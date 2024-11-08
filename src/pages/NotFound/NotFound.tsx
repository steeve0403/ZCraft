// src/pages/NotFound/NotFound.tsx

import React from 'react';
import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className={styles.notFound}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" className={styles.notFound__link}>Go to Home</Link>
        </div>
    );
};

export default NotFound;
