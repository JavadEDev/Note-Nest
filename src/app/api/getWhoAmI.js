"use server"
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function getWhoAmI() {
    const result = await sql`SELECT * FROM users WHERE id = 1`;
    return result[0];
}
