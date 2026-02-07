import {showToastError} from "@/shared/lib/toast/show-toast-error";
import {updateAvatarRequest} from "@/entities/user/api/update-avatar";
import {useUserStore} from "@/shared/model/user/model/store";

export async function updateAvatar(formData: FormData) {
    const updateUser = useUserStore.getState().updateUser

    try {
        const data = await updateAvatarRequest(formData)

        updateUser({avatarUrl: data})
    } catch (e) {
        showToastError(e)
        throw e
    }
}