export interface ClientCreateUpdateDto {
  name: string
  phone: string
  description: string
}

export interface ClientUpdateDto extends ClientCreateUpdateDto {
  id: string
}
