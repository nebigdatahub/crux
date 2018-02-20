import React, { Component } from "react"
import { Link } from "react-router-dom"

class SignupView extends Component {
  render() {
    return (
      <section className="hero is-fullheight level" id="signup-form">
        <div className="level-item">
          <form className="box is-narrow">
            <p className="has-text-weight-bold is-size-4 has-text-centered has-text-dark">Sign Up</p>
            <div className="field">
              <label htmlFor="email" className="label">E-Mail</label>
              <div className="control">
                <input type="email" className="input" id="email" placeholder="johndoe@gmail.com" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="password" className="label">Password</label>
              <div className="control">
                <input type="password" className="input" id="password" placeholder="Password" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="name" className="label">Full Name</label>
              <div className="control">
                <input type="text" className="input" id="name" placeholder="John Doe" />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input type="button" className="button is-primary" id="signup" value="Sign Up" />
                <p>
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </div>
            </div>
            <p>Sign up with</p>
            <div className="buttons">
              <input type="button" className="button" value="Google" />
              <input type="button" className="button" value="Twitter" />
              <input type="button" className="button" value="Facebook" />
              <input type="button" className="button" value="Figshare" />
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default SignupView