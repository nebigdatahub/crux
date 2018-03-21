import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"

class QuickActionsLayout extends Component {
  render() {
    return (
      <section>
        <h1 className="title">{this.props.title}</h1>
        <h2 className="subtitle">Quick Actions</h2>
        <div className="buttons">
          {this.props.links.map((link, idx) => (
            <Link
              to={this.props.match.path + link.url}
              key={idx}
              className="button is-info"
            >
              {link.text}
            </Link>
          ))}
        </div>
        <hr />
      </section>
    )
  }
}

export default withRouter(QuickActionsLayout)
