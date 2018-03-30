import React, { Component } from "react"

import DatasetCard from "./DatasetCard"

class DatasetsPublic extends Component {
  datasets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  render() {
    return (
      <React.Fragment>
        <h1 className="title">Browse popular datasets</h1>
        <section className="columns is-multiline is-mobile">
          {this.datasets.map((dataset, idx) => (
            <div key={idx} className="column is-3-desktop">
              <DatasetCard />
            </div>
          ))}
        </section>
      </React.Fragment>
    )
  }
}
export default DatasetsPublic
