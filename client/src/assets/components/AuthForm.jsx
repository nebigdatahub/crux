import React, { Component } from "react";
import { Link } from "react-router-dom"

class AuthForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { login } = this.props;

    return (
      <form className="box is-narrow">
        <p className="has-text-weight-bold is-size-4 has-text-centered has-text-dark">{login ? "Login" : "Sign Up"}</p>
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
        {
          login ? "" :
            (
              <div className="field">
                <label htmlFor="name" className="label">Full Name</label>
                <div className="control">
                  <input type="text" className="input" id="name" placeholder="John Doe" />
                </div>
              </div>
            )
        }
        <div className="field">
          <div className="control">
            <input type="button" className="button is-primary" id={login ? "login" : "signup"} value={login ? "Log in" : "Sign Up"} />
            {
              login ?
                (
                  <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                  </p>
                )
                : (
                  <p>
                    Already have an account? <Link to="/login">Log in</Link>
                  </p>
                )
            }
          </div>
        </div>
        {login ? (<p>Log in with</p>) : (<p>Sign up with</p>)}
        <div className="buttons">
          <input type="button" className="button" value="Google" />
          <input type="button" className="button" value="Twitter" />
          <input type="button" className="button" value="Facebook" />
          <input type="button" className="button" value="Figshare" />
        </div>
      </form>
    )
  }
}

export default AuthForm