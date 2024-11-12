import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Layout.module.scss';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.contentWrapper}>
                <main className={styles.mainContent}>{children}</main>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
