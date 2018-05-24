import React from "react"
import { Query } from "react-apollo"
import { usersDatasets } from "../../queries/datasets.gql"

const DatasetsProvider = ({ username, children }) => (
  <Query query={usersDatasets} variables={{ username: username }}>
    {({ loading, error, data }) => {
      if (loading) return "loading"
      if (error) return "error"

      const { usersDatasets } = data
      return React.Children.map(children, child =>
        React.cloneElement(child, { datasets: usersDatasets })
      )
    }}
  </Query>
)

export default DatasetsProvider

// const key = query.definitions[0].name.value
// const datasets = data[key]
