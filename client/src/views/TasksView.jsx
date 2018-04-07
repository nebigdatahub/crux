import React, { Component } from "react"
import { Route, Link, withRouter } from "react-router-dom"
import { compose } from "react-apollo"

import TaskNew from "../components/tasks/TaskNew"
import SidebarLayout from "./layouts/SidebarLayout"
import QuickActions from "./layouts/QuickActions"

class TasksView extends Component {
  quickActions = {
    title: "Tasks",
    subtitle: "Quick Actions",
    links: [
      { text: "Create New Task", url: "/new", component: TaskNew },
      { text: "My Tasks", url: "/all", component: TaskNew },
    ],
  }
  render() {
    return (
      <SidebarLayout>
        <QuickActions {...this.props} {...this.quickActions} />
        <Route
          path={this.props.match.path + "/new"}
          render={() => <TaskNew {...this.props} />}
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
