"use server"
import { AsyncDatabase } from 'promised-sqlite3'

export default async function getWhoAmI() {
    const db = await AsyncDatabase.open("./notes.db")
    return db.get("SELECT * FROM users WHERE id= ?", ["1"])
}
