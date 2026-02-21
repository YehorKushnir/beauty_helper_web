'use client'

import { Field } from '@/shared/ui/shad-cn/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/shad-cn/input-group'
import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useClientStore } from '@/entities/client/model/client-store'
import { useSearchParams } from 'next/navigation'

interface Props {
  initSearch: string
}

export default function ClientSearch({ initSearch }: Props) {
  const searchParams = useSearchParams()
  const setSearchStore = useClientStore((state) => state.setSearch)
  const [search, setSearch] = useState(initSearch)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchStore(search)
      const params = new URLSearchParams(searchParams.toString())
      if (search) {
        params.set('search', search)
      } else {
        params.delete('search')
      }
      window.history.replaceState({}, '', `?${params.toString()}`)
    }, 400)

    return () => clearTimeout(timer)
  }, [search])

  return (
    <Field className="max-w-sm">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </InputGroup>
    </Field>
  )
}
