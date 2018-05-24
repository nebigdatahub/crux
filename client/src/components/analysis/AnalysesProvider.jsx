import React from "react"
import { Query } from "react-apollo"
import { usersAnalyses } from "../../queries/analyses.gql"

const UsersAnalyses = ({ username, children }) => (
  <Query query={usersAnalyses} variables={{ username: username }}>
    {({ loading, error, data }) => {
      if (loading) return "loading"
      if (error) return "error"

      const { usersAnalyses } = data
      return React.Children.map(children, child =>
        React.cloneElement(child, { analyses: usersAnalyses })
      )
    }}
  </Query>
)

export default UsersAnalyses

// const key = query.definitions[0].name.value
// const analyses = data[key]
