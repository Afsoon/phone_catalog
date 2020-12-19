export interface PhoneModel {
  id: number
  name: string
  manufacturer: string
  description: string
  color: string
  imageFileName: string
  screen: string
  ram: number
  price: number
}

export interface CreatePhoneRequest {
  name: string
  manufacturer: string
  description: string
  color: string
  imageFileName: File
  screen: string
  ram: number
  price: number
}

export type UpdatePhoneRequest = Partial<CreatePhoneRequest>
