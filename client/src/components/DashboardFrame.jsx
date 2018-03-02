import React, { Component } from "react"
import { Link } from "react-router-dom";

class DashboardFrame extends Component {
  render() {
    return (
      <section className="section">
        <h1 className="title">Quick Actions</h1>
        <div className="buttons">
          <Link to={this.props.match.path + "/project/new"} className="button is-info">Create new project</Link>
        </div>
      </section>
    )
  }
}

export default DashboardFrame