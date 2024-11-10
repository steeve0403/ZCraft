import React from 'react';
import './Footer.module.scss';
import Logo from '@/components/common/Logo/Logo';


const Footer = () => (
    <footer className="footer">
        <Logo />
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        <div>
            <a href="/privacy">Privacy Policy</a> |{' '}
            <a href="/terms">Terms of Service</a>
        </div>
    </footer>
);

export default Footer;

