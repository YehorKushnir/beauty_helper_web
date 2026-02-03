import {create} from 'zustand'
import {$api} from "@/http";
import {LoginData} from "@/types/login-data";
import {LoginDto} from "@/types/login-dto";
import {User} from "@/types/user";
import {showError} from "@/lib/extract-api-errors";
import {RegisterDto} from "@/types/register-dto";
type AuthState = {
    user: User | null
    accessToken: string | null
    loading: boolean
    setLoading: (value: boolean) => void
    setAccessToken: (token: string | null) => void
    setUser: (user: User | null) => void
    clear: () => void
    register: (dto: RegisterDto) => Promise<void>
    login: (dto: LoginDto) => Promise<void>
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>(set => ({
    user: null,
    accessToken: null,
    loading: true,
    setLoading: (value) => set({loading: value}),
    setAccessToken: token => set({accessToken: token}),
    setUser: user => set({user}),
    clear: () => set({accessToken: null}),
    register: async (dto: RegisterDto) => {
        try {
            const data = (await $api.post<LoginData>('/auth/register', dto)).data
            set({
                accessToken: data.access,
                user: data.user
            })
        } catch (e) {
            showError(e)
        }
    },
    login: async (dto: LoginDto) => {
        try {
            const data = (await $api.post<LoginData>('/auth/login', dto)).data
            set({
                accessToken: data.access,
                user: data.user
            })
            localStorage.setItem("hasSession", "1")
        } catch (e) {
            showError(e)
        }
    },
    logout: async () => {
        void $api.post('/auth/logout')
        localStorage.removeItem("hasSession")
        set({user: null, accessToken: null})
    }
}))
