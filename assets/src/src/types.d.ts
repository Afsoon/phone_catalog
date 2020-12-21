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

export interface EditPhoneRequest {
  name: string
  manufacturer: string
  description: string
  color: string
  screen: string
  ram: number
  price: number
}

export interface CreatePhoneRequest extends EditPhoneRequest {
  imageFileName: File
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
