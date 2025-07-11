"use server"
import { neon } from '@neondatabase/serverless';
import { auth } from '../../auth';
import { redirect } from 'next/navigation';
import { unauthorized } from 'next/navigation'

const sql = neon(process.env.DATABASE_URL);

export default async function teacherFetchNotes(since) {
    const session = await auth();
    if (!session?.user?.id) {
        unauthorized()
    }
    if (session?.user?.role !== "teacher") {
        redirect("/unauthorized");
    }
    if (since) {
        return await sql`
            SELECT n.id, n.note, f.name as from_user, t.name as to_user
            FROM notes n
            LEFT JOIN users f ON f.id = n.from_user
            LEFT JOIN users t ON t.id = n.to_user
            WHERE n.id > ${since}
            ORDER BY n.created_at DESC
            LIMIT 10
        `;
    } else {
        return await sql`
            SELECT n.id, n.note, f.name as from_user, t.name as to_user
            FROM notes n
            LEFT JOIN users f ON f.id = n.from_user
            LEFT JOIN users t ON t.id = n.to_user
            ORDER BY n.created_at DESC
            LIMIT 10
        `;
    }
}
