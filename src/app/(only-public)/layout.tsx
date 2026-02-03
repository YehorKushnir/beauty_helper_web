'use client'

import {useAuthStore} from "@/stores/auth-store"
import {redirect} from "next/navigation"
import {ReactNode} from "react";

interface Props {
    children: ReactNode
}

export default function AuthPageLayout({children}: Props) {
    const user = useAuthStore(s => s.user)
    const loading = useAuthStore(s => s.loading)

    if (loading) return null
    if (user) redirect("/dashboard")

    return children
}
