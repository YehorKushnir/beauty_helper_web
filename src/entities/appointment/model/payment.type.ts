export type PaymentStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'REFUNDED'
export type PaymentMethod = 'CASH' | 'CARD' | 'BANK_TRANSFER'

export interface Payment {
  id: string
  amount: string
  paidAt: string
  method: PaymentMethod
  status: PaymentStatus
}
