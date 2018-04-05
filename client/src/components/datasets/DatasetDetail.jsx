import React, { Component } from "react"
import {
  Query,
  ApolloConsumer,
  compose,
  graphql,
  withApollo,
} from "react-apollo"
import { withRouter } from "react-router-dom"
import gql from "graphql-tag"

class DatasetDetail extends Component {
  render() {
    return (
      <Query
        query={datasetQuery}
        variables={{ uuid: this.props.match.params.uuid }}
      >
        {({ loading, error, data }) => {
          if (loading) return "loading"
          if (error) return "error"
          const { name, description } = data.datasetByUuid
          return (
            <section className="columns">
              <div className="column is-half">
                <h1 className="title">{name}</h1>
                <h2 className="subtitle">{description}</h2>
              </div>
            </section>
          )
        }}
      </Query>
    )
  }
}

// <section className="columns">
//             <div className="column is-half">
//               <h1 className="title">{dataset.name}</h1>
//             </div>
//           </section>

const datasetQuery = gql`
  query datasetQuery($uuid: String!) {
    datasetByUuid(uuid: $uuid) {
      uuid
      name
      description
    }
  }
`

export default compose(withRouter)(DatasetDetail)
