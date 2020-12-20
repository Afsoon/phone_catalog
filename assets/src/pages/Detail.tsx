import { Button } from "reakit"
import { Link, useHistory, useParams, useLocation } from "react-router-dom"
import { Header } from "../components/Header"
import Text from "../components/Text"
import AppShell from "../components/AppShell"
import { Footer } from "../components/Footer"
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from "reakit/Dialog"
import { useShowOnePhone, useDeletePhone } from "../hooks/api"
import Error from "../Error/Error.svg"

const HeaderDetail = () => {
  return (
    <Header>
      <Text as="h1" className="self-center text-6xl pt-2 pb-2 md:pb-0 lg:pt-8">
        Phone Catalog
      </Text>
    </Header>
  )
}

const DeletePhone = () => {
  const dialog = useDialogState()
  const history = useHistory()
  const mutation = useDeletePhone()
  const iPhone7 = {
    id: 0,
    name: "iPhone 7",
    manufacturer: "Apple",
    description: "lorem ipsum dolor sit amet consectetur.",
    color: "black",
    price: 769,
    imageFileName:
      "https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    screen: "4,7 inch IPS",
    processor: "A10 Fusion",
    ram: 2,
    slug: "iphone-7",
  }
  return (
    <>
      <DialogDisclosure
        {...dialog}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Borrar teléfono
      </DialogDisclosure>
      <DialogBackdrop
        {...dialog}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          ></span>
          &#8203;
          <Dialog
            {...dialog}
            role="alertdialog"
            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            aria-labelledby="modal-headline"
          >
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Borrar iPhone X del cátalogo
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    ¿Estas seguro de querer borrar el télefono del listado?.
                    Esta operación no se puede deshacer
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
              <Button
                onClick={() => {
                  mutation.mutate(iPhone7)
                  dialog.hide()
                  history.replace("/")
                }}
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
              >
                Borrar
              </Button>
              <Button
                onClick={dialog.hide}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancelar
              </Button>
            </div>
          </Dialog>
        </div>
      </DialogBackdrop>
    </>
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

const ContentDetail = () => {
  const { slugPhoneName } = useParams<{ slugPhoneName: string }>()
  const { data, isLoading, isError } = useShowOnePhone({ slug: slugPhoneName })
  const location = useLocation<{ phoneName: string }>()

  if (isLoading) {
    return (
      <main className="row-span-3 row-start-4 -mt-32 overflow-hidden h-full">
        <div className="max-w-7xl xl:max-w-6xl 2xl:max-w-5xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full">
          <div className="overflow-auto h-full bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
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
                  {location.state.phoneName}
                </h2>
              </Link>
              <div className="mt-3 flex sm:mt-0 sm:ml-4">
                <DeletePhone />
                <EditPhone />
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="animate-pulse grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 2xl:grid-rows-2">
                <div className="bg-blue-400 rounded sm:col-span-2 lg:col-span-1 lg:row-span-2 xl:row-span-2 object-cover" />
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Screen</dt>
                  <div className="bg-blue-400 h-4 w-3/4 rounded"></div>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">RAM</dt>
                  <div className="bg-blue-400 h-4 w-3/4 rounded"></div>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Manufacturer
                  </dt>
                  <div className="bg-blue-400 h-4 w-3/4 rounded"></div>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Color</dt>
                  <div className="bg-blue-400 h-4 w-3/4 rounded"></div>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Price</dt>
                  <div className="bg-blue-400 h-4 w-3/4 rounded"></div>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Description
                  </dt>
                  <div className="bg-blue-400 h-4 w-3/4 rounded"></div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!data || isError) {
    return (
      <main className="row-span-3 row-start-4 -mt-32 overflow-hidden h-full">
        <div
          aria-label="Phone Catalog"
          className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full"
        >
          <div className="bg-white h-full overflow-auto rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
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
                  Go back
                </h2>
              </Link>
            </div>
            <div className="flex flex-col px-5 py-6 sm:px-6">
              <img
                src={Error}
                className="h-1/2 w-1/2 self-center"
                alt="Unable to load the phones"
              />
              <h3 className="self-center text-3xl font-semibold">
                Unable to load the phone, try it more later
              </h3>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="row-span-3 row-start-4 -mt-32 overflow-hidden h-full">
      <div className="max-w-7xl xl:max-w-6xl 2xl:max-w-5xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full">
        <div className="overflow-auto h-full bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
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
                {data.name}
              </h2>
            </Link>
            <div className="mt-3 flex sm:mt-0 sm:ml-4">
              <DeletePhone />
              <EditPhone />
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 2xl:grid-rows-2">
              <img
                src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
                alt=""
                className="sm:col-span-2 lg:col-span-1 lg:row-span-2 xl:row-span-2 object-cover"
              />
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Screen</dt>
                <dd className="mt-1 text-sm text-gray-900">{data.screen}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">RAM</dt>
                <dd className="mt-1 text-sm text-gray-900">{data.ram}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Manufacturer
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {data.manufacturer}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Color</dt>
                <dd className="mt-1 text-sm text-gray-900">{data.color}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Price</dt>
                <dd className="mt-1 text-sm text-gray-900">{data.price}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  Description
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {data.description}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  )
}

function Detail() {
  return (
    <AppShell>
      <HeaderDetail />
      <ContentDetail />
      <Footer />
    </AppShell>
  )
}

export default Detail
