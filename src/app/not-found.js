import Link from 'next/link';
import FantasyMotionCard from './components/FantasyMotionCard';

export default function NotFound() {
    return (
        <div className="notfound-container fantasy-bg">
            <FantasyMotionCard className="notfound-card">
                <FantasyMotionCard
                    className="notfound-icon"
                    initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    transition={{ duration: 1, type: 'spring', delay: 0.3 }}
                >
                    🧙‍♂️✨
                </FantasyMotionCard>
                <h1 className="notfound-title">404: Portal Not Found</h1>
                <p className="notfound-message">
                    The page you seek has vanished into the mists of the enchanted forest.<br />
                    Perhaps a spell went awry, or a dragon moved it elsewhere.<br />
                    <span className="notfound-highlight">Fear not, brave traveler!</span>
                </p>
                <FantasyMotionCard
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                >
                    <Link href="/" className="notfound-home-btn">
                        Return to the Magical Home
                    </Link>
                </FantasyMotionCard>
            </FantasyMotionCard>
        </div>
    );
} 