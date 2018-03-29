import React, { Component } from "react"
import DashboardView from "./views/DashboardView"
import DatasetsView from "./views/DatasetsView"

const devSettings = {
  ROOT_URI: "http://localhost:8000",
}

const prodSettings = {
  ROOT_URI: "https://crux-nebigdatahub.herokuapp.com",
}

const stageSettings = {
  ROOT_URI: "https://crux-staging-nebigdatahub.herokuapp.com",
}

const settings =
  process.env.NODE_ENV == "production"
    ? prodSettings
    : "staging" ? stageSettings : devSettings

const config = {
  ...settings,
  GRAPHQL_URI: "/graphql",
  TOKEN_NAME: "token",
}

export { config }
