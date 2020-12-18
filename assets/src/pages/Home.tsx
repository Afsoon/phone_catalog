import { Link } from "react-router-dom"
import PhoneCardInformation from "../components/PhoneCardInformation"
import { Header, SubHeader } from "../components/Header"
import Text from "../components/Text"
import AppShell from "../components/AppShell"
import { Footer, FooterActionOnMobile } from "../components/Footer"
import { useListPhones } from "../hooks/api"

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
    return <div>Cargando</div>
  }

  if (isError) {
    return <div>Error</div>
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
