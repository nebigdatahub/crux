import React, { Component } from "react"
import { Link } from "react-router-dom"
import { graphql, compose } from "react-apollo"
import { config } from "../config"
import { currentUserQuery } from "../queries/users.gql"

import logo from "../assets/files/logo.png"

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { loading, error, currentUser } = this.props.currentUserQuery

    return (
      <header>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img src={logo} /> CRUX
            </Link>
          </div>
          <div className="navbar-menu is-active">
            <div className="navbar-end">
              <div className="navbar-item">
                <Link to="/dashboard">Dashboard</Link>
              </div>
              <div className="navbar-item">
                <Link to="/datasets/public">Datasets</Link>
              </div>
              <div className="navbar-item">
                {currentUser ? (
                  <React.Fragment>
                    Welcome, {currentUser.email}
                    <Link to="/logout"> | Logout</Link>
                  </React.Fragment>
                ) : (
                  <Link to="/login" className="is-primary">
                    Log In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default compose(
  graphql(currentUserQuery, {
    name: "currentUserQuery",
    options: {
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    },
  })
)(Navbar)
