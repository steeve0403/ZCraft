import React, { Suspense, lazy } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CVEditorPage = lazy(() => import('./pages/CVEditorPage'));
// const TemplatesPage = lazy(() => import('./pages/TemplatesPage'));

const CustomFallback = () => (
    <div className="custom-fallback">
        <h2>Oops! An unexpected error occurred.</h2>
        <p>
            Please try refreshing the page or contact support if the problem
            persists.
        </p>
    </div>
);

export const App: React.FC = () => {
    return (
        <ErrorBoundary fallback={<CustomFallback />}>
            <Router>
                {/* Add a navigation component if needed */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/dashboard" replace />}
                        />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/cv/:id" element={<CVEditorPage />} />
                        {/*<Route path="/templates" element={<TemplatesPage />} />*/}
                        <Route path="*" element={<h1>404 - Not Found</h1>} />
                    </Routes>
                </Suspense>
            </Router>
        </ErrorBoundary>
    );
};
