import React, { Component } from "react"
import { Route, Link } from "react-router-dom"

import SidebarLayout from "./layouts/SidebarLayout"
import QuickActions from "./layouts/QuickActions"

class ProfileView extends Component {
  quickActions = {
    title: "Profile",
    links: [],
  }
  render() {
    return (
      <SidebarLayout>
        <QuickActions {...this.quickActions} />
      </SidebarLayout>
    )
  }
}

export default ProfileView
