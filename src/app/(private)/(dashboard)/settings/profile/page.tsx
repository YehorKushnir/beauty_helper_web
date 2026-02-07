import {getUser} from "@/entities/user/api/user";
import UserProfileForm from "@/entities/user/ui/user-profile-form";

export default function Page() {
    const user = getUser()

    return (
        <UserProfileForm userPromise={user}/>
    )
}