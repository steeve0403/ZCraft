import React from 'react';

interface NavItemProps {
    label: string;
    href: string;
    isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, href, isActive = false }) => {
    return (
        <a
            href={href}
            className={`nav-item ${isActive ? 'active' : ''}`}
            style={styles.link}
        >
            {label}
        </a>
    );
};

const styles = {
    link: {
        textDecoration: 'none',
        color: '#333',
        padding: '0.5rem 1rem',
        fontWeight: 500,
    },
};

export default NavItem;
