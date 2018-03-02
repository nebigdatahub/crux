import React, { Component } from "react"
import { Link } from "react-router-dom"

import Navbar from "../components/Navbar"
import AuthForm from "../components/AuthForm"

class AuthView extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <section className="hero is-fullheight level" id="signup-form">
          <div className="level-item">
            <AuthForm login={this.props.match.url == "/login"} />
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default AuthView