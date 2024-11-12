import React from 'react';
import styles from './Home.module.scss';

const Home: React.FC = () => {
    return (
        <div className={styles.home}>
            <h2>Accueil</h2>
            <p>Ceci est la page d'accueil de l'application.</p>
            <button className="button button--primary">Cliquez Moi</button>
        </div>
    );
};

export default Home;
