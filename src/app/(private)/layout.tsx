import {redirect} from 'next/navigation'
import {ReactNode} from "react";
import {UserHydrator} from "@/shared/model/user/ui/user-hydrator";
import {checkAuthRequest} from "@/features/auth/check-auth/api/check-auth";

interface Props {
    children: ReactNode
}

export default async function Layout({children}: Props) {
    console.log(1)
    const authData = await checkAuthRequest()

    if (!authData) {
        redirect('/login')
    }

    return (
        <UserHydrator authData={authData}>
            {children}
        </UserHydrator>
    )
}