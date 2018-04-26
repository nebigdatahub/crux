import React, { Component } from "react"
import {
  Query,
  ApolloConsumer,
  compose,
  graphql,
  withApollo,
} from "react-apollo"
import { withRouter, Link, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Title, Subtitle } from "../components/elements"
import { datasetByUuid } from "../queries/datasets.gql"
import AnalysisCard from "../components/analysis/AnalysisCard"

class DatasetPage extends Component {
  state = {
    activeTab: 0,
    tabs: [{ text: "Analyses", url: "/analyses" }, { text: "Data", url: "/" }],
  }

  _setActiveTab = idx => this.setState({ activeTab: idx })

  render() {
    const { uuid } = this.props.match.params
    return (
      <React.Fragment>
        <Navbar />
        <Dataset uuid={uuid} />
        <Tabs
          tabs={this.state.tabs}
          setActiveTab={this._setActiveTab}
          uuid={uuid}
        />
        <Route
          exact
          path={`/dataset/${uuid}/analyses`}
          render={({ match }) => <Analyses uuid={uuid} />}
        />
      </React.Fragment>
    )
  }
}

const Tabs = ({ tabs, activeTab, setActiveTab, uuid }) => (
  <div className="container">
    <div className="tabs">
      <ul>
        {tabs.map((tab, idx) => (
          <li
            key={idx}
            className={idx == activeTab ? "is-active" : ""}
            onClick={() => setActiveTab(idx)}
          >
            <Link to={`/dataset/${uuid}${tab.url}`}>{tab.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const Dataset = ({ uuid }) => (
  <section className="hero is-dark is-small">
    <div className="hero-body">
      <div className="container">
        <Query query={datasetByUuid} variables={{ uuid: uuid }}>
          {({ loading, error, data }) => {
            if (loading) return "loading"
            if (error) return "error"

            const { name, description, analysis } = data.datasetByUuid
            console.log(uuid)
            return (
              <React.Fragment>
                <Title text={name} />
                <Subtitle text={description} />
              </React.Fragment>
            )
          }}
        </Query>
      </div>
    </div>
  </section>
)

const Analyses = ({ uuid }) => (
  <div className="section container">
    <Query query={datasetByUuid} variables={{ uuid: uuid }}>
      {({ loading, error, data }) => {
        if (loading) return "loading"
        if (error) return "error"

        const { analysisList } = data.datasetByUuid
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

export default compose(withRouter)(DatasetPage)
