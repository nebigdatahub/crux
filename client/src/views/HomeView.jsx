import React, { Component } from "react";

import Navbar from "../components/Navbar"
import HomeViewContent from "../components/HomeViewContent"
import DataSets from "../components/DataSets"

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
            <h1 className="content has-text-weight-bold is-size-4">Browse popular datasets</h1>
            <DataSets />
          </div>
        </section>
      </React.Fragment >
    )
  }
}

export default HomeView