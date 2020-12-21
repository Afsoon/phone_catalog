import { EditPhoneRequest } from "./types"
import { msgErrorsPhoneForm } from "../../src/validateForms"

export const validateEditPhoneForm = (values: Partial<EditPhoneRequest>) => {
  const errors: Record<string, string> = {}
  if (!values.name) {
    errors.name = msgErrorsPhoneForm.name
  }

  if (!values.description) {
    errors.description = msgErrorsPhoneForm.description
  }

  if (!values.price) {
    errors.price = msgErrorsPhoneForm.price
  }

  if (!values.ram) {
    errors.ram = msgErrorsPhoneForm.ram
  }

  if (!values.screen) {
    errors.screen = msgErrorsPhoneForm.screen
  }

  if (!values.color) {
    errors.color = msgErrorsPhoneForm.color
  }

  if (Object.keys(errors).length) {
    throw errors
  }
}
