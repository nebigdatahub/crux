import React from "react"
import { render } from "react-dom"
import { BrowserRouter } from "react-router-dom"

import { ApolloProvider } from "react-apollo"

import client from "./apollo"
import App from "./App"

import "./assets/styles/style.scss"

function log(strings) {
  console.log(strings.raw[0])
}

log`
   ____    ____     _     _  __     __
  / __ \  |  _  \  | |   | | \ \   / /
 / /  \_\ | |_\  \ | |   | |  \ \ / /
| |       |  _  /  | |   | |   |   |
 \ \__/ \ | | \ \  | |___| |  / / \ \
  \____/  |_|  \_\  \_____/  /_/   \_\

`

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
