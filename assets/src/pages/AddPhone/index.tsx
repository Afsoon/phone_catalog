import { Link } from "react-router-dom"
import { CreatePhoneRequest } from "./types"
import { useAddPhone } from "./hooks"
import { validateAddPhoneForm } from "./validateForm"
import { PhoneForm } from "../../components/PhoneForm"
import MainLayout, {
  MainHeaderLayout,
  MainErrorMessage,
} from "../../components/Main"

const BackButton: React.FC = ({ children }) => {
  return (
    <div>
      <Link
        title="Go back to home"
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
          {children}
        </h2>
      </Link>
    </div>
  )
}

const Content = () => {
  const addPhone = useAddPhone()
  const submitForm = (values: CreatePhoneRequest) => {
    addPhone.mutate(values)
  }

  if (addPhone.isError) {
    return (
      <MainLayout>
        <MainHeaderLayout>
          <BackButton>Go back</BackButton>
        </MainHeaderLayout>
        <MainErrorMessage>
          <h3 className="self-center text-3xl font-semibold">
            Unable to load the phone data, try it more later
          </h3>
        </MainErrorMessage>
      </MainLayout>
    )
  }

  return (
    <PhoneForm
      toOnCancel="/"
      onSubmit={submitForm}
      onValidate={validateAddPhoneForm}
      isLoading={addPhone.isLoading}
      cancelButtonTitle="Cancel the add phone form and go back to the home screen"
    >
      <BackButton>Add Phone</BackButton>
    </PhoneForm>
  )
}

function Home() {
  return <Content />
}

export default Home
