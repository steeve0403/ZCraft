// src/components/UI/Tooltip/Tooltip.tsx

import React, { useState } from 'react';
import styles from './Tooltip.module.scss';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className={styles.tooltip}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && <span className={styles.tooltip__content}>{content}</span>}
        </div>
    );
};

export default Tooltip;
