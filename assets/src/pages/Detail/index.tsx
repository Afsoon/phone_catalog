import { Switch, Route, useRouteMatch } from "react-router-dom"
import { DetailScreen } from "./DetailScreen"
import { EditForm } from "./EditForm"

function Detail() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/edit`}>
        <EditForm />
      </Route>
      <Route path={`${match.path}`}>
        <DetailScreen />
      </Route>
    </Switch>
  )
}

export default Detail
