'use client'

import {bootstrapAuth} from "@/lib/bootstrap-auth";
import {ReactNode, useEffect} from "react";

interface Props {
    children: ReactNode
}

export default function AuthProvider({children}: Props) {

    useEffect(() => {
        void bootstrapAuth()
    }, [])

    return children
}