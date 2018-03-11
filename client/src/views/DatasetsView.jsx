import React, { Component } from "react"
import { Route, Link } from "react-router-dom"
import DatasetNew from "../components/DatasetNew"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Layout from "./Layout"
import { compose } from "react-apollo"
import { withRouter } from "react-router-dom"
import DatasetsPublic from "../components/DatasetsPublic"

class DatasetsView extends Component {
  render() {
    return (
      <Layout>
        <Navbar />
        <Sidebar />
        <DatasetsQuickActions {...this.props} />
        <hr />
        <Route
          path={this.props.match.path + "/new"}
          render={() => <DatasetNew {...this.props} />}
        />
        <Route
          path={this.props.match.path + "/public"}
          render={() => (
            <React.Fragment>
              <h1 className="title">Browse popular datasets</h1>
              <DatasetsPublic />
            </React.Fragment>
          )}
        />
      </Layout>
    )
  }
}

class DatasetsQuickActions extends Component {
  render() {
    return (
      <section>
        <h1 className="title">Datasets</h1>
        <h2 className="subtitle">Quick Actions</h2>
        <div className="buttons">
          <Link to={this.props.match.path + "/new"} className="button is-info">
            Create new dataset
          </Link>
        </div>
      </section>
    )
  }
}

export default compose(withRouter)(DatasetsView)
