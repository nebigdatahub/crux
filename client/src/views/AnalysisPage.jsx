import React, { Component } from "react"
import { Query, compose } from "react-apollo"
import { Link, Route, withRouter } from "react-router-dom"
import Navbar from "../components/Navbar"
import AnalysisCard from "../components/analysis/AnalysisCard"
import { Subtitle, Title } from "../components/elements"
import { analysisBySlug } from "../queries/analyses.gql"
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
    const finalSlug = `${username}-__-${slug}`
    return (
      <React.Fragment>
        <Navbar />
        <AnalysisProvider slug={finalSlug}>
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
          render={() => <Notebook slug={finalSlug} />}
        />
      </React.Fragment>
    )
  }
}

const AnalysisProvider = ({ slug, children }) => (
  <Query query={analysisBySlug} variables={{ slug: slug }}>
    {({ loading, error, data }) => {
      if (loading) return "loading"
      if (error) return "error"

      const { analysisBySlug } = data
      return React.Children.map(children, child =>
        React.cloneElement(child, { analysis: analysisBySlug })
      )
    }}
  </Query>
)

const AnalysisHeader = ({ analysis: { name, description } }) => (
  <React.Fragment>
    <section className="hero is-dark is-small">
      <div className="hero-body">
        <div className="container">
          <Title text={name} />
          <Subtitle text={description} />
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

const Notebook = ({ slug }) => (
  <Query query={analysisBySlug} variables={{ slug: slug }}>
    {({ loading, error, data }) => {
      if (loading) return "loading"
      if (error) return "error"

      const {
        analysisBySlug: { files },
      } = data

      const { content } = files && files[0]
      return (
        <section className="section container notebook">
          <iframe
            src={"data:text/html; charset=utf-8," + escape(content)}
            // scrolling="no"
            frameBorder="0"
            height="100%"
            width="100%"
          />
        </section>
      )
    }}
  </Query>
)

const Analyses = ({ slug }) => (
  <div className="section container">
    <Query query={analysisBySlug} variables={{ slug: slug }}>
      {({ loading, error, data }) => {
        if (loading) return "loading"
        if (error) return "error"

        const { analyses } = data.analysisBySlug
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

export default compose(withRouter)(AnalysisPage)
