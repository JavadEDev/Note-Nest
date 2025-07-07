import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function getUsers() {
  return await sql`SELECT id, name, email FROM users ORDER BY name`;
}
