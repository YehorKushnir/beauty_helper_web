'use client'

import { ReactNode, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { getErrorFromUrl } from '@/shared/lib/errors/get-errors-from-url'

interface Props {
  children: ReactNode
}

export default function ErrorProvider({ children }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const errorCode = useSearchParams().get('error_code')

  useEffect(() => {
    if (errorCode) {
      toast.error(getErrorFromUrl(errorCode), { richColors: true })
      router.replace(pathname)
    }
  }, [])

  return children
}
