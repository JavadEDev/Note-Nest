import TeacherClientPage from "../components/TeacherClientPage"
import teacherFetchNotes from "../api/teacherFetchNotes"

export default async function TeacherView() {
    const initialNotes = await teacherFetchNotes()
    return (
        <TeacherClientPage initialNotes={initialNotes} teacherFetchNotes={teacherFetchNotes} />
    )
}
