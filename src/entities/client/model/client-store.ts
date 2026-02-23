import { create } from 'zustand'
import { ClientStatus } from '@/entities/client/model/client-status.type'

function getInitialPagination() {
  if (typeof window === 'undefined') {
    return { page: null, limit: null, search: undefined, status: undefined }
  }

  const params = new URLSearchParams(window.location.search)

  return {
    page: Number(params.get('page') ?? 1),
    limit: Number(params.get('limit') ?? 10),
    search: params.get('search') ?? undefined,
    status: (params.get('status') as ClientStatus) ?? undefined
  }
}

interface ClientStore {
  page: number | null
  limit: number | null
  search?: string
  status?: ClientStatus | 'ALL'
  setPage: (value: number) => void
  setLimit: (value: number) => void
  setSearch: (value: string) => void
  setStatus: (value: ClientStatus | 'ALL') => void
}

export const useClientStore = create<ClientStore>((set) => ({
  page: getInitialPagination().page,
  limit: getInitialPagination().limit,
  search: getInitialPagination().search,
  status: getInitialPagination().status,
  setPage: (value) => set({ page: value }),
  setLimit: (value) => set({ limit: value }),
  setSearch: (value) => set({ search: value }),
  setStatus: (value) => set({ status: value })
}))
