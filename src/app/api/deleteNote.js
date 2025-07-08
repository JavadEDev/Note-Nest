"use server"
import { neon } from '@neondatabase/serverless';
import { auth } from '../../auth';

const sql = neon(process.env.DATABASE_URL);

export default async function deleteNote(formData) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }
    if (session?.user?.role !== "teacher") {
        throw new Error("Not authorized");
    }
    const noteId = formData.get("id");
    if (!noteId) {
        throw new Error("Note ID is required.");
    }
    await sql`DELETE FROM notes WHERE id = ${noteId}`;
    return { success: true };
} 