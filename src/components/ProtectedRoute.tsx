import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    isAuthenticated,
    children
}) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

// Usage
// <Route
//     path="/dashboard"
//     element={
//         <ProtectedRoute isAuthenticated={isUserLoggedIn}>
//             <DashboardPage />
//         </ProtectedRoute>
//     }
// />
