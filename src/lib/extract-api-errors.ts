import axios from "axios";
import {toast} from "sonner";

function extractError(e: unknown): string {
    if (axios.isAxiosError(e)) {
        const msg = e.response?.data?.message

        if (Array.isArray(msg)) {
            return msg[0]
        }

        if (typeof msg === 'string') {
            return msg
        }
    }

    return 'Unexpected error'
}

export function showError(e: unknown) {
    toast.error(extractError(e), {
        richColors: true
    })
}