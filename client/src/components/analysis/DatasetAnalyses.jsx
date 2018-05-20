import React, { Component } from "react"
import { Query, compose } from "react-apollo"
import { withRouter } from "react-router-dom"
import { datasetAnalyses } from "../../queries/datasets.gql"
import AnalysisCard from "./AnalysisCard"

class MyAnalyses extends Component {
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
  <Query query={datasetAnalyses}>
    {({ error, loading, data }) => {
      if (error) return "error"
      if (loading) return "loading"

      const { datasetAnalyses } = data
      return (
        datasetAnalyses &&
        datasetAnalyses.map((dataset, idx) => (
          <div key={idx} className="column is-4-desktop">
            <AnalysisCard {...dataset} />
          </div>
        ))
      )
    }}
  </Query>
)

export default compose(withRouter)(MyAnalyses)
