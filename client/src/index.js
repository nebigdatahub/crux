import React from "react"
import { render } from "react-dom"
import { BrowserRouter } from "react-router-dom"

import { ApolloProvider } from "react-apollo"

import client from "./apollo"
import App from "./App"

import "./assets/styles/style.scss"

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,

  document.getElementById("app")
)

if (process.env.NODE_ENV == "development") {
  module.hot.accept()
}
