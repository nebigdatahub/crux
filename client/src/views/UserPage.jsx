import React, { Component } from "react"
import { Query } from "react-apollo"
import Navbar from "../components/Navbar"
import { userProfile } from "../queries/users.gql"

class UserPage extends Component {
  render() {
    const { username } = this.props.match.params
    return (
      <React.Fragment>
        <Navbar />
        <section className="section">
          <div className="container">
            <UserProfile username={username} />
          </div>
        </section>
      </React.Fragment>
    )
  }
}

const UserProfile = ({ username }) => (
  <Query query={userProfile} variables={{ username: username }}>
    {({ loading, error, data }) => {
      if (loading) return "loading"
      if (error) return "error"
      const { firstName, lastName, username, email } = data.userProfile
      return (
        <div className="box">
          <div className="media">
            <div className="media-left">
              <img src="https://via.placeholder.com/200x200" alt="" />
            </div>
            <div className="media-content">
              <h1 className="title">{`${firstName} ${lastName}`}</h1>
              <h2 className="subtitle">{email}</h2>
            </div>
          </div>
        </div>
      )
    }}
  </Query>
)

export default UserPage
