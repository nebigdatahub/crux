import React, { Component } from "react"
import { Mutation, Query } from "react-apollo"
import { createAnalysis } from "../../queries/analyses.gql"
import { usersDatasets } from "../../queries/datasets.gql"

class AnalysisNew extends Component {
  state = {
    name: "",
    nameField: {
      value: "",
      inputClasses: ["input"],
      helpClasses: [],
    },
    file: "",
    description: "",
    success: false,
    datasetId: null,
    modalActive: false,
  }

  _handleInputChange = ({ target: { name, value } }) => {
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

  _handleFormSubmit = async (createAnalysis, e) => {
    e.preventDefault()
    if (!this._validateForm()) return
    const { name, file, description, datasetId } = this.state
    await createAnalysis({
      variables: {
        name: name,
        files: file,
        description: description,
        datasetId: datasetId,
      },
    })
      .then(({ data }) => {
        this.setState({
          success: true,
          name: "",
          description: "",
          file: "",
          datasetId: null,
        })
        setTimeout(() => {
          this.setState({ success: false })
        }, 3000)
      })
      .catch(error => {
        console.log(error)
      })
  }

  _toggleModal = e => {
    e.preventDefault()
    const { modalActive } = this.state
    this.setState({
      modalActive: !modalActive,
    })
  }

  _selectDataset = datasetId => {
    this.setState({
      datasetId: datasetId,
    })
  }

  _handleFileChange = file => {
    this.setState({
      file: file,
    })
  }

  render() {
    const { nameField, file } = this.state

    return (
      <Mutation mutation={createAnalysis}>
        {(createAnalysis, { data }) => {
          return (
            <section className="columns">
              <div className="column is-half">
                <h1 className="title is-4">New analysis</h1>
                <form
                  onSubmit={this._handleFormSubmit.bind(this, createAnalysis)}
                >
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control has-icons-right">
                      <input
                        className={nameField.inputClasses.join(" ")}
                        type="text"
                        placeholder="Analysis Name"
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
                        placeholder="Enter a description for your analysis"
                        rows="5"
                        name="description"
                        value={this.state.description}
                        onChange={this._handleInputChange.bind(this)}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button className="button" onClick={this._toggleModal}>
                        Select dataset
                      </button>
                    </div>
                  </div>

                  <DatasetPicker
                    active={this.state.modalActive}
                    togglePicker={this._toggleModal}
                    setDataset={this._selectDataset}
                    selected={this.state.datasetId}
                  />

                  <div className="file has-name">
                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
                        name="fileName"
                        required
                        onChange={({
                          target: {
                            validity,
                            files: [file],
                          },
                        }) => {
                          validity.valid && this._handleFileChange(file)
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
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        type="submit"
                        className="button is-info"
                        value="Create analysis"
                      />
                    </div>
                  </div>
                  <SuccessMessage display={this.state.success} />
                </form>
              </div>
            </section>
          )
        }}
      </Mutation>
    )
  }
}

const DatasetPicker = ({ active, togglePicker, setDataset, selected }) => (
  <Query query={usersDatasets}>
    {({ loading, error, data }) => {
      if (error) return "error"
      if (loading) return "loading"

      const { usersDatasets } = data
      return (
        <div className={`modal ${active ? "is-active" : ""}`}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Select dataset</p>
              <button
                className="delete"
                onClick={togglePicker}
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
              <Datasets
                datasets={usersDatasets}
                setDataset={setDataset}
                selected={selected}
              />
            </section>
            <footer className="modal-card-foot">
              <button className="button is-info" onClick={togglePicker}>
                Save changes
              </button>
              <button className="button" onClick={togglePicker}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )
    }}
  </Query>
)

const Datasets = ({ selected, datasets, setDataset }) => (
  <div className="select is-multiple">
    <select
      size="5"
      onChange={({ target: { value } }) => {
        setDataset(value)
      }}
      value={selected}
    >
      <option value="-1">Select a dataset</option>
      {datasets.map((dataset, idx) => (
        <option key={idx} value={dataset.id}>
          {dataset.name}
        </option>
      ))}
    </select>
  </div>
)

const SuccessMessage = ({ display }) => {
  if (!display) return ""
  return (
    <div className="notification is-success">
      <button className="delete" />
      Analysis created successfully!
    </div>
  )
}

export default AnalysisNew
