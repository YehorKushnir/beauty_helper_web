import { create } from 'zustand'
import { ServiceStatus } from '@/entities/service/model/service-status.type'
import { ServiceUpdateDto } from '@/entities/service/model/service-create-update-dto.type'

function getInitialPagination() {
	if (typeof window === 'undefined') {
		return { page: null, limit: null, search: undefined, status: undefined }
	}

	const params = new URLSearchParams(window.location.search)

	return {
		page: Number(params.get('page') ?? 1),
		limit: Number(params.get('limit') ?? 10),
		search: params.get('search') ?? undefined,
		status: (params.get('status') as ServiceStatus) ?? undefined
	}
}

interface ServiceStore {
	page: number | null
	limit: number | null
	search?: string
	status?: ServiceStatus | 'ALL'
	editing: boolean
	editPayload: ServiceUpdateDto | null
	setPage: (value: number) => void
	setLimit: (value: number) => void
	setSearch: (value: string) => void
	setStatus: (value: ServiceStatus | 'ALL') => void
	setEditing: (value: boolean, payload?: ServiceUpdateDto) => void
}

export const useServiceStore = create<ServiceStore>((set) => ({
	page: getInitialPagination().page,
	limit: getInitialPagination().limit,
	search: getInitialPagination().search,
	status: getInitialPagination().status,
	editing: false,
	editPayload: null,
	setPage: (value) => set({ page: value }),
	setLimit: (value) => set({ limit: value }),
	setSearch: (value) => set({ search: value }),
	setStatus: (value) => set({ status: value }),
	setEditing: (value, payload) => {
		set({ editing: value, editPayload: payload ?? null })
	}
}))
