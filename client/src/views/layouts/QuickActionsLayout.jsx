import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"

class QuickActionsLayout extends Component {
  render() {
    const { title, links, match } = this.props
    return (
      <section>
        <h1 className="title">{title}</h1>
        <h2 className="subtitle">Quick Actions</h2>
        <div className="buttons">
          {links.map((link, idx) => (
            <Link
              to={match.path + link.url}
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
