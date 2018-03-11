import React, { Component } from "react"

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.children[0]}
        <main className="columns">
          <nav className="column menu is-2-desktop">
            {this.props.children[1]}
          </nav>
          <section className="column is-10-desktop">
            {this.props.children.slice(2)}
          </section>
        </main>
      </React.Fragment>
    )
  }
}

export default Layout
