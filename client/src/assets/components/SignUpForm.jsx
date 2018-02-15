import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class SignUpForm extends Component {
  render() {
    return (
      <form>
        <h4>Sign up</h4>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input required type="email" className="form-control" id="inputEmail4" placeholder="Email" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input required type="password" className="form-control" id="inputPassword4" placeholder="Password" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="firstName">First Name</label>
            <input required type="text" className="form-control" id="firstName" placeholder="John" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="lastName">Last Name</label>
            <input required type="text" className="form-control" id="lastName" placeholder="Doe" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="organization">Organization</label>
          <input type="text" className="form-control" id="organization" />
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
        <p>Already a member? <Link to='/login'>Login</Link> </p>
      </form >
    )
  }
}

export default SignUpForm;