"use server"

import { neon } from '@neondatabase/serverless';
import { auth } from '../../auth';

const sql = neon(process.env.DATABASE_URL);

export default async function updateUserRole(formData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }

    const role = formData.get("role");

    if (!role || !['student', 'teacher'].includes(role)) {
        throw new Error("Invalid role. Must be 'student' or 'teacher'.");
    }

    // Update user role in database
    await sql`
    UPDATE users 
    SET role = ${role}
    WHERE id = ${session.user.id}
  `;

    return { success: true, role };
} 