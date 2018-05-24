import React from "react"
import DatasetCard from "./DatasetCard"

const Datasets = ({ datasets }) => (
  <section className="columns is-multiline is-mobile">
    {datasets.map((dataset, idx) => (
      <div key={idx} className="column is-4-desktop">
        <DatasetCard {...dataset} />
      </div>
    ))}
  </section>
)

export default Datasets
