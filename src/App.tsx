import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import Layout from '@/components/layout/Layout/Layout';
import RegisterForm from '@/pages/Register/RegisterForm';
import Home from '@/pages/Home/Home';
import { ThemeProvider } from '@/context/ThemeProvider';

/**
 * Main application component that sets up routing.
 */
export const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Router>
                <Layout>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/home" replace />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/register" element={<RegisterForm />} />
                            {/* Ajoutez d'autres routes ici */}
                            <Route path="*" element={<h1>404 - Not Found</h1>} />
                        </Routes>
                    </Suspense>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

