import React from 'react';
import './ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * ErrorBoundary is a React component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * @param {React.ReactNode} children - The child components to be wrapped by the ErrorBoundary.
 * @param {React.ReactNode} [fallback] - Optional fallback UI to display when an error is caught.
 */
export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state to display the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // Log error details to the console (can be replaced with a logging service)
        console.error('ErrorBoundary caught an error:', error, info);

        // Optionally, log errors to localStorage for later analysis
        const existingErrors = JSON.parse(
            localStorage.getItem('errors') || '[]'
        );
        existingErrors.push({ error: error.toString(), info });
        localStorage.setItem('errors', JSON.stringify(existingErrors));
    }

    handleReset = () => {
        // Reset the error boundary state to attempt a re-render
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return this.props.fallback ? (
                this.props.fallback
            ) : (
                <div
                    className="error-boundary"
                    role="alert"
                    aria-live="assertive"
                >
                    <div className="error-content">
                        <h1>Oops! Something went wrong.</h1>
                        <p>
                            We're sorry for the inconvenience. Please try the
                            following options:
                        </p>
                        <div className="error-actions">
                            <button
                                onClick={this.handleReset}
                                className="error-button"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => (window.location.href = '/')}
                                className="error-button"
                            >
                                Go to Home
                            </button>
                        </div>
                        {this.state.error && (
                            <details className="error-details">
                                <summary>Error Details</summary>
                                <p>{this.state.error.toString()}</p>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
