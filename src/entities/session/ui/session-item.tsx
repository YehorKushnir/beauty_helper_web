import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle} from "@/shared/ui/shad-cn/item";
import {Session} from "@/entities/session/model/types";
import RemoveSessionButton from "@/entities/session/ui/remove-session-button";

interface Props {
    session: Session
}

export default function SessionItem({session}: Props) {
    return (
        <Item key={session.id} variant="outline" className={'w-full'}>
            <ItemContent>
                <ItemTitle>{session.deviceName}</ItemTitle>
                <ItemDescription>
                    Last used: {new Date(session.createdAt).toLocaleDateString()}
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <RemoveSessionButton sessionId={session.id}/>
            </ItemActions>
        </Item>
    )
}