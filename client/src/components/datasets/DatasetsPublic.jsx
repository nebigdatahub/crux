import React, { Component } from "react"
import { Query } from "react-apollo"

import DatasetCard from "./DatasetCard"

import { allDatasets } from "../../queries/datasets.gql"

class DatasetsPublic extends Component {
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
  <Query query={allDatasets}>
    {({ error, loading, data }) => {
      if (error) return "error"
      if (loading) return "loading"

      const { allDatasets } = data
      return (
        allDatasets &&
        allDatasets.map((dataset, idx) => (
          <div key={idx} className="column is-4-desktop">
            <DatasetCard {...dataset} />
          </div>
        ))
      )
    }}
  </Query>
)

export default DatasetsPublic
