import React, { Component } from "react"
import { Route, Link } from "react-router-dom"
import DatasetNew from "../components/DatasetNew"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

import Layout from "./Layout"

class FilesView extends Component {
  render() {
    return (
      <Layout>
        <Navbar />
        <Sidebar />
        <DatasetNew />
      </Layout>
    )
  }
}

export default FilesView
