"use server"
import { redirect } from 'next/navigation'
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function updateUsername(formData) {
    console.log("updateUsername called", formData)
    const username = formData.get("username")
    const id = formData.get("id")
    if (!username || !id) {
        throw new Error("All fields are required.")
    }
    await sql`UPDATE users SET name = ${username} WHERE id = ${id}`;
    redirect("/")
}
