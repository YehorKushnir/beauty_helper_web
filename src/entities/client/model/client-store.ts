import { create } from 'zustand'

function getInitialPagination() {
  if (typeof window === 'undefined') {
    return { page: null, limit: null, search: '' }
  }

  const params = new URLSearchParams(window.location.search)

  return {
    page: Number(params.get('page') ?? 1),
    limit: Number(params.get('limit') ?? 10),
    search: params.get('search') ?? ''
  }
}

interface ClientStore {
  page: number | null
  limit: number | null
  search: string
  setPage: (value: number) => void
  setLimit: (value: number) => void
  setSearch: (value: string) => void
}

export const useClientStore = create<ClientStore>((set) => ({
  page: getInitialPagination().page,
  limit: getInitialPagination().limit,
  search: '',
  setPage: (value) => set({ page: value }),
  setLimit: (value) => set({ limit: value }),
  setSearch: (value) => set({ search: value })
}))
