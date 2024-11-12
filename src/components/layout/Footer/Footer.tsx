import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <p>
                    &copy; {new Date().getFullYear()} Z-Craft. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

