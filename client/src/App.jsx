import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import MainLayout from "./assets/layouts/MainLayout";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={MainLayout} />
        <Route path='/login' component={MainLayout} />
      </Switch>
    )
  }
}

export default App;