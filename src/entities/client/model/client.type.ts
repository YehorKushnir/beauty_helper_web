import { ClientStatus } from '@/entities/client/model/client-status.type'

type BaseClient = {
  id: string
  name: string
  phone: string | null
  description: string | null
  status: ClientStatus
  statusChangedAt: string | null
  createdAt: Date
}

export type ClientSearchItem = Pick<BaseClient, 'id' | 'name' | 'phone'>

export type ClientTableItem = Pick<
  BaseClient,
  'id' | 'name' | 'phone' | 'description' | 'status' | 'statusChangedAt' | 'createdAt'
>

export type ClientDetails = BaseClient
