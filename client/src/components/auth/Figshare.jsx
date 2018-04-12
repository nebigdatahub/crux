import React from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"

const Figshare = props => {
  const access_token = new URLSearchParams(props.location.search).get(
    "access_token"
  )
  localStorage.setItem("figshare_token", access_token)

  const instance = axios.create({
    headers: {
      Authorization: `token ${localStorage.getItem("figshare_token")}`,
    },
  })
  instance.get("https://api.figshare.com/v2/account").then(({ data }) => {
    console.log(data)
  })

  return <Redirect to="/dashboard" />
}

export default Figshare
