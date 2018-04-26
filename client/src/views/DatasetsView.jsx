import React, { Component } from "react"
import { Route, Link, withRouter } from "react-router-dom"
import { compose } from "react-apollo"

import QuickActions from "./layouts/QuickActions"

import DatasetNew from "../components/datasets/DatasetNew"
import DatasetsPublic from "../components/datasets/DatasetsPublic"
import MyDatasets from "../components/datasets/MyDatasets"
import Navbar from "../components/Navbar"

class DatasetsView extends Component {
  state = {
    activeTab: 0,
    tabs: [
      {
        text: "Public Datasets",
        url: "/",
      },
      {
        text: "My Datasets",
        url: "/personal",
      },
      {
        text: "Create New Dataset",
        url: "/new",
      },
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
            <h1 className="title">Datasets</h1>
          </div>
        </section>
        <main className="container">
          <section className="section">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={this._setActiveTab}
            />
            <Route
              path="/datasets/"
              exact={true}
              render={() => <DatasetsPublic />}
            />
            <Route path="/datasets/personal" render={() => <MyDatasets />} />
            <Route path="/datasets/new" render={() => <DatasetNew />} />
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
          <Link to={"/datasets" + tab.url}>{tab.text}</Link>
        </li>
      ))}
    </ul>
  </div>
)

export default compose(withRouter)(DatasetsView)
