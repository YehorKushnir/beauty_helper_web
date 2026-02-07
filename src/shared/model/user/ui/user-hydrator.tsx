'use client'

import {ReactNode, useEffect} from 'react';
import {useUserStore} from "@/shared/model/user/model/store";
import {AuthData} from "@/shared/model/auth/model/auth-data";

interface Props {
    authData: AuthData
    children: ReactNode
}

export function UserHydrator({authData, children}: Props) {
    const setUser = useUserStore(state => state.setUser)
    const setAccess = useUserStore(state => state.setAccess)

    useEffect(() => {
        setUser(authData.user)
        setAccess(authData.access)
    }, [authData])

    return children
}