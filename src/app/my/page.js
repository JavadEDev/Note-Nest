import AnimatedNotesPage from '../components/AnimatedNotesPage'
import { Suspense } from 'react'
import Loading from './loading'
import fetchNotes from '../api/fetchNotes'

export default async function MyNotes() {
    const notes = await fetchNotes()

    return (
        <section>
            <Suspense fallback={<Loading />}>
                <AnimatedNotesPage notes={notes} />
            </Suspense>
        </section>
    )
}
