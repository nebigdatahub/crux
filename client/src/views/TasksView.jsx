import React, { Component } from "react"
import { Route, Link, withRouter } from "react-router-dom"
import { compose } from "react-apollo"

import SidebarLayout from "./layouts/SidebarLayout"
import QuickActions from "./layouts/QuickActions"
import TaskNew from "../components/tasks/TaskNew"
import UserTasks from "../components/tasks/UserTasks"

class TasksView extends Component {
  quickActions = {
    title: "Tasks",
    subtitle: "Quick Actions",
    links: [
      { text: "Create New Task", url: "/new", component: TaskNew },
      { text: "My Tasks", url: "", component: UserTasks },
    ],
  }
  render() {
    return (
      <SidebarLayout>
        <QuickActions {...this.props} {...this.quickActions} />
        {this.quickActions.links.map((link, idx) => {
          return (
            <Route
              key={idx}
              path={this.props.match.path + link.url}
              render={props => <link.component />}
              exact={true}
            />
          )
        })}
      </SidebarLayout>
    )
  }
}

export default compose(withRouter)(TasksView)
