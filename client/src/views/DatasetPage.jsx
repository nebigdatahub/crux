import React, { Component } from "react"
import { Query, compose } from "react-apollo"
import { Link, Route, withRouter } from "react-router-dom"
import Navbar from "../components/Navbar"
import AnalysisCard from "../components/analysis/AnalysisCard"
import { Subtitle, Title } from "../components/elements"
import { dataset } from "../queries/datasets.gql"

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
    return (
      <React.Fragment>
        <Navbar />
        <DatasetHeader username={username} slug={slug} />
        <Tabs
          tabs={this.state.tabs}
          setActiveTab={this._setActiveTab}
          username={username}
          slug={slug}
        />
        <Route
          exact
          path={`/${username}/d/${slug}/analyses`}
          render={() => <Analyses username={username} slug={slug} />}
        />
      </React.Fragment>
    )
  }
}

const Tabs = ({ tabs, activeTab, setActiveTab, username, slug }) => (
  <div className="container">
    <div className="tabs">
      <ul>
        {tabs.map(({ url, text }, idx) => (
          <li
            key={idx}
            className={idx == activeTab ? "is-active" : ""}
            onClick={() => setActiveTab(idx)}
          >
            <Link to={`/${username}/d/${slug}${url}`}>{text}</Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const DatasetHeader = ({ username, slug }) => (
  <section className="hero is-dark is-small">
    <div className="hero-body">
      <div className="container">
        <Query query={dataset} variables={{ username: username, slug: slug }}>
          {({ loading, error, data }) => {
            if (loading) return "loading"
            if (error) return "error"

            const { name, readme } = data.dataset
            return (
              <React.Fragment>
                <Title text={name} />
                <Subtitle text={readme} />
                <span className="tag">Dataset</span>
              </React.Fragment>
            )
          }}
        </Query>
      </div>
    </div>
  </section>
)

const Analyses = ({ username, slug }) => (
  <div className="section container">
    <Query query={dataset} variables={{ username: username, slug: slug }}>
      {({ loading, error, data }) => {
        if (loading) return "loading"
        if (error) return "error"

        console.log(data)
        const { analyses } = data.dataset
        console.log(analyses)
        return (
          <React.Fragment>
            <div className="columns is-multiline is-mobile">
              {analyses.map((analysis, idx) => (
                <div className="column is-4-desktop">
                  <AnalysisCard key={idx} {...analysis} />
                </div>
              ))}
            </div>
          </React.Fragment>
        )
      }}
    </Query>
  </div>
)

export default compose(withRouter)(DatasetPage)
