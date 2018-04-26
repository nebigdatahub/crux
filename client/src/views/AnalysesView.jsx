import React, { Component } from "react"
import { Route, withRouter, Link } from "react-router-dom"
import { compose } from "react-apollo"

import QuickActions from "./layouts/QuickActions"
import Navbar from "../components/Navbar"
import AnalysesPublic from "../components/analysis/AnalysesPublic"
import MyAnalyses from "../components/analysis/MyAnalyses"

class AnalysesView extends Component {
  state = {
    activeTab: 0,
    tabs: [
      { text: "Start new analysis", url: "/" },
      { text: "My analyses", url: "/personal" },
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
  <div className="tabs">
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
    <Route path="/analyses/" exact={true} render={() => <AnalysesPublic />} />
    <Route path="/analyses/personal" render={() => <MyAnalyses />} />
    {/* <Route path="/analyses/new" render={() => <DatasetNew />} /> */}
  </React.Fragment>
)

export default compose(withRouter)(AnalysesView)
