import React, { Component } from "react"
import { Query } from "react-apollo"
import { Link } from "react-router-dom"
import logo from "../assets/files/logo.png"
import { TOKEN_NAME } from "../config"
import { currentUser } from "../queries/users.gql"

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
                  <Link to="/analyses">Analyses</Link>
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
  const token = localStorage.getItem(TOKEN_NAME)
  if (token === null)
    return (
      <Link to="/login" className="is-primary">
        Log In
      </Link>
    )
  return (
    <Query query={currentUser}>
      {({ loading, error, data }) => {
        if (loading) return ""

        const { firstName, lastName, username, email } = data.currentUser
        const displayName = `${firstName} ${lastName}` || `${username}`
        return (
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              <span className="icon">
                <i className="fa fa-user-circle" />
              </span>
            </a>
            <div className="navbar-dropdown is-right">
              <div className="navbar-item">
                <Link to={`/${username}/profile`}>{displayName}</Link>
              </div>
              <hr className="navbar-divider" />
              <div className="navbar-item">
                <Link to="/logout">Logout</Link>
              </div>
            </div>
          </div>
        )
      }}
    </Query>
  )
}

export default Navbar
