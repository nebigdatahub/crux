import React, { Component } from "react"

class LandingPageContent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className="hero is-dark is-medium">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Welcome.</h1>
            <h2 className="subtitle">CRUX represents a community-driven approach to accelerating data-driven innovation.
          The goal is to provide real-world applications and data sets to data scientists, while providing
          subject matter experts from academia, corporate and government sectors access to Big Data expertise.</h2>
          </div>
        </div>
      </section>
    )
  }
}

export default LandingPageContent
