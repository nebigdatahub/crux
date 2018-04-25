import React, { Component } from "react"
import { Route, Link, withRouter } from "react-router-dom"
import DatasetCard from "./DatasetCard"
import gql from "graphql-tag"
import { graphql, Query, compose } from "react-apollo"
import DatasetDetail from "./DatasetDetail"

import { userDatasetsQuery } from "../../queries/datasets.gql"

class UsersDatasets extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="title">My datasets</h1>
        <section className="columns is-multiline is-mobile">
          <div className="column is-3">
            <Query query={USER_DATASETS}>
              {({ loading, error, data }) => {
                if (error) return ""
                if (loading) return ""

                const { userDatasets } = data
                return <DatasetList datasets={userDatasets} />
              }}
            </Query>
          </div>
          <Route
            path="/datasets/:uuid([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})"
            render={props => <DatasetDetail {...props} />}
          >
            <div className="column">asdjalskjdlwkj</div>
          </Route>
        </section>
      </React.Fragment>
    )
  }
}

const DatasetList = ({ datasets }) => {
  return (
    <nav className="panel">
      <div className="panel-block">
        <p className="control has-icons-left">
          <input className="input is-small" type="text" placeholder="search" />
          <span className="icon is-small is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      {datasets &&
        datasets.map((dataset, idx) => (
          <Link
            to={"/datasets/" + dataset.uuid}
            key={idx}
            className="panel-block"
          >
            {dataset.name}
          </Link>
        ))}
    </nav>
  )
}

const USER_DATASETS = userDatasetsQuery

export default compose(withRouter)(UsersDatasets)
