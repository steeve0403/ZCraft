// src/components/common/Modal/Modal.tsx

import React from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {title && <h2 className={styles.modalTitle}>{title}</h2>}
                <div className={styles.modalBody}>{children}</div>
                <button className={styles.modalClose} onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Modal;
