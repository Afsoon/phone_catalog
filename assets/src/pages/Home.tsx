import { useEffect, useState } from "react"
import { Button } from "reakit"
import {
  unstable_useGridState as useGridState,
  unstable_Grid as Grid,
  unstable_GridRow as GridRow,
  unstable_GridCell as GridCell,
} from "reakit/Grid"
import PhoneCardInformation from "../components/PhoneCardInformation"
import { Header, SubHeader } from "../components/Header"
import Text from "../components/Text"
import AppShell from "../components/AppShell"
import { Footer, FooterActionOnMobile } from "../components/Footer"

const getPhones = async () => await fetch("http://localhost:3000/phones", {})

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
    <Button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
      Añadir teléfono
    </Button>
  )
}

const ContentHome = () => {
  const [, setState] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const res = await getPhones()
      setState(await res.json())
    }
    fetch()
  }, [])
  const grid = useGridState()

  return (
    <main className="row-span-3 row-start-4 -mt-32 overflow-hidden h-full">
      <Grid
        {...grid}
        aria-label="Phone Catalog"
        className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full"
      >
        <GridRow
          {...grid}
          as="ul"
          className="h-full overflow-auto bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4 list-none py-4"
        >
          <GridCell
            {...grid}
            as="li"
            className="flex flex-col w-full shadow-lg rounded-sm bg-white"
          >
            <PhoneCardInformation
              src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
              alt=""
              productName="iPhone X"
              price={800}
              manufacturer="Apple"
            />
          </GridCell>
          <GridCell
            {...grid}
            as="li"
            className="flex flex-col w-full shadow-lg rounded-sm bg-white"
          >
            <PhoneCardInformation
              src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
              alt=""
              productName="iPhone X"
              price={800}
              manufacturer="Apple"
            />
          </GridCell>
          <GridCell
            {...grid}
            as="li"
            className="flex flex-col w-full shadow-lg rounded-sm bg-white"
          >
            <PhoneCardInformation
              src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
              alt=""
              productName="iPhone X"
              price={800}
              manufacturer="Apple"
            />
          </GridCell>
          <GridCell
            {...grid}
            as="li"
            className="flex flex-col w-full shadow-lg rounded-sm bg-white"
          >
            <PhoneCardInformation
              src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
              alt=""
              productName="iPhone X"
              price={800}
              manufacturer="Apple"
            />
          </GridCell>
          <GridCell
            {...grid}
            as="li"
            className="flex flex-col w-full shadow-lg rounded-sm bg-white"
          >
            <PhoneCardInformation
              src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
              alt=""
              productName="iPhone X"
              price={800}
              manufacturer="Apple"
            />
          </GridCell>
          <GridCell
            {...grid}
            as="li"
            className="flex flex-col w-full shadow-lg rounded-sm bg-white"
          >
            <PhoneCardInformation
              src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
              alt=""
              productName="iPhone X"
              price={800}
              manufacturer="Apple"
            />
          </GridCell>
          <GridCell
            {...grid}
            as="li"
            className="flex flex-col w-full shadow-lg rounded-sm bg-white"
          >
            <PhoneCardInformation
              src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
              alt=""
              productName="iPhone X"
              price={800}
              manufacturer="Apple"
            />
          </GridCell>
          <GridCell
            {...grid}
            as="li"
            className="flex flex-col w-full shadow-lg rounded-sm bg-white"
          >
            <PhoneCardInformation
              src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
              alt=""
              productName="iPhone X"
              price={800}
              manufacturer="Apple"
            />
          </GridCell>
          <GridCell
            {...grid}
            as="li"
            className="flex flex-col w-full shadow-lg rounded-sm bg-white"
          >
            <PhoneCardInformation
              src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
              alt=""
              productName="iPhone X"
              price={800}
              manufacturer="Apple"
            />
          </GridCell>
        </GridRow>
      </Grid>
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
