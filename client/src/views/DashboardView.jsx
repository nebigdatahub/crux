import gql from "graphql-tag"
import React, { Component } from "react"
import { compose, graphql } from "react-apollo"
import Navbar from "../components/Navbar"
import AnalysesPublic from "../components/analysis/AnalysesPublic"
import DatasetsPublic from "../components/datasets/DatasetsPublic"

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
