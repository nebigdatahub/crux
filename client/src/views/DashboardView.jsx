import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { graphql, compose } from "react-apollo"

import { menuItems } from "../config"
import gql from "graphql-tag"

import QuickActions from "./layouts/QuickActions"
import MyDatasets from "../components/datasets/MyDatasets"
import UserTasks from "../components/tasks/UserTasks"

class DashboardView extends Component {
  quickActions = {
    title: "Dashboard",
    links: [{ text: "Create new dataset", url: "/datasets/new" }],
  }
  render() {
    const { currentUserQuery } = this.props
    return (
      <React.Fragment>
        {currentUserQuery && currentUserQuery.currentUser ? (
          <QuickActions {...this.quickActions} />
        ) : (
          "You need to be logged in"
        )}
        <section className="columns">
          <div className="column is-half">
            <MyDatasets />
          </div>
          <div className="column is-half">
            <UserTasks />
          </div>
        </section>
      </React.Fragment>
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
