import { Link } from "react-router-dom"
import PhoneCardInformation, {
  LoadingCard,
  LoadingCardSkeleton,
} from "../components/PhoneCardInformation"
import Header from "../components/Header"
import Text from "../components/Text"
import AppShell from "../components/AppShell"
import { Footer } from "../components/Footer"
import { useListPhones } from "../hooks/api"
import MainLayout, {
  MainHeaderLayout,
  MainHeaderActionsLayout,
  MainContentLayout,
  MainErrorMessage,
} from "../components/Main"

const HeaderHome = () => {
  return (
    <Header>
      <Text as="h1" className="self-center text-6xl pt-2 pb-2 md:pb-0 lg:pt-8">
        Phone Catalog
      </Text>
    </Header>
  )
}

const AddPhone = () => {
  return (
    <Link
      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      to="/new"
    >
      Añadir teléfono
    </Link>
  )
}

const MainHeader = () => {
  return (
    <MainHeaderLayout>
      <h2 className="text-2xl ml-2 leading-6 font-medium text-gray-900">
        Phone Catalog
      </h2>
      <MainHeaderActionsLayout>
        <AddPhone />
      </MainHeaderActionsLayout>
    </MainHeaderLayout>
  )
}

const UlGridContent: React.FC = ({ children }) => {
  return (
    <MainContentLayout
      as="ul"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4 list-none"
    >
      {children}
    </MainContentLayout>
  )
}

const LoadingScreen: React.FC = () => {
  return (
    <>
      <LoadingCard>
        <LoadingCardSkeleton />
      </LoadingCard>
      <LoadingCard>
        <LoadingCardSkeleton />
      </LoadingCard>
    </>
  )
}

const EmptyStateScreen: React.FC = () => {
  return (
    <>
      <h3 className="self-center text-3xl font-semibold">
        There isn't phones to display, please add one.
      </h3>
      <Link
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 self-center"
        to="/new"
      >
        Añadir teléfono
      </Link>
    </>
  )
}

const Content = () => {
  const { data, isFetching, isError } = useListPhones()

  if (isFetching) {
    return (
      <UlGridContent>
        <LoadingScreen />
      </UlGridContent>
    )
  }

  if (isError) {
    return (
      <MainErrorMessage>
        <h3 className="self-center text-3xl font-semibold">
          Unable to load the phones, try it more later
        </h3>
      </MainErrorMessage>
    )
  }

  if (data?.length === 0) {
    return (
      <MainContentLayout className="flex flex-col px-5 py-6 sm:px-6 space-y-4">
        <EmptyStateScreen />
      </MainContentLayout>
    )
  }

  return (
    <UlGridContent>
      {data?.map((phone) => {
        return (
          <li
            key={`${phone.id}-${phone.slug}`}
            className="border border-gray-300 shadow rounded-md w-full mx-auto"
          >
            <Link
              to={{
                pathname: `/phone/${phone.slug}`,
                state: { phoneName: phone.name },
              }}
              title={`See details of ${phone.name}`}
              className="h-full"
            >
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
    </UlGridContent>
  )
}

function Home() {
  return (
    <AppShell>
      <HeaderHome />
      <MainLayout>
        <MainHeader />
        <Content />
      </MainLayout>
      <Footer />
    </AppShell>
  )
}

export default Home
