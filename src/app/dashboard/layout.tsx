import Header from "@/components/header";
import {ReactNode} from "react";

interface Props {
    children: ReactNode
}

export default function Layout({children}: Props) {
    return (
        <div className={'container m-auto'}>
            <Header/>
            {children}
        </div>
    )
}