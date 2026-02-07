import SessionItem from "@/entities/session/ui/session-item";
import {getSessions} from "@/entities/session/api/get-sessions";

export default async function Page() {
    const sessions = await getSessions()

    return (
        <div className="flex gap-4 flex-col">
            {sessions.map((session) => (
                <SessionItem key={session.id} session={session}/>
            ))}
        </div>
    )
}