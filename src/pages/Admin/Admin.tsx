// src/pages/Admin/AdminDashboard.tsx

import React from 'react';
import styles from './AdminDashboard.module.scss';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'react-router-dom';
import { Permission } from '@/models/Permission';

const AdminDashboard: () => Response = () => {
    const { user, hasPermission } = useAuth();

    if (!user || !hasPermission(Permission.MANAGE_USERS)) {
        return redirect('/');
    }

    return (
        <div className={styles.adminDashboard}>
            <Sidebar />
            <main className={styles.adminDashboard__content}>
                <h1>Admin Dashboard</h1>
                {/* Ajouter des fonctionnalités d'administration ici */}
            </main>
        </div>
    );
};

export default AdminDashboard;
