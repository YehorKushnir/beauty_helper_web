import { showToastError } from '@/shared/lib/toast/show-toast-error'
import { $api } from '@/shared/lib/api/axios'
import { ServiceSearchItem } from '@/entities/service/model/service.type'
import qs from 'qs'

export async function getServiceByQuery(search: string) {
	try {
		const query = qs.stringify({ search }, { skipNulls: true })
		return (await $api.get<ServiceSearchItem[]>(`/service/find-by-query?${query}`)).data
	} catch (e) {
		showToastError(e)
		throw e
	}
}
