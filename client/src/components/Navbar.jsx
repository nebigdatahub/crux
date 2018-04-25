import React, { Component } from "react"
import { Link } from "react-router-dom"
import { graphql, compose, Query } from "react-apollo"
import { config } from "../config"
import gql from "graphql-tag"

import logo from "../assets/files/logo.png"

class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="container">
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
                  <Link to="/datasets">Datasets</Link>
                </div>
                <div className="navbar-item">
                  <Link to="/analysis">Analysis</Link>
                </div>
                <div className="navbar-item">
                  <CurrentUser />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </React.Fragment>
    )
  }
}

const CurrentUser = () => {
  return (
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
        if (loading) return "loading"
        if (error)
          return (
            <Link to="/login" className="is-primary">
              Log In
            </Link>
          )
        const { firstName, lastName, username, email } = data.currentUser
        const displayName =
          "" + firstName
            ? firstName + " " + lastName
            : username
              ? username
              : email
        return (
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              <span className="icon">
                <i className="fa fa-user-circle" />
              </span>
            </a>
            <div className="navbar-dropdown is-right">
              <div className="navbar-item">
                <Link to={"/" + username}>{displayName}</Link>
              </div>
              <hr className="navbar-divider" />
              <div className="navbar-item">
                <Link to="/logout">Logout</Link>
              </div>
            </div>
            {/* Welcome, {displayName}
            <Link to="/logout"> | Logout</Link> */}
          </div>
        )
      }}
    </Query>
  )
}

const CURRENT_USER = gql`
  query currentUserQuery {
    currentUser {
      email
      firstName
      lastName
      username
    }
  }
`

export default Navbar
