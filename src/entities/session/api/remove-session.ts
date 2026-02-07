import {$api} from "@/shared/lib/api/axios";

export async function removeSessionRequest(id: string): Promise<void> {
    await $api.delete(`/users/sessions/${id}`)
}