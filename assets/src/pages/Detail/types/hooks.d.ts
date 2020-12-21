import { PhoneModel } from "../../../src/types"
import { EditPhoneRequest } from "./api"

export interface EditMutateRequest {
  formData: EditPhoneRequest
  phoneId: PhoneModel["id"]
}

export interface UpdateContext {
  previousPhone: PhoneModel | undefined | null
  previousListPhones: PhoneModel[] | undefined | null
  updatePhone: EditMutateRequest
}

export type OptimisticUpdateContext = UpdateContext | undefined | null

interface DeleteContext {
  previousPhone: PhoneModel | undefined | null
  previousListPhones: PhoneModel[] | undefined | null
  phone: DeletePhoneRequest
}

type OptimisticDeleteContext = DeleteContext | undefined | null

export interface DeletePhoneRequest {
  onSucess: () => void
  data: PhoneModel
}
