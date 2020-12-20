import { Link } from "react-router-dom"
import { useUpdatePhone, useShowOnePhone } from "./hooks"
import { PhoneForm } from "../../components/PhoneForm"
import { CreatePhoneRequest } from "../../src/types"
import { validateAddPhoneForm } from "../../src/validateForms"

export const EditForm = () => {
  const { data, isError } = useShowOnePhone()
  const updatePhone = useUpdatePhone()
  const submitForm = (values: CreatePhoneRequest) => {
    updatePhone.mutate(values)
  }

  if (!data || isError) {
    return null
  }

  const { imageFileName, id, ...initialValues } = data

  return (
    <PhoneForm
      toOnCancel="/"
      onSubmit={submitForm}
      onValidate={validateAddPhoneForm}
      initialValues={initialValues}
      isLoading={updatePhone.isLoading}
      cancelButtonTitle="Cancel edition phone form and go back to see the phone information screen"
    >
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
          <h2 className="text-2xl ml-2 leading-6 font-medium text-gray-900">
            Edit Phone
          </h2>
        </Link>
      </div>
    </PhoneForm>
  )
}
