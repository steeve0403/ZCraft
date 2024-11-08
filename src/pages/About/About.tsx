// src/pages/About/About.tsx

import React from 'react';
import styles from './About.module.scss';

const About: React.FC = () => {
    return (
        <div className={styles.about}>
            <h1>About Me</h1>
            <p>This is the about page.</p>
            {/* Ajouter plus de contenu et de composants selon les besoins */}
        </div>
    );
};

export default About;
