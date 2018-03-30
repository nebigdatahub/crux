import React, { Component } from "react"

class DatasetDetail extends Component {
  static defaultProps = {
    name: "Default Dataset",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum saepe quis ipsa officia doloribus quia deleniti quasi quibusdam temporibus. Praesentium, corporis. Voluptates sunt officia beatae sit quia. Neque, earum debitis.",
    owner: "Default owner",
  }

  render() {
    const { name, description, owner } = this.props
    return (
      <section className="columns">
        <div className="column is-half">
          <h1 className="title">{name}</h1>
        </div>
      </section>
    )
  }
}

export default DatasetDetail
