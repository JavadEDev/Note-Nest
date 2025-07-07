import { auth } from '../../auth';
import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';
import ProfileForm from './ProfileForm';
import UserStats from './UserStats';

const sql = neon(process.env.DATABASE_URL);

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/auth/signin");
    }

    // Get user stats
    const stats = await sql`
    SELECT 
      COUNT(*) FILTER (WHERE from_user = ${session.user.id}) as notes_sent,
      COUNT(*) FILTER (WHERE to_user = ${session.user.id}) as notes_received
    FROM notes
  `;

    const userStats = stats[0];

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1 className="profile-title">Profile</h1>
                <div className="profile-avatar-large">
                    {session.user.image ? (
                        <img
                            src={session.user.image}
                            alt={session.user.name || session.user.email}
                            className="profile-avatar-image"
                        />
                    ) : (
                        <div className="profile-avatar-placeholder">
                            {session.user.name ? session.user.name[0].toUpperCase() : session.user.email[0].toUpperCase()}
                        </div>
                    )}
                </div>
            </div>

            <div className="profile-content">
                <div className="profile-section">
                    <h2 className="profile-section-title">User Information</h2>
                    <div className="profile-info">
                        <div className="profile-info-item">
                            <label>Name:</label>
                            <span>{session.user.name || 'Not set'}</span>
                        </div>
                        <div className="profile-info-item">
                            <label>Email:</label>
                            <span>{session.user.email}</span>
                        </div>
                        <div className="profile-info-item">
                            <label>Account Type:</label>
                            <span className="profile-role">{session.user.role || 'student'}</span>
                        </div>
                    </div>
                </div>

                <UserStats stats={userStats} />

                <ProfileForm user={session.user} />
            </div>
        </div>
    );
} 