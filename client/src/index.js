import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from "redux";
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './assets/styles/style.scss';

// let store = createStore()

ReactDOM.render(
  // <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </Provider>
  , document.getElementById('app'))

if (process.env != "production") {
  module.hot.accept();
}
