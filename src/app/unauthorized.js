import Link from 'next/link'
import FantasyMotionCard from './components/FantasyMotionCard'

export default function UnauthorizedPage() {
    return (
        <div className="unauthorized-container fantasy-bg">
            <FantasyMotionCard className="unauthorized-content"
                initial={{ opacity: 0, scale: 0.8, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
            >
                <FantasyMotionCard
                    className="unauthorized-icon"
                    initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    transition={{ duration: 1, type: 'spring', delay: 0.3 }}
                >
                    🚫
                </FantasyMotionCard>
                <h1 className="unauthorized-title">Unauthorized Portal</h1>
                <p className="unauthorized-message">
                    You do not have permission to access this page.<br /><br />
                    <span style={{ color: '#e53e3e', fontWeight: 'bold' }}>Turn back, or sign in!</span>
                </p>
                <div className="unauthorized-actions">
                    <Link href="/auth/signin" className="unauthorized-button">
                        Sign In
                    </Link>
                    <Link href="/" className="unauthorized-button unauthorized-button-secondary">
                        Go Home
                    </Link>
                </div>
            </FantasyMotionCard>
        </div>
    )
}