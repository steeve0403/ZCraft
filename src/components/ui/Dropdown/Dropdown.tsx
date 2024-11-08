// src/components/UI/Dropdown/Dropdown.tsx

import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';

interface DropdownProps {
    label: string;
    items: { label: string; onClick: () => void }[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <button className={styles.dropdown__button} onClick={toggleDropdown}>
                {label}
            </button>
            {isOpen && (
                <ul className={styles.dropdown__menu}>
                    {items.map((item, index) => (
                        <li key={index} className={styles.dropdown__item} onClick={item.onClick}>
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
