import { ClientTableItem } from '@/entities/client/model/client.type'

export type ClientTableData = {
  items: ClientTableItem[]
  total: number
  page: number
  pages: number
}
