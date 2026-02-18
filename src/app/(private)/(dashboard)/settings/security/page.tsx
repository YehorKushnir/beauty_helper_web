import UpdatePasswordForm from '@/entities/user/ui/update-password-form'
import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getServerAuthMethods } from '@/entities/user/api/get-server-auth-methods'
import { dehydrate } from '@tanstack/query-core'
import Providers from '@/entities/user/ui/providers'

export default async function Page() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['authMethods'],
    queryFn: getServerAuthMethods
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4">
        <UpdatePasswordForm />
        <Providers />
      </div>
    </HydrationBoundary>
  )
}
