import React, { Component } from "react"
import { Link } from "react-router-dom"

import { compose, graphql } from "react-apollo"
import gql from "graphql-tag"

class DatasetNew extends Component {
  state = {
    name: "",
    files: [{ name: "No file chosen", size: -1 }],
    description: "",
  }

  handleFileChange = (key, e) => {
    let { files } = this.state
    files[key].name = e.target.files[0].name
    files[key].size = e.target.files[0].size
    this.setState({
      files: files,
    })
  }

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  renderFiles = () => {
    return (
      <React.Fragment>
        <div className="field">
          <div className="control">
            <input
              type="button"
              className="button"
              onClick={() => {
                this.setState({
                  files: [
                    ...this.state.files,
                    { name: "No file chosen", size: -1 },
                  ],
                })
              }}
              value="Add another file"
            />
          </div>
        </div>
        {this.state.files.map((file, key) => (
          <div className="file has-name" key={key}>
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="fileName"
                onChange={this.handleFileChange.bind(this, key)}
              />
              <span className="file-cta">
                <span className="file-label">Choose a file</span>
              </span>
              <span className="file-name">{file.name}</span>
            </label>
          </div>
        ))}
      </React.Fragment>
    )
  }

  createDataset(e) {
    e.preventDefault()
  }

  createTheDataset = async files => {
    const result = await this.props
      .createDatasetMutation({
        variables: {
          name: this.state.name,
          files: files,
        },
      })
      .then(({ data }) => {
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <section className="columns">
        <div className="column is-half">
          <h1 className="title">New dataset</h1>
          <form>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Dataset Name"
                  name="name"
                  onChange={this.handleInputChange.bind(this)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Enter a description for your dataset"
                  rows="5"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChange.bind(this)}
                />
              </div>
            </div>

            {/* {this.renderFiles()} */}

            <div className="field">
              <div className="control">
                <input
                  type="file"
                  onChange={({ target: { validity, files } }) => {
                    validity.valid && this.createTheDataset(files)
                  }}
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  type="submit"
                  className="button is-info"
                  onClick={this.createDataset.bind(this)}
                  value="Create dataset"
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

const createDatasetMutation = gql`
  mutation createDatasetMutation($name: String!) {
    createDataset(name: $name) {
      success
    }
  }
`

export default compose(
  graphql(createDatasetMutation, { name: "createDatasetMutation" })
)(DatasetNew)
