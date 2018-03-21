import React, { Component } from "react"
import { Link, Route } from "react-router-dom"

import DashboardView from "../views/DashboardView"
import DatasetsView from "../views/DatasetsView"
import FilesView from "../views/FilesView"
import TasksView from "../views/TasksView"
import ProfileView from "../views/ProfileView"
import AnalysisView from "../views/AnalysisView"

class Sidebar extends Component {
  menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Datasets", path: "/datasets" },
    { label: "Tasks", path: "/tasks" },
    { label: "Files", path: "/files" },
    { label: "Profile", path: "/profile" },
    { label: "Analysis", path: "/analysis" },
  ]

  render() {
    return (
      <ul className="menu-list">
        {this.menuItems.map((item, idx) => (
          <li key={idx}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

export default Sidebar
