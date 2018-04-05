import React, { Component } from "react"
import DatasetCard from "./DatasetCard"
import gql from "graphql-tag"
import { compose, graphql, Query } from "react-apollo"

class UsersDatasets extends Component {
  render() {
    const { error, loading, userDatasets } = this.props.userDatasetsQuery
    return (
      <React.Fragment>
        <h1 className="title">My datasets</h1>
        <section className="columns is-multiline is-mobile">
          {userDatasets &&
            userDatasets.map((dataset, idx) => (
              <div key={idx} className="column is-3-desktop">
                <DatasetCard {...dataset} />
              </div>
            ))}
        </section>
      </React.Fragment>
    )
  }
}

const userDatasetsQuery = gql`
  query userDatasetsQuery {
    userDatasets {
      name
      description
    }
  }
`

export default compose(
  graphql(userDatasetsQuery, { name: "userDatasetsQuery" })
)(UsersDatasets)
