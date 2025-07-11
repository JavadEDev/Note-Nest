import getUsers from "../api/getUsers"
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import WriteNoteForm from "../components/WriteNoteForm"

export default async function WritePage() {
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/auth/signin")
    }
    const users = await getUsers();
    const myId = session.user.id;
    const myName = session.user.name || session.user.email;
    return (
        <div className="write-container">
            <fieldset className="write-fieldset">
                <legend className="write-legend">Write a new note</legend>
                <WriteNoteForm users={users} myId={myId} myName={myName} />
            </fieldset>
        </div>
    )
}

