import getUsers from "../api/getUsers"
import postNote from "../api/postNote"
import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function WritePage() {
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/auth/signin");
    }
    const users = await getUsers();
    const myId = session.user.id;
    const myName = session.user.name || session.user.email;
    return (
        <div className="write-container">
            <fieldset className="write-fieldset">
                <legend className="write-legend">Write a new note</legend>
                <form action={postNote} className="write-form">
                    <label className="write-label">
                        From
                        <input
                            type="text"
                            value={myName}
                            disabled
                            className="write-input write-input-disabled"
                        />
                    </label>
                    <label className="write-label">
                        To
                        <select name="to_user" className="write-select">
                            {users.filter((user) => user.id !== myId).map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name || user.email}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="write-label">
                        Note
                        <textarea name="note" className="write-textarea" />
                    </label>
                    <button type="submit" className="write-button">Save</button>
                </form>
            </fieldset>
        </div>
    )
}

