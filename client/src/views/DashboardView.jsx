import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { graphql, compose } from "react-apollo"

import { menuItems } from "../config"
import gql from "graphql-tag"

import SidebarLayout from "./layouts/SidebarLayout"
import QuickActionsLayout from "./layouts/QuickActionsLayout"

class DashboardView extends Component {
  quickActions = {
    title: "Dashboard",
    links: [{ text: "Create new dataset", url: "/datasets/new" }],
  }
  render() {
    const { currentUserQuery } = this.props
    return (
      <SidebarLayout>
        {currentUserQuery && currentUserQuery.currentUser ? (
          <QuickActionsLayout {...this.quickActions} />
        ) : (
          "You need to be logged in"
        )}
      </SidebarLayout>
    )
  }
}

const currentUserQuery = gql`
  query currentUserQuery {
    currentUser {
      email
      firstName
      lastName
      username
    }
  }
`

export default compose(
  graphql(currentUserQuery, {
    name: "currentUserQuery",
  })
)(DashboardView)
