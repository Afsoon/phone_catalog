import { Link, useParams } from "react-router-dom"
import { useUpdatePhone, useShowOnePhone } from "./hooks"
import { PhoneForm, PhoneFormLoading } from "../../components/PhoneForm"
import { EditPhoneRequest } from "../../src/types"
import { validateEditPhoneForm } from "../../src/validateForms"
import MainLayout, {
  MainHeaderLayout,
  MainErrorMessage,
} from "../../components/Main"

interface BackButtonProps {
  to: string
}

const BackButton: React.FC<BackButtonProps> = ({ to, children }) => {
  return (
    <div>
      <Link
        to={to}
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
          {children}
        </h2>
      </Link>
    </div>
  )
}

export const EditForm = () => {
  const { data, isError, isLoading } = useShowOnePhone()
  const { slugPhoneName } = useParams<{ slugPhoneName: string }>()
  const updatePhone = useUpdatePhone()
  const submitForm = (values: EditPhoneRequest) => {
    updatePhone.mutate({ formData: values, phoneId: id })
  }

  const toOnCancel = `/phone/${slugPhoneName}`
  const cancelButtonTitle =
    "Cancel edition phone form and go back to see the phone information screen"
  const showImgField = false

  if (isLoading) {
    return (
      <PhoneFormLoading
        toOnCancel={toOnCancel}
        onSubmit={submitForm}
        onValidate={validateEditPhoneForm}
        initialValues={undefined}
        isLoading={isLoading}
        cancelButtonTitle={cancelButtonTitle}
        showImgField={showImgField}
      >
        <BackButton to={toOnCancel}>Edit From</BackButton>
      </PhoneFormLoading>
    )
  }

  if (!data || isError) {
    return (
      <MainLayout>
        <MainHeaderLayout>
          <BackButton to={toOnCancel}>Go back</BackButton>
        </MainHeaderLayout>
        <MainErrorMessage>
          <h3 className="self-center text-3xl font-semibold">
            Unable to load the phone data, try it more later
          </h3>
        </MainErrorMessage>
      </MainLayout>
    )
  }

  const { imageFileName, id, ...initialValues } = data

  return (
    <PhoneForm
      toOnCancel={toOnCancel}
      onSubmit={submitForm}
      onValidate={validateEditPhoneForm}
      initialValues={initialValues}
      isLoading={updatePhone.isLoading}
      cancelButtonTitle={cancelButtonTitle}
      showImgField={showImgField}
    >
      <BackButton to={toOnCancel}>Edit From</BackButton>
    </PhoneForm>
  )
}
