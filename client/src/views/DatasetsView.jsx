import React, { Component } from "react"
import { Route, Link, withRouter } from "react-router-dom"
import { compose } from "react-apollo"

import SidebarLayout from "./layouts/SidebarLayout"
import QuickActionsLayout from "./layouts/QuickActionsLayout"

import DatasetNew from "../components/datasets/DatasetNew"
import DatasetsPublic from "../components/datasets/DatasetsPublic"

class DatasetsView extends Component {
  quickActions = {
    title: "Datasets",
    subtitle: "Quick Actions",
    links: [
      { text: "Create New Dataset", url: "/new", component: DatasetNew },
      { text: "My Datasets", url: "/all", component: DatasetsPublic },
      { text: "Public Datasets", url: "/public", component: DatasetsPublic },
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

export default compose(withRouter)(DatasetsView)
