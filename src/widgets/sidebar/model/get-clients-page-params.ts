import qs from 'qs'
import { ClientStatus } from '@/entities/client/model/client-status.type'

interface Props {
  page: number | null
  limit: number | null
  search: string
  status?: ClientStatus | 'ALL'
}

export const getClientsPageParams = ({ page, limit, search, status }: Props) => {
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
