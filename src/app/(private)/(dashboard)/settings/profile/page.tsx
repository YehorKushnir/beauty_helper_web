import { getServerUser } from '@/entities/user/api/get-server-user'
import UserProfileForm from '@/entities/user/ui/user-profile-form'

export default function Page() {
  const user = getServerUser()

  return <UserProfileForm userPromise={user} />
}
