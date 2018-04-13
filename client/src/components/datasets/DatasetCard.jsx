import React, { Component } from "react"

import { Link } from "react-router-dom"

class DatasetCard extends Component {
  static defaultProps = {
    name: "Dataset name",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A blanditiis officia fugiat ullam quibusdam optio, neque perferendis necessitatibus modi distinctio?",
    uuid: "/",
  }

  render() {
    const { name, description, uuid } = this.props
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            <Link to={"/datasets/" + uuid}>{name}</Link>
          </p>
        </header>
        <div className="card-content">
          <p className="content">{description}</p>
        </div>
      </div>
    )
  }
}
export default DatasetCard
