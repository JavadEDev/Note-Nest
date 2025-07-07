"use server"

import { neon } from '@neondatabase/serverless';
import { auth } from "../../auth"

const sql = neon(process.env.DATABASE_URL);

export default async function postNote(formData) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }
    const fromUser = session.user.id;
    const toUser = formData.get("to_user"); // should be a UUID
    const note = formData.get("note");
    if (!toUser || !note) {
        throw new Error("To user and note are required.");
    }
    await sql`
        INSERT INTO notes (from_user, to_user, note)
        VALUES (${fromUser}, ${toUser}, ${note})
    `;
}
