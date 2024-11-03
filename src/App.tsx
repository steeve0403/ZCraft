// App.tsx

import React from 'react';
import styles from './App.module.scss';
import CVList from './components/CVList/CVList';
import CVForm from './components/CVForm/CVForm';

const App: React.FC = () => {
    return (
        <div className={styles.appContainer}>
            <h1 className={styles.title}>Bienvenue sur Z-Craft</h1>
            <CVForm />
            <CVList />
        </div>
    );
};

export default App;
