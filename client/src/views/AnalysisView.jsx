import React, { Component } from "react"
import SidebarLayout from "./layouts/SidebarLayout"
import QuickActionsLayout from "./layouts/QuickActionsLayout"

class AnalysisView extends Component {
  quickActions = {
    title: "Analysis",
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

export default AnalysisView
