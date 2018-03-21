import React, { Component } from "react"

import Navbar from "../components/Navbar"
import HomeViewContent from "../components/HomeViewContent"
import DatasetsPublic from "../components/datasets/DatasetsPublic"

class HomeView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <HomeViewContent />
        <section className="section">
          <div className="container">
            <DatasetsPublic />
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default HomeView
