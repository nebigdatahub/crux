import React, { Component } from "react"

import DatasetCard from "./DatasetCard";

class DataSets extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className="columns is-multiline is-mobile">
        <div className="column is-one-fifth-desktop is-half-mobile">
          <DatasetCard />
        </div>
        <div className="column is-one-fifth-desktop is-half-mobile">
          <DatasetCard />
        </div>
        <div className="column is-one-fifth-desktop is-half-mobile">
          <DatasetCard />
        </div>
        <div className="column is-one-fifth-desktop is-half-mobile">
          <DatasetCard />
        </div>
        <div className="column is-one-fifth-desktop is-half-mobile">
          <DatasetCard />
        </div>
        <div className="column is-one-fifth-desktop is-half-mobile">
          <DatasetCard />
        </div>
        <div className="column is-one-fifth-desktop is-half-mobile">
          <DatasetCard />
        </div>
        <div className="column is-one-fifth-desktop is-half-mobile">
          <DatasetCard />
        </div>
        <div className="column is-one-fifth-desktop is-half-mobile">
          <DatasetCard />
        </div>
        <div className="column is-one-fifth-desktop is-half-mobile">
          <DatasetCard />
        </div>
      </section>
    )
  }
}
export default DataSets