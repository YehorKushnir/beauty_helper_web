import {User} from "@/entities/user/model/types";
import {create} from "zustand";

export type UserState = {
    access: string | null
    user: User | null
    setAccess: (token: string | null) => void
    setUser: (user: User | null) => void
    updateUser: (user: Partial<User>) => void
    clear: () => void
}

export const useUserStore = create<UserState>((set) => ({
    access: null,
    user: null,
    setAccess: token => set({access: token}),
    setUser: user => set({user}),
    updateUser: patch =>
        set(state =>
            state.user
                ? {user: {...state.user, ...patch}}
                : state
        ),
    clear: () => set({user: null, access: null})
}))