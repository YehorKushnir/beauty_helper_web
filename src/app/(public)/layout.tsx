import {redirect} from 'next/navigation'
import {ReactNode} from "react";
import {checkAuthRequest} from "@/features/auth/check-auth/api/check-auth";

interface Props {
    children: ReactNode
}

export default async function Layout({children}: Props) {
    const authData = await checkAuthRequest()

    if (authData) {
        redirect('/dashboard')
    }

    return children
}