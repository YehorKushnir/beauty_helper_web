import { ServiceStatus } from '@/entities/service/model/service-status.type'

export type GetServiceForTableDtoType = {
	status?: ServiceStatus
	search?: string
	page?: number
	limit?: number
}
