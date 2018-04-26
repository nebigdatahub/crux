import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { graphql, compose } from "react-apollo"

import { menuItems } from "../config"
import gql from "graphql-tag"

import QuickActions from "./layouts/QuickActions"
import MyDatasets from "../components/datasets/MyDatasets"
import UserTasks from "../components/tasks/UserTasks"
import Navbar from "../components/Navbar"
import DatasetsPublic from "../components/datasets/DatasetsPublic"
import AnalysesPublic from "../components/analysis/AnalysesPublic"

class DashboardView extends Component {
  quickActions = {
    title: "Dashboard",
    links: [{ text: "Create new dataset", url: "/datasets/new" }],
  }
  render() {
    const { currentUserQuery } = this.props
    return (
      <React.Fragment>
        <Navbar />
        <section className="section container">
          <h1 className="title">Datasets</h1>
          <DatasetsPublic />
          <h2 className="subtitle">My Datasets</h2>
          <MyDatasets />
          <h1 className="title">Analyses</h1>
          <AnalysesPublic />
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
