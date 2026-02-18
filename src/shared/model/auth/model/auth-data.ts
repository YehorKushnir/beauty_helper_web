import { User } from '@/entities/user/model/types'

export type AuthData = {
  access: string
  user: User
}
