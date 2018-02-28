import React, { Component } from "react"

class DashboardFrame extends Component {
  render() {
    return (
      <section className="section">
        <h1 className="title">Quick Actions</h1>
        <div className="buttons">
          <span className="button is-info">Create new project</span>
        </div>
      </section>
    )
  }
}

export default DashboardFrame