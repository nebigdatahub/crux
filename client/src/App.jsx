import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"

import HomeView from "./views/HomeView"
import AuthView from "./views/AuthView"
import DashboardView from "./views/DashboardView"
import DatasetsView from "./views/DatasetsView"
import AnalysesView from "./views/AnalysesView"
import Figshare from "./components/auth/Figshare"
import DatasetPage from "./views/DatasetPage"
import AnalysisPage from "./views/AnalysisPage"

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={props => <HomeView {...props} />} />
        <Route path="/signup" render={props => <AuthView {...props} />} />
        <Route path="/login" render={props => <AuthView {...props} />} />
        <Route path="/logout" render={props => <AuthView {...props} />} />
        <Route path="/dashboard" render={() => <DashboardView />} />
        <Route path="/datasets" render={() => <DatasetsView />} />
        <Route path="/analyses" render={() => <AnalysesView />} />
        <Route
          path="/oauth/figshare"
          render={props => <Figshare {...props} />}
        />
        <Route
          path="/dataset/:uuid([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})"
          render={() => <DatasetPage />}
        />
        <Route
          path="/analysis/:uuid([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})"
          render={() => <AnalysisPage />}
        />
      </React.Fragment>
    )
  }
}

export default App
