'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthErrorPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    const getErrorMessage = (error) => {
        switch (error) {
            case 'Configuration':
                return 'There is a problem with the server configuration. Please contact support.';
            case 'AccessDenied':
                return 'You do not have permission to sign in to this application.';
            case 'Verification':
                return 'The verification token has expired or has already been used. Please try signing in again.';
            case 'Default':
                return 'An error occurred during authentication. Please try again.';
            default:
                return 'An unexpected error occurred. Please try again.';
        }
    };

    return (
        <div className="auth-error-container">
            <div className="auth-error-card">
                <div className="auth-error-icon">⚠️</div>
                <h1 className="auth-error-title">Authentication Error</h1>
                <p className="auth-error-message">
                    {getErrorMessage(error)}
                </p>
                <div className="auth-error-actions">
                    <Link href="/auth/signin" className="auth-error-button">
                        Try Again
                    </Link>
                    <Link href="/" className="auth-error-button auth-error-button-secondary">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
} 