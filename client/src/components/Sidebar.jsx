import React, { Component } from "react"
import { Link } from "react-router-dom"
import { menuItems } from "../config"

class Sidebar extends Component {
  render() {
    return (
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

export default Sidebar
