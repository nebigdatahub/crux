import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"

import HomeView from "./views/HomeView"
import AuthView from "./views/AuthView"
import DashboardView from "./views/DashboardView"
import DatasetsView from "./views/DatasetsView"
import TasksView from "./views/TasksView"
import ProfileView from "./views/ProfileView"
import FilesView from "./views/FilesView"
import AnalysisView from "./views/AnalysisView"

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
        <Route path="/tasks" render={() => <TasksView />} />
        <Route path="/files" render={() => <FilesView />} />
        <Route path="/profile" render={() => <ProfileView />} />
        <Route path="/analysis" render={() => <AnalysisView />} />
      </React.Fragment>
    )
  }
}

export default App
