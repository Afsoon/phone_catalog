import Lottie from "lottie-react-web"
import { Link } from "react-router-dom"
import animation from "../Tissue/tissue.json"
import MainLayout, { MainContentLayout } from "../components/Main"

function NotFound() {
  return (
    <MainLayout>
      <MainContentLayout className="flex flex-col" withoutBorder>
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
      </MainContentLayout>
    </MainLayout>
  )
}

export default NotFound
