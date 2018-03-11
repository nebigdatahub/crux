import React, { Component } from "react"
import DashboardView from "./views/DashboardView"
import DatasetsView from "./views/DatasetsView"

const devSettings = {
  ROOT_URI: "http://localhost:8000",
}

const prodSettings = {
  ROOT_URI: "https://crux-nebigdatahub.herokuapp.com",
}

const settings =
  process.env.NODE_ENV == "production" ? prodSettings : devSettings

const config = {
  ...settings,
  GRAPHQL_URI: "/graphql",
  TOKEN_NAME: "token",
}

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    component: DashboardView,
  },
  {
    label: "Datasets",
    path: "/datasets",
    component: DatasetsView,
    menuItems: [
      {
        label: "",
        path: "/datasets/new",
        component: () => <h1>Create New Project</h1>,
      },
    ],
  },
  {
    label: "Tasks",
    path: "/tasks",
    component: () => <h1>Tasks</h1>,
  },
  {
    path: "/files",
    label: "Files",
    component: () => <h1>Files</h1>,
  },
  {
    label: "Profile",
    path: "/profile",
    component: () => <h1>Profile</h1>,
  },
]

export { config, menuItems }
