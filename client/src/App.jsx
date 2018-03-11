import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"

import HomeView from "./views/HomeView"
import AuthView from "./views/AuthView"
import DashboardView from "./views/DashboardView"
import DatasetsView from "./views/DatasetsView"
import TasksView from "./views/TasksView"
import ProfileView from "./views/ProfileView"
import FilesView from "./views/FilesView"

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={props => <HomeView {...props} />} />
        <Route path="/signup" render={props => <AuthView {...props} />} />
        <Route path="/login" render={props => <AuthView {...props} />} />
        <Route path="/logout" render={props => <AuthView {...props} />} />
        <Route
          path="/dashboard"
          render={props => <DashboardView {...props} />}
        />
        <Route path="/datasets" render={props => <DatasetsView {...props} />} />
        <Route path="/tasks" render={props => <TasksView {...props} />} />
        <Route path="/files" render={props => <FilesView {...props} />} />
        <Route path="/profile" render={props => <ProfileView {...props} />} />
      </React.Fragment>
    )
  }
}

export default App
