import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { graphql, compose } from "react-apollo"

import { menuItems } from "../config"
import { currentUserQuery } from "../queries/users.gql"

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

export default compose(
  graphql(currentUserQuery, {
    name: "currentUserQuery",
  })
)(DashboardView)
