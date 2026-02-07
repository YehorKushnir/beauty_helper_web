import axios from 'axios'
import {mapAxiosError} from "@/shared/lib/errors/axios/map-axios-error";
import {useUserStore} from "@/shared/model/user/model/store";

export const $api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
})

$api.interceptors.request.use(config => {
    const token = useUserStore.getState().access

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
            const setAccess = useUserStore.getState().setAccess
            if (setAccess) {
                setAccess(newToken)
            }
        }

        return res
    },
    error => {
        const mapped = mapAxiosError(error)

        return Promise.reject(mapped)
    }
)
