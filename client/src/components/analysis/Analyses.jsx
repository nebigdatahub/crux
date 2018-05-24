import React from "react"
import AnalysisCard from "./AnalysisCard"

const Analyses = ({ analyses }) => (
  <section className="columns is-multiline is-mobile">
    {analyses.map((analysis, idx) => (
      <div key={idx} className="column is-4-desktop">
        <AnalysisCard {...analysis} />
      </div>
    ))}
  </section>
)

export default Analyses
