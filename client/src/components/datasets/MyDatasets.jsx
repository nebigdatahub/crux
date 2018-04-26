import React, { Component } from "react"
import { Route, Link, withRouter } from "react-router-dom"
import DatasetCard from "./DatasetCard"
import gql from "graphql-tag"
import { graphql, Query, compose } from "react-apollo"

import { userDatasets } from "../../queries/datasets.gql"

class MyDatasets extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="columns is-multiline is-mobile">
          <Datasets />
        </section>
      </React.Fragment>
    )
  }
}

const Datasets = () => (
  <Query query={userDatasets}>
    {({ error, loading, data }) => {
      if (error) return "error"
      if (loading) return "loading"

      const { userDatasets } = data
      return (
        userDatasets &&
        userDatasets.map((dataset, idx) => (
          <div key={idx} className="column is-4-desktop">
            <DatasetCard {...dataset} />
          </div>
        ))
      )
    }}
  </Query>
)

export default compose(withRouter)(MyDatasets)
