import React, { Component } from "react"
import { Link } from "react-router-dom"

import Navbar from "../components/Navbar"
import { LoginForm, SignupForm, LogoutForm } from "../components/auth/AuthForm"

class AuthView extends Component {
  render() {
    const { url } = this.props.match
    return (
      <React.Fragment>
        <Navbar />
        <section className="hero is-fullheight level" id="signup-form">
          <div className="level-item">
            {url == "/login" ? (
              <LoginForm />
            ) : url == "/signup" ? (
              <SignupForm />
            ) : (
              <LogoutForm />
            )}
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default AuthView
