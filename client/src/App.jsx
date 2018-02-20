import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import HomeView from "./assets/views/HomeView";
import SignupView from "./assets/views/SignupView"

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomeView} />
        <Route path='/signup' component={SignupView} />
      </Switch>
    )
  }
}

export default App;