import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.scss';
import Toggle from '@/components/common/Toggle/Toggle';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            <main className="main-content">
                <section className="home">
                    <h2>Accueil</h2>
                    <p>Ceci est la page d'accueil de l'application.</p>
                    <button className="button button--primary">Cliquez Moi</button>
                    <Toggle />
                </section>
                {/* Ajoute d'autres sections ou composants ici */}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
