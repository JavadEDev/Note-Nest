import { AsyncDatabase } from 'promised-sqlite3'

export default async function fetchNotes() {
    const db = await AsyncDatabase.open('./notes.db')
    const fromPromise = db.all(
        'SELECT n.id as id, n.note as note, f.name as from_user, t.name as to_user FROM notes n JOIN users f ON f.id = n.from_user JOIN users t ON t.id = n.to_user WHERE from_user = ?',
        ['1'],
    )
    const toPromise = db.all(
        'SELECT n.id as id, n.note as note, f.name as from_user, t.name as to_user FROM notes n JOIN users f ON f.id = n.from_user JOIN users t ON t.id = n.to_user WHERE to_user = ?',
        ['1'],
    )

    const [from, to] = await Promise.all([fromPromise, toPromise]);
    return { from, to }
} 