import React, { Component } from "react"
import { ApolloConsumer, Mutation } from "react-apollo"
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
  }

  _handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  _validateForm = () => {
    return true
  }

  render() {
    const { nameField } = this.state
    return (
      <Mutation mutation={CREATE_TASK}>
        {(createTask, { data }) => (
          <section>
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  createTask({
                    variables: {
                      name: this.state.name,
                      description: this.state.description,
                      datasetId: this.state.datasetId,
                    },
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
