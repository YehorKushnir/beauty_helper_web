'use client'

import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/shad-cn/tabs'
import { LaptopMinimal, LockKeyhole, UserPen } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const pages = [
  {
    link: '/settings/profile',
    name: 'Profile',
    icon: <UserPen />
  },
  {
    link: '/settings/security',
    name: 'Security',
    icon: <LockKeyhole />
  },
  {
    link: '/settings/sessions',
    name: 'Sessions',
    icon: <LaptopMinimal />
  }
]

export default function SettingsTabsList() {
  const pathname = usePathname()
  return (
    <Tabs value={pathname}>
      <TabsList className={'w-full sm:max-w-120'}>
        {pages.map((page) => (
          <TabsTrigger key={page.link} value={page.link} asChild>
            <Link href={page.link} prefetch={true}>
              {page.icon} {page.name}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
