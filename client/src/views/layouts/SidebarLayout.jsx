import React, { Component } from "react"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"

class SidebarLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        {/* <div className="columns"> */}
        {/* <nav className="column menu is-2-desktop"> <Sidebar /> </nav> */}
        <main className="container">{this.props.children}</main>
        {/* </div> */}
      </React.Fragment>
    )
  }
}

export default SidebarLayout
