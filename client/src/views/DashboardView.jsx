import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { graphql, compose } from "react-apollo"

import { menuItems } from "../config"
import gql from "graphql-tag"

import SidebarLayout from "./layouts/SidebarLayout"
import QuickActions from "./layouts/QuickActions"
import UsersDatasets from "../components/datasets/UsersDatasets"
import UserTasks from "../components/tasks/UserTasks"

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
          <QuickActions {...this.quickActions} />
        ) : (
          "You need to be logged in"
        )}
        <section className="columns">
          <div className="column is-half">
            <UsersDatasets />
          </div>
          <div className="column is-half">
            <UserTasks />
          </div>
        </section>
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
