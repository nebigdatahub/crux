import React, { Component } from "react"
import { Route, Link, withRouter } from "react-router-dom"
import { compose } from "react-apollo"

import SidebarLayout from "./layouts/SidebarLayout"
import QuickActions from "./layouts/QuickActions"

import DatasetNew from "../components/datasets/DatasetNew"
import DatasetsPublic from "../components/datasets/DatasetsPublic"
import UsersDatasets from "../components/datasets/UsersDatasets"
import DatasetDetail from "../components/datasets/DatasetDetail"

class DatasetsView extends Component {
  quickActions = {
    title: "Datasets",
    subtitle: "Quick Actions",
    links: [
      { text: "Create New Dataset", url: "/new", component: DatasetNew },
      { text: "My Datasets", url: "", component: UsersDatasets },
      { text: "Public Datasets", url: "/public", component: DatasetsPublic },
    ],
  }
  render() {
    return (
      <SidebarLayout>
        <QuickActions {...this.quickActions} />
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
        <Route
          path="/datasets/:uuid([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})"
          render={props => <DatasetDetail {...props} />}
        />
      </SidebarLayout>
    )
  }
}

export default compose(withRouter)(DatasetsView)
