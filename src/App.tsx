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
import ThemeProvider from '@/context/ThemeProvider';
import About from '@/pages/About/About';

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
                            <Route path="/" Component={Home} />
                            <Route path="/about" Component={About} />
                            {/* Other routes */}
                        </Routes>
                    </Suspense>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

