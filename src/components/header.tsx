'use client'

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useAuthStore} from "@/stores/auth-store";

export default function Header() {
    const user = useAuthStore(state => state.user)
    const logout = useAuthStore(state => state.logout)

    return (
        <div className={'w-full h-16 py-2 fixed flex gap-2'}>

            {user ? (
                <>
                    <Button onClick={logout} variant={'outline'}>Logout</Button>
                    <div>{user.email}</div>
                </>
            ) : (
                <Link href={'/login'}>
                    <Button>
                        Login
                    </Button>
                </Link>
            )}
        </div>
    )
}