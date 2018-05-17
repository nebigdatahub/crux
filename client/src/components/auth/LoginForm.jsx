import React, { Component } from "react"
import { compose, graphql, withApollo } from "react-apollo"
import { Link, withRouter } from "react-router-dom"
import { TOKEN_NAME } from "../../config"
import { loginUser } from "../../queries/users.gql"

class LoginForm extends Component {
  state = {
    displayLogin: true,
    email: "",
    password: "",
    error: false,
    errorMessage: "",
  }

  _handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    })
  }

  _handleFormSubmit = async e => {
    e.preventDefault()
    const { email, password } = this.state
    const result = await this.props
      .loginUser({
        variables: {
          email: email,
          password: password,
        },
      })
      .then(({ data }) => {
        localStorage.setItem(TOKEN_NAME, data.loginUser.token)
        this.props.history.push("/dashboard")
      })
      .catch(error => {
        console.log(error)
        this.setState({ error: true, errorMessage: "Invalid credentials" })
      })
  }

  render() {
    return (
      <form
        className="box is-narrow"
        onSubmit={this._handleFormSubmit}
        name="formlogin"
      >
        <p className="has-text-weight-bold is-size-4 has-text-centered has-text-dark">
          Login
        </p>
        <div className="field">
          <label htmlFor="email" className="label">
            E-Mail
          </label>
          <div className="control">
            <input
              type="email"
              value={this.state.email}
              name="email"
              onChange={this._handleInput}
              className="input"
              placeholder="johndoe@gmail.com"
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="control">
            <input
              type="password"
              value={this.state.password}
              name="password"
              onChange={this._handleInput}
              className="input"
              placeholder="Password"
              required
            />
          </div>
        </div>
        {this.state.error ? <div>{this.state.errorMessage}</div> : ""}
        <div className="field">
          <div className="control">
            <input
              type="submit"
              className="button is-primary"
              id="login"
              value="Log in"
            />
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
        <p>Log in with</p>
        <div className="buttons">
          <a href="https://figshare.com/account/applications/authorize?client_id=607c859796024acc29dfe97a69ac2609a078de64&response_type=token&redirect_url=https://localhost:3000/oauth/figshare">
            <input type="button" className="button" value="Figshare" />
          </a>
        </div>
      </form>
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  graphql(loginUser, { name: "loginUser" })
)(LoginForm)
