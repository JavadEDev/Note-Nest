'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import updateUserRole from '../api/updateUserRole';

export default function ProfileForm({ user }) {
    const { data: session, update } = useSession();
    const [role, setRole] = useState(user.role || 'student');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('role', role);

            await updateUserRole(formData);
            setMessage('Role updated successfully!');

            // Update the session to reflect the new role
            await update();
        } catch (error) {
            setMessage('Error updating role: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="profile-section">
            <h2 className="profile-section-title">Update Profile</h2>
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="profile-form-group">
                    <label htmlFor="role" className="profile-form-label">
                        Account Type
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="profile-form-select"
                        disabled={isLoading}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                    <p className="profile-form-help">
                        Teachers can access the teacher feed and have additional permissions.
                    </p>
                </div>

                {message && (
                    <div className={`profile-message ${message.includes('Error') ? 'profile-message-error' : 'profile-message-success'}`}>
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    className="profile-form-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Updating...' : 'Update Role'}
                </button>
            </form>
        </div>
    );
} 