import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import HomeView from "./assets/views/HomeView"
import AuthView from "./assets/views/AuthView"
import DashboardView from "./assets/views/DashboardView"
import AuthForm from "./assets/components/AuthForm"

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