import React from "react"
import { Query } from "react-apollo"
import { analysis } from "../../queries/analyses.gql"

const Notebook = ({ username, slug }) => (
  <Query query={analysis} variables={{ username: username, slug: slug }}>
    {({ loading, error, data }) => {
      if (loading) return "loading"
      if (error) return "error"

      const {
        analysis: { files },
      } = data

      const { content } = files && files[0]
      return (
        <section className="section container notebook">
          <iframe
            src={"data:text/html; charset=utf-8," + escape(content)}
            frameBorder="0"
            height="100%"
            width="100%"
          />
        </section>
      )
    }}
  </Query>
)

export default Notebook
