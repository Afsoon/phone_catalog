import { CreatePhoneRequest } from "./types"

export const validateAddPhoneForm = (values: Partial<CreatePhoneRequest>) => {
  const errors: Record<string, string> = {}
  const messageErrors = {
    name: "Insert the phone's name",
    description: "Insert the phone's description",
    price: "Insert the phone's price",
    ram: "Insert the phone's RAM",
    screen: "Insert the phone's screen",
    color: "Insert the phone's color",
    imageFileName: "Upload a photo of the phone",
  }
  if (!values.name) {
    errors.name = messageErrors.name
  }

  if (!values.description) {
    errors.description = messageErrors.description
  }

  if (!values.price) {
    errors.price = messageErrors.price
  }

  if (!values.ram) {
    errors.ram = messageErrors.ram
  }

  if (!values.screen) {
    errors.screen = messageErrors.screen
  }

  if (!values.color) {
    errors.color = messageErrors.color
  }

  if (!values.imageFileName) {
    errors.imageFileName = messageErrors.imageFileName
  }

  if (Object.keys(errors).length) {
    throw errors
  }
}
