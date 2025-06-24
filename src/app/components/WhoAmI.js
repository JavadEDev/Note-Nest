import getWhoAmI from "../api/getWhoAmI";

export default async function WhoAmI() {
    const user = await getWhoAmI()
    return (
        <div className="whoami-container">
            <h1 className="whoami-title">Who Am I?</h1>
            <p className="whoami-info">
                You are <b>{user.name}</b> and your id is <b>{user.id}</b>
            </p>
        </div>
    )
}