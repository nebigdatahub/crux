import React, { Component } from "react"

class LoginForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <form>
        <h4>Log in</h4>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="inputEmail4">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="inputPassword4">Password</label>
            <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Login</button>
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Login with Figshare</button>
          <button className="btn btn-primary">Login with Google</button>
          <button className="btn btn-primary">Login with Facebook</button>
        </div>
      </form>
    )
  }
}
export default LoginForm