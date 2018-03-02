import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import HomeView from "./views/HomeView"
import AuthView from "./views/AuthView"
import DashboardView from "./views/DashboardView"
import AuthForm from "./components/AuthForm"

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={(props) => <HomeView {...props} />} />
        <Route path='/signup' render={(props) => <AuthView {...props} />} />
        <Route path='/login' render={(props) => <AuthView {...props} />} />
        <Route path='/dashboard' render={(props) => <DashboardView {...props} />} />
      </Switch>
    )
  }
}

export default App;