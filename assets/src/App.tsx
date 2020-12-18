import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import Detail from "./pages/Detail"
import Form from "./pages/Form"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Switch>
            <Route path="/new">
              <Form />
            </Route>
            <Route path="/phone/:phoneName">
              <Detail />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Router>
    </>
  )
}

export default App
