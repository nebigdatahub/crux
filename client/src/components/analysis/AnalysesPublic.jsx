import React, { Component } from "react"
import { Query } from "react-apollo"

import { allAnalyses } from "../../queries/datasets.gql"
import AnalysisCard from "./AnalysisCard"

class AnalysesPublic extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="columns is-multiline is-mobile">
          <Analyses />
        </section>
      </React.Fragment>
    )
  }
}

const Analyses = () => (
  <Query query={allAnalyses}>
    {({ error, loading, data }) => {
      if (error) return "error"
      if (loading) return "loading"

      const { allAnalyses } = data
      return (
        allAnalyses &&
        allAnalyses.map((dataset, idx) => (
          <div key={idx} className="column is-4-desktop">
            <AnalysisCard {...dataset} />
          </div>
        ))
      )
    }}
  </Query>
)

export default AnalysesPublic
