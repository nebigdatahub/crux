import React, { Component } from "react"
import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Switch from "react-router-dom/Switch";
import DashboardFrame from "../components/DashboardFrame";
import DataSets from "../components/DataSets";

class DashboardView extends Component {

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="columns">
          <nav className="column menu is-one-fifth">
            <Sidebar {...this.props} />
          </nav>
          <section className="column is-four-fifth">
            {
              Sidebar.menu.map((route, index) => (
                <Route
                  key={index}
                  path={this.props.match.path + route.path}
                  component={route.component}
                  exact={true}
                />
              ))
            }
            <DataSets />
          </section>
        </main>
      </React.Fragment>
    )
  }
}

class Sidebar extends Component {

  static menu = [
    {
      label: "Dashboard",
      path: "",
      component: DashboardFrame
    },
    {
      label: "Projects",
      path: "/projects",
      component: () => <h1>Projects</h1>
    },
    {
      label: "Tasks",
      path: "/tasks",
      component: () => <h1>Tasks</h1>
    },
    {
      label: "Files",
      path: "/files",
      component: () => <h1>Files</h1>
    },
    {
      label: "Profile",
      path: "/profile",
      component: () => <h1>Profile</h1>
    },
  ]

  render() {
    const menuItems = Sidebar.menu.map((item, index) => <li key={index}><Link to={this.props.match.path + item.path}>{item.label}</Link></li>)

    return (
      <ul className="menu-list">
        {menuItems}
      </ul>
    )
  }
}

export default DashboardView