import React from "react"
import { ApolloProvider } from "react-apollo"
import { render } from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import client from "./apollo"
import "./assets/styles/style.scss"

function log(strings) {
  if (process.env.NODE_ENV == "production") console.log(strings.raw[0])
}

log`
 .d8888b.    8888888b.    888     888   Y88b   d88P
d88P  Y88b   888   Y88b   888     888    Y88b d88P
888    888   888    888   888     888     Y88o88P
888          888   d88P   888     888      Y888P
888          8888888P"    888     888      d888b
888    888   888 T88b     888     888     d88888b
Y88b  d88P   888  T88b    Y88b. .d88P    d88P Y88b
 "Y8888P"    888   T88b    "Y88888P"    d88P   Y88b
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
