import React, { Component } from "react"
import Navbar from "../components/Navbar"
import LoginForm from "../components/auth/LoginForm"
import LogoutForm from "../components/auth/LogoutForm"
import SignupForm from "../components/auth/SignupForm"

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
