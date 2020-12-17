import { useEffect, useState } from "react"
import { Button } from "reakit"
import { Header } from "../components/Header"
import Text from "../components/Text"
import AppShell from "../components/AppShell"
import { Footer } from "../components/Footer"

const getPhones = async () => await fetch("http://localhost:3000/phones", {})

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
  return (
    <Button
      type="button"
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Borrar teléfono
    </Button>
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
  const [, setState] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const res = await getPhones()
      setState(await res.json())
    }
    fetch()
  }, [])

  return (
    <main className="row-span-3 row-start-4 -mt-32 overflow-hidden h-full">
      <div className="max-w-7xl xl:max-w-6xl 2xl:max-w-5xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full">
        <div className="overflow-auto h-full bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              iPhone X
            </h3>
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
                <dt className="text-sm font-medium text-gray-500">Pantalla</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Backend Developer
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Salary expectation
                </dt>
                <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Salary expectation
                </dt>
                <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Salary expectation
                </dt>
                <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Salary expectation
                </dt>
                <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                  incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                  consequat sint. Sit id mollit nulla mollit nostrud in ea
                  officia proident. Irure nostrud pariatur mollit ad adipisicing
                  reprehenderit deserunt qui eu.
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
