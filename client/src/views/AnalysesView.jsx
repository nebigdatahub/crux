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
    tabs: [
      { text: "Public", url: "/public" },
      { text: "My analyses", url: "/" },
      { text: "New Analysis", url: "/create" },
    ],
  }

  _setActiveTab = idx => {
    this.setState({
      activeTab: idx,
    })
  }
  render() {
    const { tabs, activeTab } = this.state
    return (
      <React.Fragment>
        <Navbar />
        <section className="hero is-dark">
          <div className="container hero-body">
            <h1 className="title">Analysis</h1>
          </div>
        </section>
        <main className="container">
          <section className="section">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={this._setActiveTab}
            />
            <Routes />
          </section>
        </main>
      </React.Fragment>
    )
  }
}

const Tabs = ({ tabs, activeTab, setActiveTab }) => (
  <div className="tabs is-toggle is-fullwidth">
    <ul>
      {tabs.map((tab, idx) => (
        <li
          key={idx}
          className={idx == activeTab ? "is-active" : ""}
          onClick={() => setActiveTab(idx)}
        >
          <Link to={"/analyses" + tab.url}>{tab.text}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const Routes = () => (
  <React.Fragment>
    <Route
      path="/analyses/public"
      exact={true}
      render={() => <AnalysesPublic />}
    />
    <Route exact path="/analyses" render={() => <MyAnalyses />} />
    <Route path="/analyses/create" render={() => <AnalysisNew />} />
  </React.Fragment>
)

export default compose(withRouter)(AnalysesView)
