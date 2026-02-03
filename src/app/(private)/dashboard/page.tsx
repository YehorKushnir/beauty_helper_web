'use client'

import {Button} from "@/components/ui/button";
import {$api} from "@/http";

export default function Page() {

    const getSessions = async () => {
        const data = (await $api.get("/users/sessions")).data
        console.log(data)
    }

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Button onClick={getSessions}>Get sessions</Button>
        </div>
    )
}
