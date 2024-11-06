import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { Permission } from '@/models/Permission';

interface RequireAuthProps {
    children: JSX.Element;
    requireAdmin?: boolean;
    requirePermission?: Permission;
}

/**
 * Higher-order component to protect routes based on authentication and permissions.
 * @param children - The component to render if access is granted.
 * @param requireAdmin - If true, only admin users can access.
 * @param requirePermission - Specific permission required to access.
 * @returns The child component or a redirect component.
 */
export const RequireAuth: React.FC<RequireAuthProps> = ({ children, requireAdmin = false, requirePermission }) => {
    const { user, hasPermission } = useAuth();
    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'admin';
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    if (requirePermission && !hasPermission(requirePermission)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

