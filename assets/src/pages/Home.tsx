import { Link } from "react-router-dom"
import PhoneCardInformation, {
  LoadingCard,
  LoadingCardSkeleton,
} from "../components/PhoneCardInformation"
import { Header, SubHeader } from "../components/Header"
import Text from "../components/Text"
import AppShell from "../components/AppShell"
import { Footer, FooterActionOnMobile } from "../components/Footer"
import { useListPhones } from "../hooks/api"
import Error from "../Error/Error.svg"

const HeaderHome = () => {
  return (
    <Header>
      <Text as="h1" className="self-center text-6xl pt-2 pb-2 md:pb-0 lg:pt-8">
        Phone Catalog
      </Text>
      <SubHeader>
        <AddPhone />
      </SubHeader>
    </Header>
  )
}

const FooterHome = () => {
  return (
    <Footer>
      <FooterActionOnMobile>
        <AddPhone />
      </FooterActionOnMobile>
    </Footer>
  )
}

const AddPhone = () => {
  return (
    <Link
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
      to="/new"
    >
      Añadir teléfono
    </Link>
  )
}

const ContentHome = () => {
  const { data, isFetching, isError } = useListPhones()

  if (isFetching) {
    return (
      <main className="row-span-3 row-start-4 -mt-32 overflow-hidden h-full">
        <div
          aria-label="Phone Catalog"
          className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full"
        >
          <div className="bg-white h-full overflow-auto rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="pb-5 border-b border-gray-200 rounded-lg sm:flex sm:items-center sm:justify-between">
              <h2 className="text-2xl ml-2 leading-6 font-medium text-gray-900">
                Listado de teléfonos
              </h2>
            </div>
            <ul className="border-t border-gray-200 px-4 py-5 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4 list-none">
              <LoadingCard>
                <LoadingCardSkeleton />
              </LoadingCard>
              <LoadingCard>
                <LoadingCardSkeleton />
              </LoadingCard>
              <LoadingCard>
                <LoadingCardSkeleton />
              </LoadingCard>
              <LoadingCard>
                <LoadingCardSkeleton />
              </LoadingCard>
              <LoadingCard>
                <LoadingCardSkeleton />
              </LoadingCard>
            </ul>
          </div>
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="row-span-3 row-start-4 -mt-32 overflow-hidden h-full">
        <div
          aria-label="Phone Catalog"
          className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full"
        >
          <div className="bg-white h-full overflow-auto rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="pb-5 border-b border-gray-200 rounded-lg sm:flex sm:items-center sm:justify-between">
              <h2 className="text-2xl ml-2 leading-6 font-medium text-gray-900">
                Listado de teléfonos
              </h2>
            </div>
            <div className="flex flex-col px-5 py-6 sm:px-6">
              <img
                src={Error}
                className="h-1/2 w-1/2 self-center"
                alt="Unable to load the phones"
              />
              <h3 className="self-center text-3xl font-semibold">
                Unable to load the phones, try it more later
              </h3>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (data?.length === 0) {
    return (
      <main className="row-span-3 row-start-4 -mt-32 overflow-hidden h-full">
        <div
          aria-label="Phone Catalog"
          className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full"
        >
          <div className="bg-white h-full overflow-auto rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="pb-5 border-b border-gray-200 rounded-lg sm:flex sm:items-center sm:justify-between">
              <h2 className="text-2xl ml-2 leading-6 font-medium text-gray-900">
                Listado de teléfonos
              </h2>
            </div>
            <div className="flex flex-col px-5 py-6 sm:px-6 space-y-4">
              <h3 className="self-center text-3xl font-semibold">
                There isn't phones to display, please add one.
              </h3>
              <Link
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 self-center"
                to="/new"
              >
                Añadir teléfono
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="row-span-3 row-start-4 -mt-32 overflow-hidden h-full">
      <div
        aria-label="Phone Catalog"
        className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full"
      >
        <div className="bg-white h-full overflow-auto rounded-lg shadow px-5 py-6 sm:px-6">
          <div className="pb-5 border-b border-gray-200 rounded-lg sm:flex sm:items-center sm:justify-between">
            <h2 className="text-2xl ml-2 leading-6 font-medium text-gray-900">
              Listado de teléfonos
            </h2>
          </div>
          <ul className="border-t border-gray-200 px-4 py-5 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4 list-none">
            {data?.map((phone) => {
              return (
                <li key={`${phone.id}-${phone.name}`}>
                  <Link to={`/phone/${phone.name}`}>
                    <PhoneCardInformation
                      src={phone.imageFileName}
                      alt=""
                      productName={phone.name}
                      price={phone.price}
                      manufacturer={phone.manufacturer}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
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
