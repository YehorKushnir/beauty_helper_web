import {$api} from "@/http";
import { useAuthStore } from '@/stores/auth-store'

export async function bootstrapAuth() {
    try {
        const res = await $api.get('/users/me')

        const newAccess = res.headers['x-access-token'] || null

        if (newAccess) {
            useAuthStore.getState().setAccessToken(newAccess)
        }

        useAuthStore.getState().setUser(res.data)
    } catch {
        void useAuthStore.getState().logout()
    }
}