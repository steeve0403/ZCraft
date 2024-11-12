import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/services">Services</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
