import React from "react"
import { Link } from "react-router-dom"

const DatasetCard = ({ name, createdBy: { username }, slug, readme }) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <Link to={`/${username}/d/${slug}`}>{name}</Link>
        </p>
      </header>
      <div className="card-content">
        <p className="content">{readme}</p>
      </div>
    </div>
  )
}

export default DatasetCard
