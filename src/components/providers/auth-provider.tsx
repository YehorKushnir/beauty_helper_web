'use client'

import {ReactNode, useEffect} from "react"
import {useAuthStore} from "@/stores/auth-store"
import FullScreenLoader from "@/components/fullscreen-loader"
import {$api} from "@/http"

interface Props {
    children: ReactNode
}

export default function AuthProvider({children}: Props) {
    const loading = useAuthStore(s => s.loading)
    const setAccessToken = useAuthStore(s => s.setAccessToken)
    const setUser = useAuthStore(s => s.setUser)
    const setLoading = useAuthStore(s => s.setLoading)
    const logout = useAuthStore(s => s.logout)

    useEffect(() => {
        const hasSession = localStorage.getItem("hasSession")

        if (!hasSession) {
            void logout()
            setLoading(false)
            return
        }

        $api.get("/users/me")
            .then(res => {
                const newAccess = res.headers["x-access-token"]
                if (newAccess) setAccessToken(newAccess)
                setUser(res.data)
            })
            .catch(() => {
                void logout()
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) return <FullScreenLoader/>

    return children
}
