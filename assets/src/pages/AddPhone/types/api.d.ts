import { EditPhoneRequest } from "../../Detail/types"
export interface CreatePhoneRequest extends EditPhoneRequest {
  imageFileName: File
}
