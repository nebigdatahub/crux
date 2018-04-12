import React, { Component } from "react"
import { Link } from "react-router-dom"
import { graphql, compose, Query } from "react-apollo"
import { config } from "../config"
import gql from "graphql-tag"

import logo from "../assets/files/logo.png"

class Navbar extends Component {
  render() {
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
                <CurrentUser />
              </div>
            </div>
          </div>
        </nav>
      </header>
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
            : username ? username : email
        return (
          <React.Fragment>
            Welcome, {displayName}
            <Link to="/logout"> | Logout</Link>
          </React.Fragment>
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
