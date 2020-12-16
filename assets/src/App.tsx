import { useEffect, useState } from "react"

const getPhones = async () => await fetch("http://localhost:3000/phones", {})

const ContainerApp: React.FC = ({ children }) => {
  return (
    <div className="overflow-hidden w-screen h-screen bg-gray-100 grid grid-rows-7">
      {children}
    </div>
  )
}

const Header = () => {
  return (
    <header className="row-span-3 flex bg-gray-800 pb-32 text-white px-4 justify-center">
      <div className="flex flex-col max-w-7xl w-full">
        <h1 className="self-center text-6xl pt-2 pb-2 md:pb-0 lg:pt-8">
          Phone Catalog
        </h1>
        <SubHeader />
      </div>
    </header>
  )
}

const AddPhone = () => {
  return (
    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
      Añadir teléfono
    </button>
  )
}

const SubHeader = () => {
  return (
    <div className="hidden md:pb-2 md:inline-block md:self-end md:px-2 2xl:px-8 sm:px-6 lg:px-4">
      <AddPhone />
    </div>
  )
}

const Card = () => {
  return (
    <li className="flex flex-col w-full shadow-lg rounded-sm bg-white">
      <img
        src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
        alt=""
      />
      <div className="px-4 pb-2 space-y-1">
        <div className="text-md ">
          <span className="pr-1 text-sm text-gray-600">Nombre:</span>
          iPhone X
        </div>
        <div className="text-md ">
          <span className="pr-1 text-sm text-gray-600">Precio:</span>
          800€
        </div>
        <div className="text-md ">
          <span className="pr-1 text-sm text-gray-600">Manufacturador:</span>
          Apple
        </div>
      </div>
    </li>
  )
}

const GridPhone = () => {
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
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full">
        <ul className="h-full overflow-auto bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4 list-none py-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ul>
      </div>
    </main>
  )
}

function App() {
  return (
    <ContainerApp>
      <Header />
      <GridPhone />
      <div className="row-span-1 row-start-7 bg-gray-800 flex justify-end py-4 px-4">
        <div className="md:hidden">
          <AddPhone />
        </div>
      </div>
    </ContainerApp>
  )
}

export default App
