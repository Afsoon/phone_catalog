import { Link, useLocation, useHistory } from "react-router-dom"
import { useDeletePhone, useShowOnePhone } from "./hooks"
import { DeleteButton } from "../../components/DeleteAction"
import { useCallback } from "react"
import { DialogStateReturn } from "reakit/Dialog"
import { PhoneModel } from "../../src/types"
import MainLayout, {
  MainHeaderLayout,
  MainHeaderActionsLayout,
  MainErrorMessage,
} from "../../components/Main"
import { GridPhoneData, GridPhoneLoading } from "./GridPhone"

const BackButtonTitle: React.FC = ({ children }) => {
  return (
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
        {children}
      </h2>
    </Link>
  )
}

interface EditPhoneProps {
  slug: string
  name: string
}

const EditPhone: React.FC<EditPhoneProps> = ({ slug, name }) => {
  return (
    <Link
      to={`/phone/${slug}/edit`}
      title={`Go to edition form to update ${name} information`}
      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Edit Phone
    </Link>
  )
}

const DetailContent: React.FC = () => {
  const { data, isLoading, isError } = useShowOnePhone()
  const deletePhone = useDeletePhone()
  const location = useLocation<{ phoneName: string }>()
  const history = useHistory()
  const onClick = useCallback(
    (dialogState: DialogStateReturn, data: PhoneModel) => {
      deletePhone.mutate({
        onSucess: () => {
          dialogState.hide()
          history.replace("/")
        },
        data,
      })
    },
    [deletePhone, history],
  )

  if (isLoading) {
    return (
      <>
        <MainHeaderLayout>
          <BackButtonTitle>
            {location?.state?.phoneName || "Loading"}
          </BackButtonTitle>
        </MainHeaderLayout>
        <GridPhoneLoading />
      </>
    )
  }

  if (!data || isError) {
    return (
      <>
        <MainHeaderLayout>
          <BackButtonTitle>Go back</BackButtonTitle>
        </MainHeaderLayout>
        <MainErrorMessage>
          <h3 className="self-center text-3xl font-semibold">
            Unable to load the phone, try it more later
          </h3>
        </MainErrorMessage>
      </>
    )
  }

  return (
    <>
      <MainHeaderLayout>
        <BackButtonTitle>{data.name}</BackButtonTitle>
        <MainHeaderActionsLayout>
          <DeleteButton
            onClick={onClick}
            data={data}
            titleModal={`Delete ${data.name} from the catalog`}
            textModal="Are you sure want to delete this phone?. This action can't
            be undone."
          >
            Delete Phone
          </DeleteButton>
          <EditPhone slug={data.slug} name={data.name} />
        </MainHeaderActionsLayout>
      </MainHeaderLayout>
      <GridPhoneData data={data} />
    </>
  )
}

export const DetailScreen = () => {
  return (
    <MainLayout>
      <DetailContent />
    </MainLayout>
  )
}
