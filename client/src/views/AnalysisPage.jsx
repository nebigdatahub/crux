import React, { Component } from "react"
import { Query, compose } from "react-apollo"
import { withRouter } from "react-router-dom"
import Navbar from "../components/Navbar"
import AnalysisCard from "../components/analysis/AnalysisCard"
import { Subtitle, Title } from "../components/elements"
import { analysisByUuid } from "../queries/analyses.gql"
import { fileByUuid } from "../queries/datasets.gql"
class AnalysisPage extends Component {
  render() {
    const { uuid } = this.props.match.params
    return (
      <React.Fragment>
        <Navbar />
        <Analysis uuid={uuid} />
      </React.Fragment>
    )
  }
}

const Analysis = ({ uuid }) => (
  <Query query={analysisByUuid} variables={{ uuid: uuid }}>
    {({ loading, error, data }) => {
      if (loading) return "loading"
      if (error) return "error"

      const { name, description, files } = data.analysisByUuid
      return (
        <React.Fragment>
          <section className="hero is-dark is-small">
            <div className="hero-body">
              <div className="container">
                <Title text={name} />
                <Subtitle text={description} />
              </div>
            </div>
          </section>
          <Notebook uuid={files[0].uuid} />
        </React.Fragment>
      )
    }}
  </Query>
)

const Notebook = ({ uuid }) => (
  <Query query={fileByUuid} variables={{ uuid: uuid }}>
    {({ loading, error, data }) => {
      if (loading) return "loading"
      if (error) return "error"

      const { body, resources } = data.file

      return (
        <section className="section container notebook">
          <iframe
            src={"data:text/html; charset=utf-8," + escape(body)}
            scrolling="no"
            frameBorder="0"
            height="100%"
            width="100%"
          />
        </section>
      )
    }}
  </Query>
)

const Analyses = ({ uuid }) => (
  <div className="section container">
    <Query query={analysisByUuid} variables={{ uuid: uuid }}>
      {({ loading, error, data }) => {
        if (loading) return "loading"
        if (error) return "error"

        const { analysisList } = data.analysisByUuid
        return (
          <React.Fragment>
            <div className="columns is-multiline is-mobile">
              {analysisList.map((analysis, idx) => (
                <AnalysisCard key={idx} {...analysis} />
              ))}
            </div>
          </React.Fragment>
        )
      }}
    </Query>
  </div>
)

export default compose(withRouter)(AnalysisPage)
