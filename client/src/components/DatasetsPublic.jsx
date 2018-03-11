import React, { Component } from "react"

import DatasetCard from "./DatasetCard"

class DatasetsPublic extends Component {
  datasets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  render() {
    return (
      <section className="columns is-multiline is-mobile">
        {this.datasets.map((dataset, idx) => (
          <div key={idx} className="column is-3-desktop is-half-mobile">
            <DatasetCard />
          </div>
        ))}
      </section>
    )
  }
}
export default DatasetsPublic
