// import React, { Suspense, lazy } from 'react';
// import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     Navigate
// } from 'react-router-dom';
//
// const DashboardPage = lazy(() => import('./pages/DashboardPage'));
// const CVEditorPage = lazy(() => import('./pages/CVEditorPage'));
// // const TemplatesPage = lazy(() => import('./pages/TemplatesPage'));
//
// const CustomFallback = () => (
//     <div className="custom-fallback">
//         <h2>Oops! An unexpected error occurred.</h2>
//         <p>
//             Please try refreshing the page or contact support if the problem
//             persists.
//         </p>
//     </div>
// );
//
// export const App: React.FC = () => {
//     return (
//         <ErrorBoundary fallback={<CustomFallback />}>
//             <Router>
//                 {/* Add a navigation component if needed */}
//                 <Suspense fallback={<div>Loading...</div>}>
//                     <Routes>
//                         <Route
//                             path="/"
//                             element={<Navigate to="/dashboard" replace />}
//                         />
//                         <Route path="/dashboard" element={<DashboardPage />} />
//                         <Route path="/cv/:id" element={<CVEditorPage />} />
//                         {/*<Route path="/templates" element={<TemplatesPage />} />*/}
//                         <Route path="*" element={<h1>404 - Not Found</h1>} />
//                     </Routes>
//                 </Suspense>
//             </Router>
//         </ErrorBoundary>
//     );
// };

// src/App.tsx

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout/Layout';
import RegisterForm from '@/pages/Register/RegisterForm';
import Home from '@/pages/Home/Home';
import './styles/main.scss';
import { ThemeProvider } from '@/context/ThemeProvider';

/**
 * Main application component that sets up routing.
 */
export const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Router>
                <Layout>
                    <Suspense>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/register"
                                element={<RegisterForm />}
                            />
                        </Routes>
                    </Suspense>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

export default App;

/*

mkdir -p src/pages/About src/pages/Profile src/pages/NotFound src/pages/Admin
touch src/pages/About.tsx src/pages/About.module.scss
touch src/pages/Profile.tsx src/pages/Profile.module.scss
touch src/pages/NotFound.tsx src/pages/NotFound.module.scss
touch src/pages/Admin.tsx src/pages/Admin.module.scss
 */
