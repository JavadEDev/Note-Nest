import getUsers from "../api/getUsers"
import postNote from "../api/postNote"

export default async function WritePage() {
    const users = await getUsers()
    return (
        <div className="write-container">
            <fieldset className="write-fieldset">
                <legend className="write-legend">Write a new note</legend>
                <form action={postNote} className="write-form">
                    <label className="write-label">
                        From
                        <select name="from_user" className="write-select">
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="write-label">
                        To
                        <select defaultChecked={2} name="to_user" className="write-select">
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
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

