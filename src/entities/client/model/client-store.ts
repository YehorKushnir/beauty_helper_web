import { create } from 'zustand'

function getInitialPagination() {
  if (typeof window === 'undefined') {
    return { page: null, limit: null }
  }

  const params = new URLSearchParams(window.location.search)

  return {
    page: Number(params.get('page') ?? 1),
    limit: Number(params.get('limit') ?? 10)
  }
}

interface ClientStore {
  page: number | null
  limit: number | null
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

export const useClientStore = create<ClientStore>((set) => ({
  page: getInitialPagination().page,
  limit: getInitialPagination().limit,
  setPage: (value) => set({ page: value }),
  setLimit: (value) => set({ limit: value })
}))
