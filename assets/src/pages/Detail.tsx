import { Link, useParams, useLocation, useHistory } from "react-router-dom"
import { Button } from "reakit"
import Header from "../components/Header"
import Text from "../components/Text"
import AppShell from "../components/AppShell"
import { Footer } from "../components/Footer"
import { useDeletePhone, useShowOnePhone } from "../hooks/api"
import MainLayout, {
  MainHeaderLayout,
  MainHeaderActionsLayout,
  MainContentLayout,
  MainErrorMessage,
} from "../components/Main"
import { GridInformation, GridTable } from "../components/Grid"
import { DeleteButton } from "../components/DeleteAction"
import { useCallback } from "react"
import { DialogStateReturn } from "reakit/Dialog"
import { PhoneModel } from "../src/types"

const HeaderDetail = () => {
  return (
    <Header>
      <Text as="h1" className="self-center text-6xl pt-2 pb-2 md:pb-0 lg:pt-8">
        Phone Catalog
      </Text>
    </Header>
  )
}

const EditPhone = () => {
  return (
    <Button
      type="button"
      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Editar teléfono
    </Button>
  )
}

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

const Content = () => {
  const { slugPhoneName } = useParams<{ slugPhoneName: string }>()
  const { data, isLoading, isError } = useShowOnePhone({ slug: slugPhoneName })
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
          <BackButtonTitle>{location.state.phoneName}</BackButtonTitle>
        </MainHeaderLayout>
        <MainContentLayout>
          <GridTable className="animate-pulse">
            <div className="bg-blue-400 rounded sm:col-span-2 lg:col-span-1 lg:row-span-2 xl:row-span-2 object-cover" />
            <GridInformation className="sm:col-span-1" label="Screen">
              <div className="bg-blue-400 h-4 w-3/4 rounded" />
            </GridInformation>
            <GridInformation className="sm:col-span-1" label="RAM">
              <div className="bg-blue-400 h-4 w-3/4 rounded" />
            </GridInformation>
            <GridInformation className="sm:col-span-1" label="Manufacturer">
              <div className="bg-blue-400 h-4 w-3/4 rounded" />
            </GridInformation>
            <GridInformation className="sm:col-span-1" label="Color">
              <div className="bg-blue-400 h-4 w-3/4 rounded" />
            </GridInformation>
            <GridInformation className="sm:col-span-1" label="Price">
              <div className="bg-blue-400 h-4 w-3/4 rounded" />
            </GridInformation>
            <GridInformation className="sm:col-span-2" label="Description">
              <div className="bg-blue-400 h-4 w-3/4 rounded" />
            </GridInformation>
          </GridTable>
        </MainContentLayout>
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
        <BackButtonTitle>{location.state.phoneName}</BackButtonTitle>
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
          <EditPhone />
        </MainHeaderActionsLayout>
      </MainHeaderLayout>
      <MainContentLayout>
        <GridTable>
          <img
            src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
            alt=""
            className="sm:col-span-2 lg:col-span-1 lg:row-span-2 xl:row-span-2 object-cover"
          />
          <GridInformation className="sm:col-span-1" label="Screen">
            <dd className="mt-1 text-sm text-gray-900">{data.screen}</dd>
          </GridInformation>
          <GridInformation className="sm:col-span-1" label="RAM">
            <dd className="mt-1 text-sm text-gray-900">{data.ram}</dd>
          </GridInformation>
          <GridInformation className="sm:col-span-1" label="Manufacturer">
            <dd className="mt-1 text-sm text-gray-900">{data.manufacturer}</dd>
          </GridInformation>
          <GridInformation className="sm:col-span-1" label="Color">
            <dd className="mt-1 text-sm text-gray-900">{data.color}</dd>
          </GridInformation>
          <GridInformation className="sm:col-span-1" label="Price">
            <dd className="mt-1 text-sm text-gray-900">{data.price}</dd>
          </GridInformation>
          <GridInformation className="sm:col-span-2" label="Description">
            <dd className="mt-1 text-sm text-gray-900">{data.description}</dd>
          </GridInformation>
        </GridTable>
      </MainContentLayout>
    </>
  )
}

function Detail() {
  return (
    <AppShell>
      <HeaderDetail />
      <MainLayout>
        <Content />
      </MainLayout>
      <Footer />
    </AppShell>
  )
}

export default Detail
