"use server"
import { neon } from '@neondatabase/serverless';
import { auth } from '../../auth';

const sql = neon(process.env.DATABASE_URL);

export default async function editNote(formData) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }
    if (session?.user?.role !== "teacher") {
        throw new Error("Not authorized");
    }
    const noteId = formData.get("id");
    const newNote = formData.get("note");
    if (!noteId || !newNote) {
        throw new Error("Note ID and new note content are required.");
    }
    await sql`UPDATE notes SET note = ${newNote} WHERE id = ${noteId}`;
    return { success: true };
} 