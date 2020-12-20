import Header from "./components/Header"
import AppShell from "./components/AppShell"
import { Footer } from "./components/Footer"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import Detail from "./pages/Detail"
import Form from "./pages/Form"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

const AppLayout: React.FC = ({ children }) => {
  return (
    <AppShell>
      <Header>
        <h1 className="self-center text-6xl pt-2 pb-2 md:pb-0 lg:pt-8">
          Phone Catalog
        </h1>
      </Header>
      {children}
      <Footer />
    </AppShell>
  )
}

function App() {
  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AppLayout>
            <Switch>
              <Route path="/new">
                <Form />
              </Route>
              <Route path="/phone/:slugPhoneName">
                <Detail />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </AppLayout>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Router>
    </>
  )
}

export default App
