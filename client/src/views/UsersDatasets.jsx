import React from "react"
import { withRouter } from "react-router-dom"
import Navbar from "../components/Navbar"
import Datasets from "../components/datasets/Datasets"
import DatasetsProvider from "../components/datasets/DatasetsProvider"
import { Title } from "../components/elements"

const UsersDatasets = props => {
  const { username } = props.match.params
  return (
    <React.Fragment>
      <Navbar />
      <DatasetHeader username={username} />
      <section className="section container">
        <DatasetsProvider username={username}>
          <Datasets />
        </DatasetsProvider>
      </section>
    </React.Fragment>
  )
}

const DatasetHeader = ({ username }) => (
  <section className="hero is-dark is-small">
    <div className="hero-body">
      <div className="container">
        <Title text={`Datasets: @${username}`} />
      </div>
    </div>
  </section>
)

export default withRouter(UsersDatasets)
