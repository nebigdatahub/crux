import React, { Component } from "react"
import { Route, Link } from "react-router-dom"

import SidebarLayout from "./layouts/SidebarLayout"
import QuickActionsLayout from "./layouts/QuickActionsLayout"

class ProfileView extends Component {
  quickActions = {
    title: "Profile",
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

export default ProfileView
