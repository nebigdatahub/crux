import React, { Component } from "react";

import Navbar from '../components/Navbar'
import SignUpForm from '../components/SignUpForm'

class MainLayout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="jumbotron bg-">
                <h1 className="display-4">Lorem, ipsum.</h1>
                <p className="lead">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia tempore esse repudiandae possimus recusandae voluptates dicta doloremque minus nam nihil.</p>
                <hr className="my-4" />
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut deserunt nesciunt soluta impedit ipsam quibusdam porro cumque sapiente sit, temporibus error ratione id quis asperiores, incidunt voluptas. Eligendi totam cupiditate blanditiis aliquam temporibus placeat odit a delectus. Doloremque maiores, officiis rerum pariatur molestiae perferendis nihil? Qui, delectus sequi. Harum, repellat.</p>
                <p className="lead">
                  <a className="btn btn-primary btn-lg" target='blank' href="http://nebigdatahub.org/" role="button">Learn more</a>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainLayout