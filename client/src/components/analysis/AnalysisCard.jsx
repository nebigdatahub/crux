import React from "react"
import { Link } from "react-router-dom"

const AnalysisCard = ({ name, slug, description }) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <Link to={`/${slug.split("-__-")[0]}/a/${slug.split("-__-")[1]}`}>
            {name}
          </Link>
        </p>
      </header>
      <div className="card-content">
        <p className="content">{description}</p>
      </div>
    </div>
  )
}

export default AnalysisCard
