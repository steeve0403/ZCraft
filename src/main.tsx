import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

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

createRoot(rootElement).render(
    <StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </StrictMode>
);
