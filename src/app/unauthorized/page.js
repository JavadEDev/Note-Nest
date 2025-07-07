import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="unauthorized-container">
            <div className="unauthorized-content">
                <div className="unauthorized-icon">🚫</div>
                <h1 className="unauthorized-title">Access Denied</h1>
                <p className="unauthorized-message">
                    You don't have permission to access this page. This area is restricted to teachers only.
                </p>
                <div className="unauthorized-actions">
                    <Link href="/" className="unauthorized-button">
                        Go Home
                    </Link>
                    <Link href="/profile" className="unauthorized-button unauthorized-button-secondary">
                        Update Profile
                    </Link>
                </div>
            </div>
        </div>
    );
} 