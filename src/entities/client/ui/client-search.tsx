'use client'

import { Field } from '@/shared/ui/shad-cn/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/shad-cn/input-group'
import { SearchIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useClientStore } from '@/entities/client/model/client-store'
import { useSearchParams } from 'next/navigation'

interface Props {
  initSearch: string
}

export default function ClientSearch({ initSearch }: Props) {
  const searchParams = useSearchParams()
  const setSearchStore = useClientStore((state) => state.setSearch)
  const setPage = useClientStore((state) => state.setPage)
  const [search, setSearch] = useState(initSearch)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearch = (value: string) => {
    setSearch(value)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      setSearchStore(value)
      setPage(1)
      const params = new URLSearchParams(searchParams.toString())

      if (value.trim()) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      params.set('page', '1')

      window.history.replaceState({}, '', `?${params.toString()}`)
    }, 400)
  }

  return (
    <Field className="w-full">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupInput
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name, phone and description..."
        />
      </InputGroup>
    </Field>
  )
}
