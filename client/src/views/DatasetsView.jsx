import React, { Component } from "react"
import { Link, Route, withRouter } from "react-router-dom"
import Navbar from "../components/Navbar"
import DatasetNew from "../components/datasets/DatasetNew"
import DatasetsPublic from "../components/datasets/DatasetsPublic"
import MyDatasets from "../components/datasets/MyDatasets"

class DatasetsView extends Component {
  state = {
    activeTab: 0,
  }

  _setActiveTab = idx => {
    this.setState({
      activeTab: idx,
    })
  }

  render() {
    const username = localStorage.getItem("username")
    const { activeTab } = this.state
    return (
      <React.Fragment>
        <Navbar />
        <section className="hero is-dark">
          <div className="container hero-body">
            <h1 className="title">Datasets</h1>
          </div>
        </section>
        <section className="section container">
          <Tabs
            activeTab={activeTab}
            setActiveTab={this._setActiveTab}
            username={username}
          />
          <Route exact path="/datasets" render={() => <DatasetsPublic />} />
          <Route
            exact
            path={`${username}/datasets/`}
            render={() => <MyDatasets />}
          />
          <Route path="/datasets/create" render={() => <DatasetNew />} />
        </section>
      </React.Fragment>
    )
  }
}

const Tabs = ({ activeTab, setActiveTab, username }) => {
  const tabs = [
    {
      text: "All",
      url: "/datasets",
    },
    {
      text: "My Datasets",
      url: `/${username}/datasets/`,
    },
    {
      text: "New Dataset",
      url: "/datasets/create",
    },
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

export default withRouter(DatasetsView)
