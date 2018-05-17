import React from "react"
import { graphql } from "react-apollo"
import { Redirect } from "react-router-dom"
import { config } from "../../config"
import { socialAuth } from "../../queries/users.gql"

const Figshare = props => {
  const access_token = new URLSearchParams(props.location.search).get(
    "access_token"
  )
  localStorage.setItem(config.FIGSHARE_TOKEN, access_token)

  const result = props
    .socialAuth({
      variables: {
        provider: "figshare",
        accessToken: localStorage.getItem(config.FIGSHARE_TOKEN),
      },
    })
    .then(({ data }) => {
      const { token } = data.socialAuth
      localStorage.setItem(config.TOKEN_NAME, token)
    })

  return <Redirect to="/" />
}

export default graphql(socialAuth, { name: "socialAuth" })(Figshare)
