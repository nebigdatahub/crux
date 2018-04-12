import React, { Component } from "react"
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"

class TaskNew extends Component {
  state = {
    name: "",
    datasetId: null,
    description: "",
    nameField: {
      value: "",
      inputClasses: ["input"],
      helpClasses: [],
    },
    success: false,
  }

  _handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
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

  render() {
    const { nameField } = this.state
    return (
      <Mutation mutation={CREATE_TASK}>
        {(createTask, { data }) => (
          <section className="columns">
            <div className="column is-half">
              <form
                onSubmit={e => {
                  e.preventDefault()
                  if (!this._validateForm()) return
                  createTask({
                    variables: {
                      name: this.state.name,
                      description: this.state.description,
                      datasetId: this.state.datasetId,
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
                }}
              >
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control has-icons-right">
                    <input
                      className={nameField.inputClasses.join(" ")}
                      type="text"
                      placeholder="Task Name"
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
                      placeholder="Enter a description for your task"
                      rows="5"
                      name="description"
                      value={this.state.description}
                      onChange={this._handleInputChange.bind(this)}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">Choose dataset</label>
                    <div className="select">
                      <select
                        onChange={this._handleInputChange.bind(this)}
                        value={this.state.datasetId || undefined}
                        name="datasetId"
                      >
                        <option value={null}>Select</option>
                        <Query query={USER_DATASETS}>
                          {({ loading, error, data }) => {
                            if (error) return ""
                            if (loading) return ""
                            const userDatasets = data.userDatasets
                            return (
                              userDatasets &&
                              userDatasets.map((dataset, idx) => (
                                <option key={idx} value={dataset.id}>
                                  {dataset.name}
                                </option>
                              ))
                            )
                          }}
                        </Query>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      type="submit"
                      className="button is-info"
                      value="Create task"
                    />
                  </div>
                </div>
                <SuccessMessage display={this.state.success} />
              </form>
            </div>
          </section>
        )}
      </Mutation>
    )
  }
}

const CREATE_TASK = gql`
  mutation createTask($name: String!, $description: String, $datasetId: Int!) {
    createTask(name: $name, description: $description, datasetId: $datasetId) {
      success
    }
  }
`
const USER_DATASETS = gql`
  query userDatasetsQuery {
    userDatasets {
      id
      name
    }
  }
`

const SuccessMessage = ({ display }) => {
  if (!display) return ""
  return (
    <div className="notification is-success">
      <button className="delete" />
      Dataset created successfully!
    </div>
  )
}

export default TaskNew
