import React, { Component } from "react"
import { Route, withRouter } from "react-router-dom"
import { compose } from "react-apollo"

import SidebarLayout from "./layouts/SidebarLayout"
import QuickActionsLayout from "./layouts/QuickActionsLayout"

class AnalysisView extends Component {
  quickActions = {
    title: "Analysis",
    links: [
      { text: "Start new analysis", url: "/new", component: null },
      { text: "My analyses", url: "/all", component: null },
    ],
  }
  render() {
    return (
      <SidebarLayout>
        <QuickActionsLayout {...this.quickActions} />
        {this.quickActions.links.map((link, idx) => (
          <Route
            key={idx}
            path={this.props.match.path + link.url}
            component={link.component}
          />
        ))}
      </SidebarLayout>
    )
  }
}

export default compose(withRouter)(AnalysisView)
