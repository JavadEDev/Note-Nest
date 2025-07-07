import { neon } from '@neondatabase/serverless';
import { auth } from '../../auth';
import { redirect } from 'next/navigation';

const sql = neon(process.env.DATABASE_URL);

export default async function fetchNotes() {
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/auth/signin")
    }
    const userId = session.user.id;
    const fromPromise = sql`
        SELECT n.id, n.note, f.name as from_user, t.name as to_user
        FROM notes n
        LEFT JOIN users f ON f.id = n.from_user
        LEFT JOIN users t ON t.id = n.to_user
        WHERE n.from_user = ${userId}
        ORDER BY n.created_at DESC
    `;
    const toPromise = sql`
        SELECT n.id, n.note, f.name as from_user, t.name as to_user
        FROM notes n
        LEFT JOIN users f ON f.id = n.from_user
        LEFT JOIN users t ON t.id = n.to_user
        WHERE n.to_user = ${userId}
        ORDER BY n.created_at DESC
    `;
    const [from, to] = await Promise.all([fromPromise, toPromise]);
    return { from, to };
}  