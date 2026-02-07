import {$api} from "@/shared/lib/api/axios";

export async function updateAvatarRequest(formData: FormData) {
    return (await $api.patch<string>('/users/avatar', formData)).data
}