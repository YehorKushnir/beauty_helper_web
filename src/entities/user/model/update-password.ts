import {showToastError} from "@/shared/lib/toast/show-toast-error";
import {updatePasswordRequest} from "@/entities/user/api/update-password";

export async function updatePassword(dto: PasswordDto) {
    try {
        await updatePasswordRequest(dto)
    } catch (e) {
        showToastError(e)
        throw e
    }
}