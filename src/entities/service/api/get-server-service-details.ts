import { serverApiRequestWrapper } from '@/shared/lib/api/server-api-request-wrapper'
import { handleServerError } from '@/shared/lib/errors/server-api/handle-server-error'
import { ServiceDetails } from '@/entities/service/model/service.type'

export async function getServerServiceDetails(id: string) {
	try {
		return await serverApiRequestWrapper<ServiceDetails>(`/service/${id}`)
	} catch (e) {
		throw handleServerError(e, {
			scope: 'service',
			action: 'getServerServiceDetails'
		})
	}
}
