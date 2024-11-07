import React, { useEffect } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { initializeAdmin } from '@/database/initAdmin';

/**
 * Main entry point for the application.
 * - This script sets up the root component for rendering the entire app.
 * - StrictMode is used for identifying potential issues during development.
 * - Ensures that the root element exists before attempting to render the app.
 *
 * If the root element is not found, an error is thrown to prevent a silent failure.
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
