/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom"
import { Field, FileField, Form, SubmitButton } from "../Form"

interface PhoneFormProps {
  initialValues?: any
  onValidate: (values: any) => void
  onSubmit: (values: any) => void
  toOnCancel: string
}

export const PhoneForm: React.FC<PhoneFormProps> = ({
  children,
  onValidate,
  onSubmit,
  initialValues = undefined,
  toOnCancel,
}) => {
  return (
    <main className="row-span-3 row-start-4 -mt-32 overflow-hidden h-full">
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full">
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          onValidate={onValidate}
          className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 h-full overflow-auto space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div>
              {children}

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
              <Link
                to={toOnCancel}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </Link>
              <SubmitButton className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
              </SubmitButton>
            </div>
          </div>
        </Form>
      </div>
    </main>
  )
}
