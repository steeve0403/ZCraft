// src/components/UI/Notification/Notification.tsx

import React from 'react';
import styles from './Notification.module.scss';

interface NotificationProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type = 'info', onClose }) => {
    return (
        <div className={`${styles.notification} ${styles[`notification--${type}`]}`}>
            <span>{message}</span>
            <button className={styles.notification__close} onClick={onClose}>
                &times;
            </button>
        </div>
    );
};

export default Notification;
