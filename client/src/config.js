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

const settings =
  process.env.NODE_ENV == "production"
    ? prodSettings
    : process.env.NODE_ENV == "staging"
      ? stageSettings
      : devSettings

const config = {
  ...settings,
  GRAPHQL_URI: "/graphql",
  TOKEN_NAME: "token",
  FIGSHARE_TOKEN: "figshare_token",
}

export { config }
