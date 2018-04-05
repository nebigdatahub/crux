import React, { Component } from "react"
import { Link } from "react-router-dom"

import { compose, graphql } from "react-apollo"
import gql from "graphql-tag"

class DatasetNew extends Component {
  state = {
    name: "",
    nameField: {
      value: "",
      inputClasses: ["input"],
      helpClasses: [],
    },
    files: [""],
    description: "",
    success: false,
  }

  _handleInputChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  _validateForm = () => {
    const { nameField } = this.state
    if (this.state.name == "") {
      this.setState({
        nameField: {
          ...nameField,
          inputClasses: ["input is-danger"],
          helpClasses: ["help is-danger"],
        },
      })
      return false
    }
    return true
  }

  _handleFormSubmit = async e => {
    e.preventDefault()
    if (!this._validateForm()) return
    const { name, files, description } = this.state
    const result = await this.props
      .createDatasetMutation({
        variables: {
          name: name,
          files: files,
          description: description,
        },
      })
      .then(({ data }) => {
        this.setState({
          success: true,
          name: "",
          description: "",
          files: [""],
        })
        setTimeout(() => {
          this.setState({ success: false })
        }, 3000)
      })
      .catch(error => {
        console.log(error)
      })
  }

  _handleFileChange = (file, key) => {
    let { files } = this.state
    files[key] = file
    this.setState({
      files: files,
    })
  }

  _removeFile = key => {
    let { files } = this.state
    files.splice(key, 1)
    if (!files) files = [""]
    this.setState({
      files: files,
    })
  }

  _renderFiles = () => {
    return (
      <React.Fragment>
        <div className="field">
          <div className="control">
            <input
              type="button"
              className="button"
              onClick={() => {
                this.setState({
                  files: [...this.state.files, ""],
                })
              }}
              value="Add another file"
            />
          </div>
        </div>
        {this.state.files.map((file, key) => (
          <div className="file has-name" key={key || 0}>
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="fileName"
                onChange={({ target: { validity, files: [file] } }) => {
                  validity.valid && this._handleFileChange(file, key)
                }}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload" />
                </span>
                <span className="file-label" />
              </span>
              <span className="file-name">
                {(file && file.name) || "No file chosen"}
              </span>
            </label>
            <span
              className="file-delete"
              onClick={this._removeFile.bind(this, key)}
            >
              <i className="far fa-trash-alt" />
            </span>
          </div>
        ))}
      </React.Fragment>
    )
  }

  render() {
    const { nameField } = this.state

    return (
      <section className="columns">
        <div className="column is-half">
          <h1 className="title">New dataset</h1>
          <form>
            <div className="field">
              <label className="label">Name</label>
              <div className="control has-icons-right">
                <input
                  className={nameField.inputClasses.join(" ")}
                  type="text"
                  placeholder="Dataset Name"
                  name="name"
                  required
                  value={this.state.name}
                  onChange={this._handleInputChange.bind(this)}
                />
                {nameField.helpClasses.length > 0 && (
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle" />
                  </span>
                )}
              </div>
              {this.state.nameField.helpClasses.length > 0 && (
                <p className={nameField.helpClasses.join(" ")}>
                  This field is required
                </p>
              )}
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
                  onChange={this._handleInputChange.bind(this)}
                />
              </div>
            </div>

            {this._renderFiles()}

            <div className="field">
              <div className="control">
                <input
                  type="submit"
                  className="button is-info"
                  onClick={this._handleFormSubmit.bind(this)}
                  value="Create dataset"
                />
              </div>
            </div>
            <SuccessMessage display={this.state.success} />
          </form>
        </div>
      </section>
    )
  }
}

const SuccessMessage = ({ display }) => {
  if (!display) return ""
  return (
    <div className="notification is-success">
      <button className="delete" />
      Dataset created successfully!
    </div>
  )
}

const createDatasetMutation = gql`
  mutation createDatasetMutation($name: String!, $description: String) {
    createDataset(name: $name, description: $description) {
      success
    }
  }
`

export default compose(
  graphql(createDatasetMutation, { name: "createDatasetMutation" })
)(DatasetNew)
