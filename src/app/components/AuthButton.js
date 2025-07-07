'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

export default function AuthButton() {
    const { data: session, status } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (status === 'loading') {
        return (
            <div className="auth-loading">
                <div className="auth-loading-spinner"></div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="auth-container">
                <button
                    onClick={() => signIn()}
                    className="auth-button auth-button-signin"
                >
                    Sign In
                </button>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-user-info">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="auth-user-button"
                >
                    <div className="auth-avatar">
                        {session.user.image ? (
                            <img
                                src={session.user.image}
                                alt={session.user.name || session.user.email}
                                className="auth-avatar-image"
                            />
                        ) : (
                            <div className="auth-avatar-placeholder">
                                {session.user.name ? session.user.name[0].toUpperCase() : session.user.email[0].toUpperCase()}
                            </div>
                        )}
                    </div>
                    <span className="auth-user-name">
                        {session.user.name || session.user.email}
                    </span>
                    <svg
                        className={`auth-dropdown-arrow ${isDropdownOpen ? 'auth-dropdown-arrow-open' : ''}`}
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                    >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                </button>

                {isDropdownOpen && (
                    <div className="auth-dropdown">
                        <Link href="/profile" className="auth-dropdown-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            Profile
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="auth-dropdown-item auth-dropdown-item-signout"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M12 10V8H6V6h6V4l4 3-4 3z" />
                                <path d="M2 2h8v2H2v8h8v2H2c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2z" />
                            </svg>
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 