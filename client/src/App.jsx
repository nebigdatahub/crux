import React, { Component } from "react"
import { Route } from "react-router-dom"
import Figshare from "./components/auth/Figshare"
import AnalysesView from "./views/AnalysesView"
import AnalysisPage from "./views/AnalysisPage"
import AuthView from "./views/AuthView"
import DashboardView from "./views/DashboardView"
import DatasetPage from "./views/DatasetPage"
import DatasetsView from "./views/DatasetsView"
import HomeView from "./views/HomeView"
import UserPage from "./views/UserPage"
import UsersAnalyses from "./views/UsersAnalyses"
import UsersDatasets from "./views/UsersDatasets"

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
          path="/:username([a-z0-9]+)/d/:slug([0-9a-z-_]*)"
          render={() => <DatasetPage />}
        />
        <Route
          path="/:username([a-z0-9]+)/a/:slug([0-9a-z-_]*)"
          render={() => <AnalysisPage />}
        />
        <Route
          path="/:username([a-z0-9]+)/datasets"
          render={() => <UsersDatasets />}
        />
        <Route
          path="/:username([a-z0-9]+)/analyses"
          render={() => <UsersAnalyses />}
        />
        <Route
          path="/:username([a-z0-9]+)/profile"
          render={props => <UserPage {...props} />}
        />
      </React.Fragment>
    )
  }
}

export default App
