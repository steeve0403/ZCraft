// src/context/ErrorContext.tsx

import React, { createContext, useState, ReactNode } from 'react';

interface ErrorContextType {
    error: string | null;
    // eslint-disable-next-line no-unused-vars
    setError: (error: string | null) => void;
}

export const ErrorContext = createContext<ErrorContextType>({
    error: null,
    setError: () => {}
});

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [error, setError] = useState<string | null>(null);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
            {error && (
                <div className="error-banner">
                    <p>{error}</p>
                    <button onClick={() => setError(null)}>Close</button>
                </div>
            )}
        </ErrorContext.Provider>
    );
};
