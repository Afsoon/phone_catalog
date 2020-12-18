import Lottie from "lottie-react-web"
import { Link } from "react-router-dom"
import animation from "../Tissue/tissue.json"
import { Header } from "../components/Header"
import Text from "../components/Text"
import AppShell from "../components/AppShell"
import { Footer } from "../components/Footer"

const NotFoundHeader = () => {
  return (
    <Header>
      <Text as="h1" className="self-center text-6xl pt-2 pb-2 md:pb-0 lg:pt-8">
        Phone Catalog
      </Text>
    </Header>
  )
}

const NotFoundContent = () => {
  return (
    <main className="row-span-3 row-start-4 -mt-32">
      <div
        aria-label="Phone Catalog"
        className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white rounded-lg flex flex-col shadow px-5 py-6 sm:px-6">
          <h2 className="text-4xl font-semibold text-center">Page not found</h2>
          <Lottie
            options={{ animationData: animation }}
            width="50%"
            height="50%"
          />
          <Link
            to="/"
            className="self-center inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

function NotFound() {
  return (
    <AppShell>
      <NotFoundHeader />
      <NotFoundContent />
      <Footer />
    </AppShell>
  )
}

export default NotFound
