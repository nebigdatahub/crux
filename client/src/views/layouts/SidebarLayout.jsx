import React, { Component } from "react"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"

class SidebarLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="columns">
          <nav className="column menu is-2-desktop">
            <Sidebar />
          </nav>
          <section className="column is-10-desktop">
            {this.props.children}
          </section>
        </main>
      </React.Fragment>
    )
  }
}

export default SidebarLayout
