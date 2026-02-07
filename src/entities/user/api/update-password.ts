import {$api} from "@/shared/lib/api/axios";

export async function updatePasswordRequest(dto: PasswordDto) {
    return (await $api.patch<{url: string}>('/users/password', dto)).data
}