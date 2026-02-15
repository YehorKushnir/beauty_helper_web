import {showToastError} from "@/shared/lib/toast/show-toast-error";
import {removeSessionRequest} from "@/entities/session/api/remove-session";
import {sleep} from '@/shared/lib/sleep'

export async function removeSessionResponse(id: string) {
    try {
        await sleep(2000);
        await removeSessionRequest(id)
    } catch (e) {
        showToastError(e)
        throw e
    }
}