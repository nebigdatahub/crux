import React, { Component } from "react"
import { Query } from "react-apollo"

import { allAnalysis } from "../../queries/datasets.gql"
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
  <Query query={allAnalysis}>
    {({ error, loading, data }) => {
      if (error) return "error"
      if (loading) return "loading"

      const { allAnalysis } = data
      return (
        allAnalysis &&
        allAnalysis.map((dataset, idx) => (
          <div key={idx} className="column is-4-desktop">
            <AnalysisCard {...dataset} />
          </div>
        ))
      )
    }}
  </Query>
)

export default AnalysesPublic
