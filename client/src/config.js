import React from "react"

const devSettings = {
  ROOT_URI: "http://localhost:8000",
}

const prodSettings = {
  ROOT_URI: "https://crux-nebigdatahub.herokuapp.com",
}

const stageSettings = {
  ROOT_URI: "https://crux-staging-nebigdatahub.herokuapp.com",
}

let settings
switch (process.env.NODE_ENV) {
  case "production":
    settings = prodSettings
    break
  case "staging":
    settings = stageSettings
    break
  default:
    settings = devSettings
    break
}

const ROOT_URI = settings.ROOT_URI
const GRAPHQL_URI = "/graphql"
const TOKEN_NAME = "token"
const FIGSHARE_TOKEN = "figshare_token"

export { ROOT_URI, GRAPHQL_URI, TOKEN_NAME, FIGSHARE_TOKEN }
