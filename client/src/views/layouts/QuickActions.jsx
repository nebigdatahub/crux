import React, { Component } from "react"
import { Link, withRouter, Route } from "react-router-dom"
import DatasetNew from "../../components/datasets/DatasetNew"
import MyDatasets from "../../components/datasets/MyDatasets"

class QuickActions extends Component {
  render() {
    const { title, links, match } = this.props
    const prependUrl = title == "Dashboard" ? "" : match.path
    return (
      <React.Fragment>
        <section class="section">
          <div className="tabs">
            <ul>
              {links.map((link, idx) => (
                <li>
                  <Link to={prependUrl + link.url} key={idx}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default withRouter(QuickActions)
