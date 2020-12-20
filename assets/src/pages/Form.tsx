import { Link } from "react-router-dom"
import { Header } from "../components/Header"
import Text from "../components/Text"
import AppShell from "../components/AppShell"
import { Footer } from "../components/Footer"
import { Button } from "reakit"
import { CreatePhoneRequest } from "../src/types"
import { useAddPhone } from "../hooks/api"
import { Field, FileField, Form, SubmitButton } from "../components/Form"

const HeaderHome = () => {
  return (
    <Header>
      <Text as="h1" className="self-center text-6xl pt-2 pb-2 md:pb-0 lg:pt-8">
        Phone Catalog
      </Text>
    </Header>
  )
}

const FooterHome = () => {
  return <Footer></Footer>
}

const validateForm = (values: Partial<CreatePhoneRequest>) => {
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

  if (Object.keys(errors).length > 0) {
    console.log(errors)
    throw errors
  }
}

const ContentHome = () => {
  const mutation = useAddPhone()
  const submitForm = (values: CreatePhoneRequest) => {
    mutation.mutate(values)
  }

  return (
    <main className="row-span-3 row-start-4 -mt-32 overflow-hidden h-full">
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full">
        <Form
          initialValues={undefined}
          onSubmit={submitForm}
          onValidate={validateForm}
          className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 h-full overflow-auto space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div>
              <div>
                <Link
                  to="/"
                  className="mt-3 sm:mt-0 sm:ml-4 border-transparent inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  <svg
                    className="mr-1 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    Añadir Télefono
                  </h2>
                </Link>
              </div>

              <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                <Field
                  name="name"
                  label="Phone Name"
                  type="text"
                  className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                />
                <Field
                  name="color"
                  label="Color"
                  type="text"
                  className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                />
                <Field
                  name="screen"
                  label="Screen"
                  type="text"
                  className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                />
                <Field
                  name="ram"
                  label="RAM"
                  type="text"
                  className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                />
                <Field
                  name="price"
                  label="Price"
                  type="text"
                  className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                />
                <Field
                  name="description"
                  label="Description"
                  as="textarea"
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                >
                  <p className="mt-2 text-sm text-gray-500">
                    Escribe una breve descripción del télefono
                  </p>
                </Field>
                <FileField name="imageFileName" label="Photo">
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </FileField>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <Button className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </Button>
              <SubmitButton className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Guardar
              </SubmitButton>
            </div>
          </div>
        </Form>
      </div>
    </main>
  )
}

function Home() {
  return (
    <AppShell>
      <HeaderHome />
      <ContentHome />
      <FooterHome />
    </AppShell>
  )
}

export default Home
