import React, { Component } from "react"
import { Route } from "react-router-dom"
import gql from "graphql-tag"
import { graphql, Query } from "react-apollo"

import DatasetCard from "../datasets/DatasetCard"
import DatasetDetail from "../datasets/DatasetDetail"

class UserTasks extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="title">My Tasks</h1>
        <section className="columns is-multiline is-mobile">
          <Query query={USER_TASKS}>
            {({ loading, error, data }) => {
              if (loading) return ""
              if (error) return ""
              const { userTasks } = data
              return (
                userTasks &&
                userTasks.map((dataset, idx) => (
                  <div key={idx} className="column is-3-desktop">
                    <DatasetCard {...dataset} />
                  </div>
                ))
              )
            }}
          </Query>
        </section>
      </React.Fragment>
    )
  }
}

const USER_TASKS = gql`
  query userDatasetsQuery {
    userTasks {
      name
      description
      dataset {
        name
        uuid
      }
    }
  }
`

export default UserTasks
