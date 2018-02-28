import React, { Component } from "react"
import { Link } from "react-router-dom";

import logo from '../files/logo.png'
class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to='/'><img src={logo} /> CRUX</Link>
          </div>
          <div className="navbar-menu is-active">
            <div className="navbar-end">
              <div className="navbar-item">
                <Link to="/signup" className="button is-primary">Sign Up</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Navbar