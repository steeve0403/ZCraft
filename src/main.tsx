// src/main.tsx

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { initializeAdmin } from '@/database/initAdmin';
import './styles/main.scss';

/**
 * Main entry point for the application.
 */
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element with ID 'root' not found.");
}

// Initialize the admin user if it doesn't exist
initializeAdmin()
    .then(() => {
        console.log('Admin initialized');

        createRoot(rootElement).render(
            <StrictMode>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </StrictMode>
        );
    })
    .catch((error) => {
        console.error('Error during initialization:', error);
    });
