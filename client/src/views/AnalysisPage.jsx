import React, { Component } from "react"
import { Query, compose } from "react-apollo"
import { Link, Route, withRouter } from "react-router-dom"
import Navbar from "../components/Navbar"
import Notebook from "../components/analysis/Notebook"
import { Subtitle, Title } from "../components/elements"
import { analysis } from "../queries/analyses.gql"
class AnalysisPage extends Component {
  state = {
    activeTab: 0,
    tabs: [
      {
        text: "Notebook",
        url: "/",
      },
      {
        text: "Data",
        url: "/dataset",
      },
    ],
  }

  _setActiveTab = idx => this.setState({ activeTab: idx })

  render() {
    const { username, slug } = this.props.match.params
    return (
      <React.Fragment>
        <Navbar />
        <AnalysisProvider username={username} slug={slug}>
          <AnalysisHeader />
          <Tabs
            tabs={this.state.tabs}
            setActiveTab={this._setActiveTab}
            username={username}
            slug={slug}
          />
          {/* <Route
            exact
            path={`/${username}/a/${slug}/dataset`}
            render={({ match }) => <Analyses slug={finalSlug} />}
          /> */}
        </AnalysisProvider>
        <Route
          exact
          path={`/${username}/a/${slug}/`}
          render={() => <Notebook username={username} slug={slug} />}
        />
      </React.Fragment>
    )
  }
}

const AnalysisProvider = ({ username, slug, children }) => (
  <Query query={analysis} variables={{ username: username, slug: slug }}>
    {({ loading, error, data }) => {
      if (loading) return "loading"
      if (error) return "error"

      const { analysis } = data
      return React.Children.map(children, child =>
        React.cloneElement(child, { analysis: analysis })
      )
    }}
  </Query>
)

const AnalysisHeader = ({ analysis: { name, readme } }) => (
  <React.Fragment>
    <section className="hero is-dark is-small">
      <div className="hero-body">
        <div className="container">
          <Title text={name} />
          <Subtitle text={readme} />
          <span className="tag">Analysis</span>
        </div>
      </div>
    </section>
  </React.Fragment>
)

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
            <Link to={`/${username}/a/${slug}${url}`}>{text}</Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default compose(withRouter)(AnalysisPage)
