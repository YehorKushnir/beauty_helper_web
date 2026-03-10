import qs from 'qs'
import { ServiceStatus } from '@/entities/service/model/service-status.type'

interface Props {
	page: number | null
	limit: number | null
	search?: string
	status?: ServiceStatus | 'ALL'
}

export const getServicesPageParams = ({ page, limit, search, status }: Props) => {
	return qs.stringify(
		{
			page,
			limit,
			search: search ? search : null,
			status
		},
		{ skipNulls: true }
	)
}
