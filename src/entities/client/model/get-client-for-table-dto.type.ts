import { ClientStatus } from '@/entities/client/model/client-status.type'

export type GetClientForTableDtoType = {
  status: ClientStatus
  search?: string
  page?: number
  limit?: number
}
