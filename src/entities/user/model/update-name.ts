import {showToastError} from "@/shared/lib/toast/show-toast-error";
import {useUserStore} from "@/shared/model/user/model/store";
import {updateNameRequest} from "@/entities/user/api/update-name";

export async function updateName(name: string){
    const updateUser = useUserStore.getState().updateUser

    try {
        const data = await updateNameRequest(name)

        updateUser({name: data})
    } catch (e) {
        showToastError(e)
        throw e
    }
}