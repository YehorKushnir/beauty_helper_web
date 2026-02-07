import {showToastError} from "@/shared/lib/toast/show-toast-error";
import {removeSessionRequest} from "@/entities/session/api/remove-session";

export async function removeSessionResponse(id: string) {
    try {
        await removeSessionRequest(id)
    } catch (e) {
        showToastError(e)
        throw e
    }
}