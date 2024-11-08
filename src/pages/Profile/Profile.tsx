// src/pages/Profile/Profile.tsx

import React from 'react';
import styles from './Profile.module.scss';
import { useAuth } from '@/hooks/useAuth';

const Profile: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <div className={styles.profile}>Loading...</div>;
    }

    return (
        <div className={styles.profile}>
            <h1>My Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            {/* Ajouter plus de détails et de fonctionnalités selon les besoins */}
        </div>
    );
};

export default Profile;
