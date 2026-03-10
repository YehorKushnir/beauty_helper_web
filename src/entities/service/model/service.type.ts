import { ServiceStatus } from '@/entities/service/model/service-status.type'

type BaseService = {
	id: string
	name: string
	price: string
	durationMin: number
	description: string | null
	status: ServiceStatus
}

export type ServiceSearchItem = Pick<BaseService, 'id' | 'name' | 'description'>

export type ServiceTableItem = Pick<
	BaseService,
	'id' | 'name' | 'price' | 'durationMin' | 'description' | 'status'
>

export type ServiceDetails = BaseService
