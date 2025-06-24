import updateUsername from "../api/updateUsername"

export default async function WhoAmIClientPage({ children, id }) {
    return (
        <div className="whoami-container">
            {children}
            <form action={updateUsername} className="whoami-form">
                <h2>Enter new username</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter new Username"
                    className="whoami-input"
                />
                <input type="hidden" name="id" value={id} />
                <button type="submit" className="whoami-button">Submit</button>
            </form>
        </div>
    )
}