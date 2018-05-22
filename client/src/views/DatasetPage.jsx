import React, { Component } from "react"
import { Query, compose } from "react-apollo"
import { Link, Route, withRouter } from "react-router-dom"
import Navbar from "../components/Navbar"
import AnalysisCard from "../components/analysis/AnalysisCard"
import { Subtitle, Title } from "../components/elements"
import { datasetBySlug } from "../queries/datasets.gql"

class DatasetPage extends Component {
  state = {
    activeTab: 0,
    tabs: [
      {
        text: "Data",
        url: "/",
      },
      {
        text: "Analyses",
        url: "/analyses",
      },
    ],
  }

  _setActiveTab = idx => this.setState({ activeTab: idx })

  render() {
    const { username, slug } = this.props.match.params
    const finalSlug = `${username}-__-${slug}`
    return (
      <React.Fragment>
        <Navbar />
        <DatasetHeader slug={finalSlug} />
        <Tabs
          tabs={this.state.tabs}
          setActiveTab={this._setActiveTab}
          slug={finalSlug}
        />
        <Route
          exact
          path={`/${username}/d/${slug}/analyses`}
          render={({ match }) => <Analyses slug={finalSlug} />}
        />
      </React.Fragment>
    )
  }
}

const Tabs = ({ tabs, activeTab, setActiveTab, slug }) => (
  <div className="container">
    <div className="tabs">
      <ul>
        {tabs.map((tab, idx) => (
          <li
            key={idx}
            className={idx == activeTab ? "is-active" : ""}
            onClick={() => setActiveTab(idx)}
          >
            <Link
              to={`/${slug.split("-__-")[0]}/d/${slug.split("-__-")[1]}${
                tab.url
              }`}
            >
              {tab.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const DatasetHeader = ({ slug }) => (
  <section className="hero is-dark is-small">
    <div className="hero-body">
      <div className="container">
        <Query query={datasetBySlug} variables={{ slug: slug }}>
          {({ loading, error, data }) => {
            if (loading) return "loading"
            if (error) return "error"

            const { name, description, analysis } = data.datasetBySlug
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

const Analyses = ({ slug }) => (
  <div className="section container">
    <Query query={datasetBySlug} variables={{ slug: slug }}>
      {({ loading, error, data }) => {
        if (loading) return "loading"
        if (error) return "error"

        const { analyses } = data.datasetBySlug
        console.log(analyses)
        return (
          <React.Fragment>
            <div className="columns is-multiline is-mobile">
              {analyses.map((analysis, idx) => (
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
