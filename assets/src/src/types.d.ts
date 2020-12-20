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
  slug: string
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

export interface DetailScreenRouteParams {
  slugPhoneName: string
}

export interface DetailScreenRouteState {
  phoneName: string
}

export interface DeletePhoneRequest {
  onSucess: () => void
  data: PhoneModel
}

export type UpdatePhoneRequest = Partial<CreatePhoneRequest>
