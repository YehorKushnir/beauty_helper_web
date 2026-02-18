import { ReactNode } from 'react'
import SettingsTabsList from '@/widgets/settings/settings-tabs-list'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className={'container mx-auto flex flex-col gap-6 pt-2'}>
      <SettingsTabsList />
      {children}
    </div>
  )
}
