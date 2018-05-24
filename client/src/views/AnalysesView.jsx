import React, { Component } from "react"
import { compose } from "react-apollo"
import { Link, Route, withRouter } from "react-router-dom"
import Navbar from "../components/Navbar"
import AnalysesPublic from "../components/analysis/AnalysesPublic"
import AnalysisNew from "../components/analysis/AnalysisNew"
import MyAnalyses from "../components/analysis/MyAnalyses"

class AnalysesView extends Component {
  state = {
    activeTab: 0,
  }

  _setActiveTab = idx => {
    this.setState({
      activeTab: idx,
    })
  }
  render() {
    const username = "sabnatarajan"
    const { activeTab } = this.state
    return (
      <React.Fragment>
        <Navbar />
        <AnalysesHeader />
        <section className="container section">
          <Tabs
            activeTab={activeTab}
            setActiveTab={this._setActiveTab}
            username={username}
          />
          <Route exact path="/analyses" render={() => <AnalysesPublic />} />
          <Route
            exact
            path={`/${username}/analyses`}
            render={() => <MyAnalyses />}
          />
          <Route path="/analyses/create" render={() => <AnalysisNew />} />
        </section>
      </React.Fragment>
    )
  }
}

const AnalysesHeader = () => (
  <section className="hero is-dark">
    <div className="container hero-body">
      <h1 className="title">Analyses</h1>
    </div>
  </section>
)

const Tabs = ({ username, activeTab, setActiveTab }) => {
  const tabs = [
    { text: "All", url: "/analyses" },
    { text: "My analyses", url: `/${username}/analyses` },
    { text: "New Analysis", url: "/analyses/create" },
  ]
  return (
    <div className="tabs is-toggle is-fullwidth">
      <ul>
        {tabs.map(({ url, text }, idx) => (
          <li
            key={idx}
            className={idx == activeTab ? "is-active" : ""}
            onClick={() => setActiveTab(idx)}
          >
            <Link to={url}>{text}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default compose(withRouter)(AnalysesView)
