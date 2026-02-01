import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'

export const $api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
})

$api.interceptors.request.use(config => {
    const token = useAuthStore.getState().accessToken

    if (token) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

$api.interceptors.response.use(
    res => {
        const newToken = res.headers['x-access-token']

        if (newToken) {
            useAuthStore.getState().setAccessToken(newToken)
        }

        return res
    },
    error => {
        if (error.response?.status === 401) {
            useAuthStore.getState().clear()
        }

        return Promise.reject(error)
    }
)
