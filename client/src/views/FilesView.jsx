import React, { Component } from "react"
import { Route, Link } from "react-router-dom"

import DatasetNew from "../components/datasets/DatasetNew"
import SidebarLayout from "./layouts/SidebarLayout"
import QuickActionsLayout from "./layouts/QuickActionsLayout"

class FilesView extends Component {
  quickActions = {
    title: "Files",
    links: [],
  }
  render() {
    return (
      <SidebarLayout>
        <QuickActionsLayout {...this.quickActions} />
      </SidebarLayout>
    )
  }
}

export default FilesView
