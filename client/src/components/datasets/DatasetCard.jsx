import React, { Component } from "react"

import { Link } from "react-router-dom"

const DatasetCard = ({ name, uuid, description }) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <Link to={"/dataset/" + uuid}>{name}</Link>
        </p>
      </header>
      <div className="card-content">
        <p className="content">{description}</p>
      </div>
    </div>
  )
}

export default DatasetCard
