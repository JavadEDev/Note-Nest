import AnimatedNotesPage from '../components/AnimatedNotesPage'
import GSAPStaggerFadeIn from '../components/GSAPStaggerFadeIn'
import { Suspense } from 'react'
import Loading from './loading'
import fetchNotes from '../api/fetchNotes'

export default async function MyNotes() {
    const notes = await fetchNotes()

    return (
        <section>
            <Suspense fallback={<Loading />}>
                <GSAPStaggerFadeIn>
                    <AnimatedNotesPage notes={notes} />
                </GSAPStaggerFadeIn>
            </Suspense>
        </section>
    )
}
