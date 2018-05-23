import React from "react"
import { Link } from "react-router-dom"

const DatasetCard = ({ name, slug, readme }) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <Link to={`/${slug.split("-__-")[0]}/d/${slug.split("-__-")[1]}`}>
            {name}
          </Link>
        </p>
      </header>
      <div className="card-content">
        <p className="content">{readme}</p>
      </div>
    </div>
  )
}

export default DatasetCard
