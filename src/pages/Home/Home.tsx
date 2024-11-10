import React from 'react';
import styles from './Home.module.scss';
import Button from '@/components/common/Button/Button';

const Home: React.FC = () => {
    return (
        <div className={styles.home}>
            <h1>Welcome to My Portfolio</h1>
            <p>Explore my projects and get to know more about me.</p>
            <Button variant="primary">View Projects</Button>
        </div>
    );
};

export default Home;
