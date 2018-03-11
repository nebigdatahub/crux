import React, { Component } from "react"
import { Route, Link } from "react-router-dom"
import DatasetNew from "../components/DatasetNew"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

class TasksView extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="columns">
          <nav className="column menu is-one-fifth">
            <Sidebar {...this.props} />
          </nav>
          <section className="column is-four-fifth">
            <h1 className="title">Projects</h1>
            <div className="buttons">
              <Link
                to={this.props.match.path + "/new"}
                className="button is-info"
              >
                Create new project
              </Link>
              <Link
                to={this.props.match.path + "/list"}
                className="button is-info"
              >
                List projects
              </Link>
            </div>
            <Route
              path={this.props.match.path + "/new"}
              component={DatasetNew}
            />
          </section>
        </main>
      </React.Fragment>
    )
  }
}

export default TasksView
