import {$api} from "@/shared/lib/api/axios";

export async function updateNameRequest(name: string) {
    return (await $api.patch<string>('/users/name', {name})).data
}