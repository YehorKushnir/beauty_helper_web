export interface ServiceCreateUpdateDto {
  name: string
  description?: string
  price: string
  durationMin: number
}

export interface ServiceUpdateDto extends ServiceCreateUpdateDto {
  id: string
}
