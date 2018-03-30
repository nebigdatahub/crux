import React, { Component } from "react"
import { Route, Link, withRouter } from "react-router-dom"
import { compose } from "react-apollo"

import DatasetNew from "../components/datasets/DatasetNew"
import SidebarLayout from "./layouts/SidebarLayout"
import QuickActionsLayout from "./layouts/QuickActionsLayout"

class TasksView extends Component {
  quickActions = {
    title: "Tasks",
    subtitle: "Quick Actions",
    links: [
      { text: "Create New Task", url: "/new", component: DatasetNew },
      { text: "My Tasks", url: "/all", component: DatasetNew },
    ],
  }
  render() {
    return (
      <SidebarLayout>
        <QuickActionsLayout {...this.props} {...this.quickActions} />
        <Route
          path={this.props.match.path + "/new"}
          render={() => <DatasetNew {...this.props} />}
        />
        <Route
          path={this.props.match.path + "/public"}
          render={() => <DatasetsPublic />}
        />
      </SidebarLayout>
    )
  }
}

export default compose(withRouter)(TasksView)
