import React from "react"
import { withRouter } from "react-router-dom"
import Navbar from "../components/Navbar"
import Analyses from "../components/analysis/Analyses"
import AnalysesProvider from "../components/analysis/AnalysesProvider"
import { Title } from "../components/elements"

const UsersAnalyses = props => {
  const { username } = props.match.params
  return (
    <React.Fragment>
      <Navbar />
      <AnalysesHeader username={username} />
      <section className="section container">
        <AnalysesProvider username={username}>
          <Analyses />
        </AnalysesProvider>
      </section>
    </React.Fragment>
  )
}

const AnalysesHeader = ({ username }) => (
  <section className="hero is-dark is-small">
    <div className="hero-body">
      <div className="container">
        <Title text={`Analyses: @${username}`} />
      </div>
    </div>
  </section>
)

export default withRouter(UsersAnalyses)
