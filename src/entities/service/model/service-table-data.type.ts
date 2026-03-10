import { ServiceTableItem } from '@/entities/service/model/service.type'

export type ServiceTableData = {
	items: ServiceTableItem[]
	total: number
	page: number
	pages: number
}
