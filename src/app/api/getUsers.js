import { AsyncDatabase } from 'promised-sqlite3'

export default async function getUsers() {
  const db = await AsyncDatabase.open("./notes.db")
  return db.all("SELECT * FROM users")
}
