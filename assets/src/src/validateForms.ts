import { CreatePhoneRequest } from "./types"

const msgErrorsPhoneForm = {
  name: "Insert the phone's name",
  description: "Insert the phone's description",
  price: "Insert the phone's price",
  ram: "Insert the phone's RAM",
  screen: "Insert the phone's screen",
  color: "Insert the phone's color",
  imageFileName: "Upload a photo of the phone",
}

export const validateAddPhoneForm = (values: Partial<CreatePhoneRequest>) => {
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

  if (!values.imageFileName) {
    errors.imageFileName = msgErrorsPhoneForm.imageFileName
  }

  if (Object.keys(errors).length) {
    throw errors
  }
}

export const validateEditPhoneForm = (values: Partial<CreatePhoneRequest>) => {
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
