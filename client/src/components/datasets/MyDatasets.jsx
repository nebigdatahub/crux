import React, { Component } from "react"
import { compose } from "react-apollo"
import { withRouter } from "react-router-dom"
import Datasets from "./Datasets"
import DatasetsProvider from "./DatasetsProvider"

class MyDatasets extends Component {
  render() {
    return (
      <React.Fragment>
        <DatasetsProvider username={this.props.match.params.username}>
          <Datasets />
        </DatasetsProvider>
      </React.Fragment>
    )
  }
}

export default compose(withRouter)(MyDatasets)
