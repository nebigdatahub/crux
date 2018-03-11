import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Switch } from "react-router-dom"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { menuItems } from "../config"
import { graphql, compose } from "react-apollo"
import { currentUserQuery } from "../queries/users.gql"
import Layout from "./Layout"

class DashboardView extends Component {
  render() {
    return (
      <Layout>
        <Navbar />
        <Sidebar />
        {this.props.currentUserQuery &&
        this.props.currentUserQuery.currentUser ? (
          <DashboardQuickActions {...this.props} />
        ) : (
          "You need to be logged in"
        )}
      </Layout>
    )
  }
}

const DashboardQuickActions = props => {
  return (
    <React.Fragment>
      <h1 className="title">Quick Actions</h1>
      <div className="buttons">
        <Link to="/datasets/new" className="button is-info">
          Create new dataset
        </Link>
      </div>
    </React.Fragment>
  )
}

export default compose(
  graphql(currentUserQuery, {
    name: "currentUserQuery",
    options: { errorPolicy: "all" },
  })
)(DashboardView)
